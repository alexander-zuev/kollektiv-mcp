import { html } from "hono/html";

type RenderMagicLinkSentScreenProps = {
	email: string;
};

export const renderMagicLinkSentScreen = ({ email }: RenderMagicLinkSentScreenProps) => {
	return html`
        <div class="flex w-full justify-center p-8">
            <div class="max-w-lg w-full rounded-lg border border-border bg-card p-6 text-center flex flex-col gap-4 items-center">
                <i class="ph ph-paper-plane-tilt text-5xl text-primary mt-4"></i>
                <h1 class="text-2xl text-center text-foreground">Check Your Email</h1>


                <div class="space-y-4 text-sm leading-relaxed text-foreground/80 mt-2">
                    <p>
                        Please check <strong>${email}</strong> and click the link to complete your
                        login. The link will expire in 10 minutes.
                    </p>
                    <div class="flex items-start gap-2 text-sm">
                        <i class="ph ph-info text-info text-lg mt-0.5"></i>
                        <span>If you don't see the email in your inbox, please check your spam folder.</span>
                    </div>
                </div>

                <div class="flex items-center gap-2 mt-4 text-sm text-muted-foreground border-t border-border pt-4 w-full justify-center">
                    <i class="ph ph-shield text-success"></i>
                    <span>This login link is secure and can only be used once.</span>
                </div>
            </div>
        </div>
    `;
};
