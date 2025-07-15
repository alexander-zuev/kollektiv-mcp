// import {authErrorHandler, getAuthHeader} from '@shared/api/http-client/utils';
import {type ApiClientConfig, createApiClient} from '@shared/api/http-client';
import {getAuthHeaders, handleAuthError} from "./auth-helpers";


const KollektivApiConfig: ApiClientConfig = {
    // no base Url since worker and react app share the domain
    getAuthHeaders: getAuthHeaders,
    handleAuthError: handleAuthError,
    caseConversion: false,
};

export const apiClient = createApiClient(KollektivApiConfig);