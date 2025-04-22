import type { ApiClientConfig } from "@/mcp/api/client/config";
// api.ts
import { createApiClient } from "./base";

const KollektivAPIConfig: ApiClientConfig = {
	baseUrl: "https://mcp.thekollektiv.ai",
};

export const api = createApiClient(KollektivAPIConfig);
