import {getAuthRoute} from "@shared/api/app-routes.ts";
import {html} from "hono/html";
import type {HtmlEscapedString} from "hono/utils/html";

export const base = (content: HtmlEscapedString | string, title: string) =>
    html`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8"/>
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Kollektiv MCP</title>
            <!-- Load compiled CSS (complied for Hono to be able to serve without using a CDN -->

            <link rel="stylesheet" href="/styles.css"/>
            <!-- Preconnect (recommended for performance) -->
            <link rel="preconnect" href="https://fonts.googleapis.com"/>
            <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>

            <!-- Load Google Fonts -->
            <link
                    rel="stylesheet"
                    href="https://fonts.googleapis.com/css2?family=Inter:ital,wght@0,300;0,400;0,500;0,700;1,400;1,700&family=Space+Grotesk:wght@300;400;500;700&family=Space+Mono:ital,wght@0,400;0,700;1,400;1,700&display=swap"
            />
            <!-- Load Phosphor/web icons -->

            <link
                    rel="stylesheet"
                    type="text/css"
                    href="https://cdn.jsdelivr.net/npm/@phosphor-icons/web@2.1.2/src/regular/style.css"
            />
        </head>
        <!-- All base styles are defined in styles.css. Here we only override the defaults if needed. -->
        <body class="min-h-screen flex flex-col">
        <header class="content-container-fixed-width py-6 flex justify-center items-center ">
            <a
                    href="${getAuthRoute('authorize')}"
                    class="text-2xl font-bold font-mono text-foreground"
            >
                Kollektiv MCP
            </a>
        </header>

        <main class="content-container-fixed-width flex flex-1 h-full justify-center items-center">
            ${content}
        </main>

        <footer class="py-6">
            <div class="content-container-fixed-width text-center font-mono text-muted-foreground">
                <p>&copy; ${new Date().getFullYear()} Kollektiv</p>
            </div>
        </footer>
        </body>
        </html>
    `;