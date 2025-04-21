import {Context} from "hono";
import {getSupabase} from "@/web/middleware/supabase";
import {AppRoutes} from "@/web/routes";

enum LoginProviders {
    GITHUB = "github",
    GOOGLE = "google",
    MAGIC_LINK = "magic-link",
}

export const loginHandler = async (c: Context) => {
    const supabase = getSupabase(c);

    // Get form data to determine which login method was chosen
    const formData = await c.req.parseBody();
    console.log("[POST /login] Form data received:", formData);

    // Get the site URL to use for redirects
    const url = new URL(c.req.url);
    const siteUrl = `${url.protocol}//${url.host}`;
    const redirectUrl = `${siteUrl}${AppRoutes.AUTH_CALLBACK}`;
    console.log(`[POST /login] Redirect URL: ${redirectUrl}`);

    // Determine which login method to use based on form data
    if (formData.provider === LoginProviders.GITHUB || formData.button === "github" ||
        (!formData.email && formData.button !== "google")) {
        console.log("[POST /login] Processing GitHub login");
        const {data, error} = await supabase.auth.signInWithOAuth({
            provider: 'github',
            options: {
                redirectTo: redirectUrl,
            },
        });

        if (error) {
            console.error("[POST /login] GitHub OAuth error:", error.message);
            return c.text(`Error logging in with GitHub: ${error.message}`, 500);
        }

        if (data?.url) {
            console.log("[POST /login] Redirecting to GitHub OAuth URL");
            return c.redirect(data.url);
        } else {
            console.error("[POST /login] GitHub OAuth URL missing");
            return c.text("Error initiating GitHub login", 500);
        }
    }

    if (formData.provider === LoginProviders.GOOGLE || formData.button === "google") {
        console.log("[POST /login] Processing Google login");
        const {data, error} = await supabase.auth.signInWithOAuth({
            provider: 'google',
            options: {
                redirectTo: redirectUrl,
            },
        });

        if (error) {
            console.error("[POST /login] Google OAuth error:", error.message);
            return c.text(`Error logging in with Google: ${error.message}`, 500);
        }

        if (data?.url) {
            console.log("[POST /login] Redirecting to Google OAuth URL");
            return c.redirect(data.url);
        } else {
            console.error("[POST /login] Google OAuth URL missing");
            return c.text("Error initiating Google login", 500);
        }
    }

    // If we have an email, assume magic link login
    if (formData.email) {
        const email = formData.email.toString();
        console.log(`[POST /login] Processing Magic Link login for email: ${email}`);

        const {error} = await supabase.auth.signInWithOtp({
            email,
            options: {
                shouldCreateUser: true,
                emailRedirectTo: redirectUrl,
            },
        });

        if (error) {
            console.error("[POST /login] Magic Link error:", error.message);
            return c.text(`Error sending magic link: ${error.message}`, 500);
        }

        // Import the confirmation screen template
        const {renderConfirmScreen} = await import("@/web/templates/confirm");
        const {layout} = await import("@/web/utils");

        // Render the confirmation screen
        const content = await renderConfirmScreen({email});
        return c.html(layout(content, "Verify your email"));
    }

    console.error("[POST /login] No valid login method identified");
    return c.text("Invalid login request. Please provide a valid login method.", 400);
};