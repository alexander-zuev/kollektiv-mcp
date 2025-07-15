import type {AuthRequest, ClientInfo} from "@cloudflare/workers-oauth-provider";

export type AuthFlowContext = {
    oauthReq: AuthRequest;
    client: ClientInfo;
    tx: string;
    csrfToken: string;
};