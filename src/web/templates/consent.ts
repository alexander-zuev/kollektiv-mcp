import {html} from "hono/html";

type ConsentScreenProps = {
    oauthReq: {
        clientId: string;
        state: string;
        codeChallenge: string;
        codeChallengeMethod: string;
    };
    clientInfo: {
        clientName: string;
    };
    user: {
        id: string;
        email?: string; // Make email optional to match Supabase user type
    };
};

export const renderConsentScreen = ({oauthReq, clientInfo, user}: ConsentScreenProps) => {
    // Use email if available, otherwise fallback to 'User'
    const userIdentifier = user.email || `User ${user.id.substring(0, 8)}`;

    return html`
        <h2>Hi, ${userIdentifier}</h2>
        <p><b>${clientInfo.clientName}</b> wants to access your account.</p>

        <form method="POST" action="/authorize">
            <input type="hidden" name="client_id" value="${oauthReq.clientId}"/>
            <input type="hidden" name="state" value="${oauthReq.state}"/>
            <input type="hidden" name="code_challenge" value="${oauthReq.codeChallenge}"/>
            <input type="hidden" name="code_challenge_method"
                   value="${oauthReq.codeChallengeMethod}"/>
            <button type="submit">Authorize</button>
        </form>
    `;
};