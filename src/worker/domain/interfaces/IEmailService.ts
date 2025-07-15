export interface IEmailService {
  sendWelcomeEmail(email: string): Promise<void>;
  sendWaitlistSummary(
    toEmail: string,
    signups: { email: string; createdAt: Date }[],
    totalCount: number
  ): Promise<void>;
}