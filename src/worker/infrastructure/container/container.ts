// import type {IEmailService} from '@/domain/interfaces/IEmailService';
// import type {WaitlistRepository} from '@/domain/repositories/WaitlistRepository';
// import {ResendEmailService} from '@/infrastructure/email/ResendEmailService';
// import {QueueService} from '@/infrastructure/queue/QueueService';
// import {D1WaitlistRepository} from '@/infrastructure/repositories/D1WaitlistRepository';
//
// export function createWaitlistRepository(env: Env): WaitlistRepository {
//     return new D1WaitlistRepository(env.D1);
// }
//
// export function createEmailService(env: Env): IEmailService {
//     return new ResendEmailService(env.RESEND_API_KEY);
// }
//
// export function createQueueService(env: Env): QueueService {
//     return new QueueService(env.CLAUDE_CODE_QUEUE);
// }