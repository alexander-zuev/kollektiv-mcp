export function getAuthHeaders(accessToken?: string): { Authorization: string } | {} {
    const jwt = accessToken;

    return jwt ? {Authorization: `Bearer ${jwt}`} : {};
}

export async function handleAuthError(statusCode: 401 | 403, errorCode?: string): Promise<void> {
    // Worker-specific: log or throw
    console.error(`Worker auth error ${statusCode}: ${errorCode}`);
}