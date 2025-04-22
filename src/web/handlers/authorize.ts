import {getSupabase} from "@/web/middleware/supabase";
import {layout} from "@/web/templates/baseLayout";
import {renderLoginScreen} from "@/web/templates/login";
import {renderConsentScreen} from "@/web/templates/consent";
import {Context} from "hono";
import {getCurrentUser} from "@/web/utils/auth";
import {parseFormData, FormValidationError} from "@/web/utils/formParser";
import {ConsentFormSchema, ConsentFormData} from '@/web/schemas/consentForm'; // Adjust path


export const getAuthorizeHandler = async (c: Context) => {
    console.log("[GET /authorize] Handling request.");
    const supabase = getSupabase(c);
    console.log("[GET /authorize] Getting session...");
    const user = await getCurrentUser(c);


    console.log("[GET /authorize] Parsing OAuth request...");
    const oauthReq = await c.env.OAUTH_PROVIDER.parseAuthRequest(c.req.raw);
    console.log('[GET /authorize] Parsed initial oauthReq:', JSON.stringify(oauthReq, null, 2));
    console.log(`[GET /authorize] Looking up client: ${oauthReq.clientId}`);
    const clientInfo = await c.env.OAUTH_PROVIDER.lookupClient(oauthReq.clientId);

    if (!user) {
        console.log("[GET /authorize] No session found. Rendering login screen.");
        // User not logged in → render login screen
        const content = await renderLoginScreen({clientInfo});
        return c.html(layout(content, "Log in to authorize"));
    }

    // User is logged in → show consent screen
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
        console.log('[POST /authorize] Validated form data:', JSON.stringify(validatedFormData, null, 2));

        // Handle deny action (example)
        if (validatedFormData.action === 'deny') {
            console.log("[POST /authorize] User denied the request via form.");
            // Construct rejection redirect URL based on validatedFormData.redirect_uri and state
            // return c.redirect(buildRejectionUrl(validatedFormData.redirect_uri, validatedFormData.state), 302);
            return c.text("Authorization Denied", 403); // Or redirect
        }

    } catch (error) {
        if (error instanceof FormValidationError) {
            console.error('[POST /authorize] Form validation failed:', error.issues);
            // Return a 400 Bad Request with the first validation message
            return c.text(`Bad Request: ${error.message}`, 400);
        } else {
            // Handle other errors during parsing/validation
            console.error('[POST /authorize] Error processing form data:', error);
            return c.text("Internal Server Error: Failed to process request form.", 500);
        }
    }

    const oauthReq = {
        clientId: validatedFormData.client_id,
        redirectUri: validatedFormData.redirect_uri, // Ensure this is always present if required
        state: validatedFormData.state || '',
        codeChallenge: validatedFormData.code_challenge,
        codeChallengeMethod: validatedFormData.code_challenge_method,
        scope: validatedFormData.scope ? validatedFormData.scope.split(' ') : [],
        responseType: 'code' // Assuming 'code' flow
    };
    console.log(`[POST /authorize] Constructed oauthReq for completion:`, JSON.stringify(oauthReq, null, 2));
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