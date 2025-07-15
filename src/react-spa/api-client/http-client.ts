import {type ApiClientConfig, createApiClient} from '@shared/api/http-client';
import {getAuthHeader, authErrorHandler} from "@/api-client/utils";

const KollektivAPIConfig: ApiClientConfig = {
    getAuthHeaders: getAuthHeader,
    handleAuthError: authErrorHandler,
};

export const api = createApiClient(KollektivAPIConfig);