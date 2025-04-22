// Helper to generate the layout
import {html} from "hono/html";
import type {HtmlEscapedString} from "hono/utils/html";
import {AppRoutes} from "@/web/routes";

export const layout = (content: HtmlEscapedString | string, title: string) => html`
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8"/>
        <meta
                name="viewport"
                content="width=device-width, initial-scale=1.0"
        />
        <title>${title}</title>
        <script src="https://cdn.tailwindcss.com"></script>
        <script>
            tailwind.config = {
                theme: {
                    extend: {
                        colors: {
                            primary: "#3498db",
                            secondary: "#2ecc71",
                            accent: "#f39c12",
                        },
                        fontFamily: {
                            sans: ["Inter", "system-ui", "sans-serif"],
                            heading: ["Roboto", "system-ui", "sans-serif"],
                        },
                    },
                },
            };
        </script>
        <link rel="stylesheet" href="/styles/styles.css">
    </head>
    <body
            class="bg-gray-50 text-gray-800 font-sans leading-relaxed flex flex-col min-h-screen"
    >
    <header class="bg-white shadow-sm mb-8">
        <div
                class="container mx-auto px-4 py-4 flex justify-between items-center"
        >
            <a
                    href='${AppRoutes.AUTHORIZE}'
                    class="text-xl font-heading font-bold text-primary hover:text-primary/80 transition-colors"
            >Kollektiv MCP</a
            >
        </div>
    </header>
    <main class="container mx-auto px-4 pb-12 flex-grow">
        ${content}
    </main>
    <footer class="bg-gray-100 py-6 mt-12">
        <div class="container mx-auto px-4 text-center text-gray-600">
            <p>
                &copy; ${new Date().getFullYear()} Kollektiv MCP.
                All rights reserved.
            </p>
        </div>
    </footer>
    </body>
    </html>
`;