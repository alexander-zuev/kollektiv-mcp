export function getAuthHeader(accessToken?: string): { Authorization: string } | {} {
    const jwt = accessToken;

    return jwt ? {Authorization: `Bearer ${jwt}`} : {};
}