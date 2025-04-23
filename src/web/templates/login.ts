import {AppRoutes} from "@/web/routes";
import {html} from "hono/html";


export const renderLoginScreen = (clientName: string) => {
    return html`
        <div class="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md">
            <h1 class="text-2xl font-heading font-bold mb-6 text-gray-900">
                Login to authorize <b>${clientName}</b>
            </h1>

            <div class="space-y-4 mb-8">
                <form method="POST" action='${AppRoutes.LOGIN}'>
                    <input type="hidden" name="provider" value="github">
                    <button
                            type="submit"
                            name="button"
                            value="github"
                            class="w-full py-3 px-4 bg-gray-900 text-white rounded-md font-medium hover:bg-gray-800 transition-colors"
                    >
                        Login with GitHub
                    </button>
                </form>

                <form method="POST" action='${AppRoutes.LOGIN}'>
                    <input type="hidden" name="provider" value="google">
                    <button
                            type="submit"
                            name="button"
                            value="google"
                            class="w-full py-3 px-4 bg-red-600 text-white rounded-md font-medium hover:bg-red-500 transition-colors"
                    >
                        Login with Google
                    </button>
                </form>
            </div>

            <form method="POST" action='${AppRoutes.LOGIN}' class="space-y-4">
                <input type="hidden" name="provider" value="magic-link">
                <div>
                    <label
                            for="email"
                            class="block text-sm font-medium text-gray-700 mb-1"
                    >Email</label
                    >
                    <input
                            type="email"
                            id="email"
                            name="email"
                            required
                            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
                    />
                </div>
                <button
                        type="submit"
                        name="button"
                        value="magic-link"
                        class="w-full py-3 px-4 bg-primary text-white rounded-md font-medium hover:bg-primary/90 transition-colors"
                >
                    Send Magic Link
                </button>
            </form>
        </div>
    `;
};