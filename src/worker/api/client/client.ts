import {env} from "cloudflare:workers";
import type {ApiClientConfig} from "@/api/client/config";
import {createApiClient} from "./base";


const KollektivAPIConfig: ApiClientConfig = {
    baseUrl: env.API_BASE_URL,
};

export const api = createApiClient(KollektivAPIConfig);