import {z} from 'zod';


// Consent schema
export const ConsentFormSchema = z.object({
    client_id: z.string().min(1, 'Client ID must be at least 1 character long'),
    redirect_uri: z.string().url({message: 'Invalid Redirect URI format'}),
    state: z.string().optional(),
    scope: z.string().optional(),
    code_challenge: z.string().min(1, {message: "Code challenge is required"}),
    code_challenge_method: z.enum(['S256', 'plain']).default('S256'), // Assuming S256 is default
    action: z.enum(['allow', 'deny']).optional(), // for actions on consent screen
});
// Export type
export type ConsentFormData = z.infer<typeof ConsentFormSchema>;