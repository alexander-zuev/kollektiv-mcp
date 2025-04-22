import { AppRoutes } from "@/web/routes";
import { html } from "hono/html";

type RenderConfirmScreenProps = {
	email: string;
};

export const renderConfirmScreen = ({ email }: RenderConfirmScreenProps) => {
	return html`
        <div class="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md">
            <h1 class="text-2xl font-heading font-bold mb-6 text-gray-900">
                Enter verification code
            </h1>
            
            <p class="mb-6 text-gray-600">
                We've sent a verification code to <strong>${email}</strong>. 
                Please enter the code below to complete your login.
            </p>

            <form method="POST" action='${AppRoutes.AUTH_CONFIRM}' class="space-y-4">
                <input type="hidden" name="email" value="${email}">
                <div>
                    <label
                            for="otp"
                            class="block text-sm font-medium text-gray-700 mb-1"
                    >Verification Code</label
                    >
                    <input
                            type="text"
                            id="otp"
                            name="otp"
                            required
                            autocomplete="one-time-code"
                            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
                    />
                </div>
                <button
                        type="submit"
                        class="w-full py-3 px-4 bg-primary text-white rounded-md font-medium hover:bg-primary/90 transition-colors"
                >
                    Verify
                </button>
            </form>
            
            <div class="mt-4 text-center">
                <a href="${AppRoutes.AUTHORIZE}" class="text-primary hover:underline">Back to login</a>
            </div>
        </div>
    `;
};
