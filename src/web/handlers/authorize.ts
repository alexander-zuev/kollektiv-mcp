import {getSupabase} from "@/web/middleware/supabase";
import {type ConsentFormData, ConsentFormSchema} from "@/web/schemas/consentForm"; // Adjust path
import {layout} from "@/web/templates/baseLayout";
import {renderConsentScreen} from "@/web/templates/consent";
import {renderLoginScreen} from "@/web/templates/login";
import {
    extractAuthFlowDataFromCookie,
    getCurrentUser,
    isValidOAuthRequest,
    persistAuthFlowCookie,
} from "@/web/utils/auth";
import {OAuthRequest, AuthFlowCookieData, ClientInfo, User} from "@/web/types";
import {FormValidationError, parseFormData} from "@/web/utils/formParser";
import type {Context} from "hono";
import {deleteCookie, getCookie, setCookie} from "hono/cookie";

export const getAuthorizeHandler = async (c: Context) => {
    console.log("[GET /authorize] Handling request.");
    const user = await getCurrentUser(c);

    console.log("[GET /authorize] Parsing OAuth request...");
    let oauthReq: OAuthRequest | null = await c.env.OAUTH_PROVIDER.parseAuthRequest(c.req.raw);
    let clientInfo: {
        clientName: string
    } | null = null;

    if (isValidOAuthRequest(oauthReq)) {
        clientInfo = await c.env.OAUTH_PROVIDER.lookupClient(oauthReq.clientId);
        persistAuthFlowCookie(c, {oauthReq, clientInfo});
    } else {
        // Try to get the data from the cookie
        const cookieData = getCookie(c, "authFlow");
        const extractedData = extractAuthFlowDataFromCookie(cookieData);
        if (extractedData) {
            console.log("[GET /authorize] Successfully extracted auth flow data from cookie.");
            oauthReq = extractedData.oauthReq;
            clientInfo = extractedData.clientInfo;
        } else {
            console.log("[GET /authorize] Failed to extract valid auth flow data from cookie.");
            // No valid request in params or cookie
            oauthReq = null;
            clientInfo = null;
        }

        // Centralized check for a valid OAuth request after attempting both sources
        if (!isValidOAuthRequest(oauthReq)) {
            console.error("[GET /authorize] Missing or invalid OAuth request after checking params and cookie.");
            deleteCookie(c, "authFlow", {path: "/"}); // Clean up potentially invalid cookie
            return c.text("Missing or invalid OAuth request", 400);
        }

    }

    if (!user) {
        console.log("[GET /authorize] No session found. Rendering login screen.");
        // User not logged in → render login screen

        const clientName = clientInfo?.clientName || 'Client';
        const content = await renderLoginScreen(clientName);
        return c.html(layout(content, "Log in to authorize"));
    }

    // User is logged in, and we have a valid OAuth request. Show consent screen.
    console.log(`[GET /authorize] Session found for user ${user.id}. Rendering consent screen.`);
    const content = await renderConsentScreen({oauthReq, clientInfo, user});
    return c.html(layout(content, "Authorize access"));
};

export const postAuthorizeHandler = async (c: Context) => {
    console.log("[POST /authorize] Handling request.");
    const supabase = getSupabase(c);
    console.log("[POST /authorize] Getting session...");
    const user = await getCurrentUser(c);

    if (!user) {
        console.log("[POST /authorize] No session found. Returning 401 Unauthorized.");
        return c.text("Unauthorized", 401);
    }

    let validatedFormData: ConsentFormData; // Use the type inferred from the schema

    try {
        // Use the helper function
        validatedFormData = await parseFormData(c, ConsentFormSchema);
        console.log(
            "[POST /authorize] Validated form data:",
            JSON.stringify(validatedFormData, null, 2),
        );

        // Handle deny action (example)
        if (validatedFormData.action === "deny") {
            console.log("[POST /authorize] User denied the request via form.");
            // Construct rejection redirect URL based on validatedFormData.redirect_uri and state
            // return c.redirect(buildRejectionUrl(validatedFormData.redirect_uri, validatedFormData.state), 302);
            return c.text("Authorization Denied", 403); // Or redirect
        }
    } catch (error) {
        if (error instanceof FormValidationError) {
            console.error("[POST /authorize] Form validation failed:", error.issues);
            // Return a 400 Bad Request with the first validation message
            return c.text(`Bad Request: ${error.message}`, 400);
        }
        // Handle other errors during parsing/validation
        console.error("[POST /authorize] Error processing form data:", error);
        return c.text("Internal Server Error: Failed to process request form.", 500);
    }

    const oauthReq = {
        clientId: validatedFormData.client_id,
        redirectUri: validatedFormData.redirect_uri, // Ensure this is always present if required
        state: validatedFormData.state || "",
        codeChallenge: validatedFormData.code_challenge,
        codeChallengeMethod: validatedFormData.code_challenge_method,
        scope: validatedFormData.scope ? validatedFormData.scope.split(" ") : [],
        responseType: "code", // Assuming 'code' flow
    };
    console.log(
        "[POST /authorize] Constructed oauthReq for completion:",
        JSON.stringify(oauthReq, null, 2),
    );
    console.log(`[POST /authorize] Completing authorization for user ${user.id}.`);

    const {redirectTo} = await c.env.OAUTH_PROVIDER.completeAuthorization({
        request: oauthReq,
        userId: user.id,
        metadata: {email: user.email},
        scope: oauthReq.scope, // Pass the parsed scope array
        props: {userId: user.id, email: user.email},
    });

    console.log(`[POST /authorize] Redirecting to: ${redirectTo}`);
    return c.redirect(redirectTo, 302);
};