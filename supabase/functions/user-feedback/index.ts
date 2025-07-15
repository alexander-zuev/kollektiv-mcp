import initializeSentry, {Sentry} from "shared/sentry.ts";

initializeSentry();
import {getSupabaseAdmin} from "shared/supabaseClient.ts";
import {Resend} from "resend";
import "@types/supabase-edge";


const supabaseAdmin = getSupabaseAdmin();
const EMAIL_DELAY_HOURS = 3;
const FEEDBACK_QUEUE_TABLE = "user_feedback_queue";


// ────────────────────────────────────────────────────────────────────────────────
// Templates: Email templates
// ────────────────────────────────────────────────────────────────────────────────
const noUploadTemplate = (): string => `
    <p>Hey 👋 - just wanted to check in quickly.</p>

  <p>Thanks for trying out Kollektiv! It’s still early, so I'm eager to learn what your experience was?</p>
  <p>I noticed you haven’t uploaded any documents yet — can I help you set it up?</p>

  <p>Alex<br/>Creator of <strong>Kollektiv</strong></p>
`;

const noQueryTemplate = (): string => `
<p>Hey 👋 - just wanted to check in quickly.</p>

<p>Thanks for uploading your first documents to Kollektiv. I’m keen to learn how the experience feels so far?</p>
<p>I see you haven’t run a query yet — can I help you with that?</p>

<p>Appreciate your time and thanks for trying out Kollektiv!</p>
 <p>Alex<br/>Creator of <strong>Kollektiv</strong></p>
`;


// ────────────────────────────────────────────────────────────────────────────────
// Helper: does the user still belong to the segment?
// ────────────────────────────────────────────────────────────────────────────────
export async function isEligible(userId: string, type: "no_upload" | "no_query") {
    if (type === "no_upload") {
        const {count} = await supabaseAdmin
            .from("documents")
            .select("*", {count: "exact", head: true})
            .eq("user_id", userId);
        return (count ?? 0) === 0; // if user doc count is 0 then it's true
    }

    // type === "no_query"
    const {count: docCount} = await supabaseAdmin
        .from("documents")
        .select("*", {count: "exact", head: true})
        .eq("user_id", userId);

    if ((docCount ?? 0) === 0) return false; // ut's false if a user doesn't have any docs

    const {count: qsCount} = await supabaseAdmin
        .from("query_stats")
        .select("*", {count: "exact", head: true})
        .eq("user_id", userId);

    return (qsCount ?? 0) === 0; // if user query count is 0 then it's true
}

export type DocRow = {
    id: string;
    user_id: string;
    email_type: "no_upload" | "no_query";
};

export default {
    async fetch(_req) {
        try {

            // 1. fetch queued rows older than grace period
            const since = new Date(Date.now() - EMAIL_DELAY_HOURS * 60 * 60 * 1_000)
                .toISOString();

            const {data: rows, error: fetchErr} = await supabaseAdmin
                .from(FEEDBACK_QUEUE_TABLE)
                .select("id,user_id,email_type")
                .eq("status", "queued")
                .lte("created_at", since);

            if (fetchErr) throw new Error(`fetch failed: ${fetchErr.message}`);
            if (!rows || rows.length === 0) {
                return new Response(JSON.stringify({sent: 0, cancelled: 0}));
            }

            const resend = new Resend(Deno.env.get("RESEND_API_KEY") ?? "");

            let sent = 0;
            let cancelled = 0;


            for (const row of rows as DocRow[]) {
                try {
                    const eligible = await isEligible(row.user_id, row.email_type);

                    if (!eligible) {
                        await supabaseAdmin
                            .from(FEEDBACK_QUEUE_TABLE)
                            .update({status: "cancelled"})
                            .eq("id", row.id);

                        cancelled++;
                        continue;
                    }

                    // Get the user’s e-mail via Auth Admin API
                    const {data: userData, error: userErr} =
                        await supabaseAdmin.auth.admin.getUserById(row.user_id);
                    if (userErr || !userData?.user?.email) {
                        throw new Error(`Cannot resolve e-mail for user ${row.user_id}`);
                    }

                    // Send with Resend
                    await resend.emails.send({
                        from: "az@thekollektiv.ai",
                        to: userData.user.email,
                        subject: "Can I help you setup Kollektiv.ai? 🤔",
                        html:
                            row.email_type === "no_upload"
                                ? noUploadTemplate()
                                : noQueryTemplate(),
                    });

                    await supabaseAdmin
                        .from(FEEDBACK_QUEUE_TABLE)
                        .update({
                            status: "sent",
                            sent_at: new Date().toISOString(),
                        })
                        .eq("id", row.id);

                    sent++;
                } catch (inner) {
                    // mark single row as failed, keep loop alive
                    await supabaseAdmin
                        .from(FEEDBACK_QUEUE_TABLE)
                        .update({
                            status: "failed",
                        })
                        .eq("id", row.id);
                    console.error("Row failed:", inner);
                }
            }
            return new Response(JSON.stringify({sent, cancelled}));
        } catch (outer) {
            // any unhandled error ⇒ 500
            Sentry.captureException(outer)
            console.error("Fatal error in function:", outer);
            return new Response(
                JSON.stringify({error: "internal server error"}),
                {status: 500},
            );
        }
    },
} satisfies Deno.ServeDefaultExport;