import type { IEmailService } from '@/domain/interfaces/IEmailService';
import { infrastructureLogger } from '@/infrastructure/logger/logger';
import { EmailServiceError } from '@/shared/errors/infrastructure.errors';
import { Resend } from 'resend';

export class ResendEmailService implements IEmailService {
  private readonly resend: Resend;

  constructor(apiKey: string) {
    if (!apiKey) {
      throw new EmailServiceError('Resend API key is required', 'configuration', 'Resend');
    }
    this.resend = new Resend(apiKey);
  }

  async sendWelcomeEmail(email: string): Promise<void> {
    try {
      const result = await this.resend.emails.send({
        from: 'Claude Code Portable <noreply@claudeportable.dev>',
        to: [email],
        subject: "🎉 You're on the Claude Code Portable waitlist!",
        html: `
          <h1>Thanks for joining the waitlist!</h1>
          <p>I'll notify you as soon as Claude Code Portable is ready for launch.</p>
          <p>— Alex</p>
        `,
      });

      infrastructureLogger.info('Welcome email sent successfully', {
        email,
        messageId: result.data?.id,
      });
    } catch (error) {
      infrastructureLogger.error('Failed to send welcome email', {
        email,
        error: error instanceof Error ? error.message : String(error),
      });

      throw new EmailServiceError(
        `Failed to send welcome email to ${email}`,
        'send',
        'Resend',
        error instanceof Error ? error : new Error(String(error))
      );
    }
  }

  async sendWaitlistSummary(
    toEmail: string,
    signups: { email: string; createdAt: Date }[],
    totalCount: number
  ): Promise<void> {
    try {
      const subject = `Claude Code Portable - ${signups.length} new waitlist signups`;
      const htmlContent = this.buildWaitlistSummaryHtml(signups, totalCount);

      const result = await this.resend.emails.send({
        from: 'Claude Code Portable <notifications@claudeportable.dev>',
        to: [toEmail],
        subject,
        html: htmlContent,
      });

      infrastructureLogger.info('Waitlist summary email sent successfully', {
        toEmail,
        newSignups: signups.length,
        totalCount,
        messageId: result.data?.id,
      });
    } catch (error) {
      infrastructureLogger.error('Failed to send waitlist summary email', {
        toEmail,
        newSignups: signups.length,
        error: error instanceof Error ? error.message : String(error),
      });

      throw new EmailServiceError(
        `Failed to send waitlist summary to ${toEmail}`,
        'send',
        'Resend',
        error instanceof Error ? error : new Error(String(error))
      );
    }
  }

  private buildWaitlistSummaryHtml(
    signups: { email: string; createdAt: Date }[],
    totalCount: number
  ): string {
    const escapeHtml = (text: string): string => {
      return text
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#x27;');
    };

    const signupsList = signups
      .map(
        signup =>
          `<li style="margin: 8px 0; padding: 8px; background: #f8f9fa; border-radius: 4px;">
            <strong>${escapeHtml(signup.email)}</strong><br>
            <small style="color: #6c757d;">${signup.createdAt.toLocaleDateString()} at ${signup.createdAt.toLocaleTimeString()}</small>
          </li>`
      )
      .join('');

    return `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <title>Claude Code Portable - Waitlist Summary</title>
        </head>
        <body style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; line-height: 1.6;">
          <h1 style="color: #2563eb; margin-bottom: 30px;">🎉 Claude Code Portable - Daily Waitlist Summary</h1>
          
          <div style="background: #eff6ff; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #2563eb;">
            <h2 style="margin-top: 0; color: #1d4ed8;">📊 Summary</h2>
            <p style="margin: 5px 0;"><strong>New signups today:</strong> ${signups.length}</p>
            <p style="margin: 5px 0;"><strong>Total waitlist size:</strong> ${totalCount}</p>
          </div>
          
          ${
            signups.length > 0
              ? `
          <div style="margin: 30px 0;">
            <h2 style="color: #1d4ed8;">📧 New Signups (Last 24h)</h2>
            <ul style="list-style-type: none; padding: 0;">
              ${signupsList}
            </ul>
          </div>
          `
              : `
          <div style="margin: 30px 0; padding: 20px; background: #f8f9fa; border-radius: 8px; text-align: center;">
            <p style="color: #6c757d; font-style: italic; margin: 0;">No new signups in the last 24 hours.</p>
          </div>
          `
          }
          
          <div style="margin-top: 40px; padding-top: 20px; border-top: 1px solid #e9ecef; color: #6c757d; font-size: 14px;">
            <p>This is an automated daily summary from Claude Code Portable.</p>
            <p>Generated on ${new Date().toLocaleDateString()} at ${new Date().toLocaleTimeString()}</p>
          </div>
        </body>
      </html>
    `;
  }
}