// api.ts
import {createApiClient} from './base';
import {ApiClientConfig} from "@/mcp/api/client/config";

const KollektivAPIConfig: ApiClientConfig = {
    baseUrl: 'https://mcp.thekollektiv.ai'
};


export const api = createApiClient(KollektivAPIConfig);