import {AppRoutes} from "@/web/routes";
import {
    layout,
    parseApproveFormBody,
    renderAuthorizationApprovedContent,
    renderAuthorizationRejectedContent
} from "@/web/utils";
import app from "@/web/app";

export const approveHandler = async (c) => {
    console.log("[POST /approve] Handling request.");
    const {action, oauthReqInfo, email, password} = await parseApproveFormBody(
        await c.req.parseBody(),
    );
    console.log(`[POST /approve] Action: ${action}, Email: ${email}`);

    if (!oauthReqInfo) {
        console.log("[POST /approve] Invalid OAuth request info. Returning 401.");
        return c.html("INVALID LOGIN", 401);
    }

    // If the user needs to both login and approve, we should validate the login first
    if (action === "login_approve") {
        console.log("[POST /approve] Validating login (demo allows any).");
        // We'll allow any values for email and password for this demo
        // but you could validate them here
        // Ex:
        // if (email !== "user@example.com" || password !== "password") {
        // biome-ignore lint/correctness/noConstantCondition: This is a demo
        if (false) {
            console.log("[POST /approve] Login validation failed (demo condition).");
            return c.html(
                layout(
                    await renderAuthorizationRejectedContent("/"),
                    "MCP Remote Auth Demo - Authorization Status",
                ),
            );
        }
        console.log("[POST /approve] Login validation successful (demo).");
    }

    console.log(`[POST /approve] Completing authorization for user ${email}.`);
    // The user must be successfully logged in and have approved the scopes, so we
    // can complete the authorization request
    const {redirectTo} = await c.env.OAUTH_PROVIDER.completeAuthorization({
        request: oauthReqInfo,
        userId: email, // Using email as userId here, ensure this aligns with your logic
        metadata: {
            label: "Test User",
        },
        scope: oauthReqInfo.scope,
        props: {
            userEmail: email,
        },
    });

    console.log(`[POST /approve] Rendering approved content, will redirect to: ${redirectTo}`);
    return c.html(
        layout(
            await renderAuthorizationApprovedContent(redirectTo),
            "MCP Remote Auth Demo - Authorization Status",
        ),
    );
};