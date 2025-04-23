import { env } from "cloudflare:workers";
import type { ApiClientConfig } from "@/mcp/api/client/config";
import { createApiClient } from "./base";

const KollektivAPIConfig: ApiClientConfig = {
	baseUrl: env.API_BASE_URL,
};

export const api = createApiClient(KollektivAPIConfig);
