export interface WaitlistRepository {
  save(email: string): Promise<void>;
  exists(email: string): Promise<boolean>;
  getCount(): Promise<number>;
  getRecentSignups(since: Date): Promise<{ email: string; createdAt: Date }[]>;
}