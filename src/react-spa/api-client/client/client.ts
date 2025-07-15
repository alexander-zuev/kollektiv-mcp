import type { ApiClientConfig } from '@/api-client/client/config';
import { createApiClient } from './base';
import { config } from '@/config';
import { authErrorHandler } from '@/features/auth/utils';

const KollektivAPIConfig: ApiClientConfig = {
  baseUrl: config.api.baseUrl,
  onAuthError: authErrorHandler,
};

export const api = createApiClient(KollektivAPIConfig);