import {Context} from "hono";
import {getSupabase} from "@/web/middleware/supabase";
import {AppRoutes} from "@/web/routes";

export const authConfirmHandler = async (c: Context) => {
    console.log("[POST /auth/confirm] Handling request.");
    const supabase = getSupabase(c);

    // Get form data to get the OTP code
    const formData = await c.req.parseBody();
    console.log("[POST /auth/confirm] Form data received:", formData);

    const email = formData.email?.toString();
    const otp = formData.otp?.toString();

    if (!email || !otp) {
        console.error("[POST /auth/confirm] Missing email or OTP code");
        return c.text("Missing email or OTP code", 400);
    }

    console.log(`[POST /auth/confirm] Verifying OTP for email: ${email}`);

    try {
        // Verify the OTP with Supabase
        const {data, error} = await supabase.auth.verifyOtp({
            email,
            token: otp,
            type: 'email'
        });

        if (error) {
            console.error("[POST /auth/confirm] OTP verification error:", error.message);
            return c.text(`Error verifying OTP: ${error.message}`, 400);
        }

        if (!data.session) {
            console.error("[POST /auth/confirm] No session returned after OTP verification");
            return c.text("Authentication failed", 401);
        }

        console.log(`[POST /auth/confirm] OTP verified successfully for user ${data.user?.id}`);
        
        // Redirect to authorize endpoint to complete the authorization flow
        return c.redirect(AppRoutes.AUTHORIZE, 302);
    } catch (error) {
        console.error("[POST /auth/confirm] Unexpected error:", error);
        return c.text("Internal server error", 500);
    }
}