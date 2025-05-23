import {getSupabase} from "@/web/middleware/supabase";
import {getCurrentUser} from "@/features/auth/utils";
import {AuthApiError, AuthError} from "@supabase/supabase-js";
import type {Context} from "hono";
import {beforeEach, describe, expect, it, vi} from "vitest";
import {mockGetUserNoSession, mockGetUserSuccess, testUser} from "@tests/mocks";


// TODO: This is monstrous and needs to be refactored
describe("User Utilities", () => {
    let supabaseMocks: any;

    // Set up mocks before each test
    beforeEach(async () => {
        // Reset all mocks
        vi.resetAllMocks();

        // Get the supabase mocks from the global setup
        const supabase = getSupabase({} as any);
    });

    // Create a mock context for testing
    const createMockContext = (): Context => {
        return {} as Context;
    };

    // Create a mock Supabase client
    const createMockSupabaseClient = () => ({
        auth: {
            getUser: vi.fn(),
        },
    });

    describe("getCurrentUser", () => {
        it("should return user when authentication is successful", async () => {
            // Arrange
            const mockContext = createMockContext();
            const mockSupabaseClient = createMockSupabaseClient();
            mockSupabaseClient.auth.getUser.mockResolvedValue(mockGetUserSuccess);
            (getSupabase as vi.Mock).mockReturnValue(mockSupabaseClient);

            // Act
            const result = await getCurrentUser(mockContext);

            // Assert
            expect(result).toEqual(testUser);
            expect(getSupabase).toHaveBeenCalledWith(mockContext);
            expect(mockSupabaseClient.auth.getUser).toHaveBeenCalled();
        });

        it("should return null when AuthSessionMissingError occurs", async () => {
            // Arrange
            const mockContext = createMockContext();
            const mockSupabaseClient = createMockSupabaseClient();

            // Create a custom error with the name property set correctly
            const authSessionError = new AuthError("Auth session missing", 401);
            // Explicitly set the name property
            authSessionError.name = "AuthSessionMissingError";

            mockSupabaseClient.auth.getUser.mockResolvedValue({
                data: {user: null},
                error: authSessionError,
            });

            (getSupabase as vi.Mock).mockReturnValue(mockSupabaseClient);

            // Act
            const result = await getCurrentUser(mockContext);

            // Assert
            expect(result).toBeNull();
            expect(getSupabase).toHaveBeenCalledWith(mockContext);
            expect(mockSupabaseClient.auth.getUser).toHaveBeenCalled();
        });

        it("should return null when user_not_found error occurs", async () => {
            // Arrange
            const mockContext = createMockContext();
            const mockSupabaseClient = createMockSupabaseClient();

            // Create an AuthApiError with the specific error code
            const userNotFoundError = new AuthApiError("User not found", 400, "user_not_found");

            mockSupabaseClient.auth.getUser.mockResolvedValue({
                data: {user: null},
                error: userNotFoundError,
            });

            (getSupabase as vi.Mock).mockReturnValue(mockSupabaseClient);

            // Act
            const result = await getCurrentUser(mockContext);

            // Assert
            expect(result).toBeNull();
            expect(getSupabase).toHaveBeenCalledWith(mockContext);
            expect(mockSupabaseClient.auth.getUser).toHaveBeenCalled();
        });

        it("should return null when refresh_token_not_found error occurs", async () => {
            // Arrange
            const mockContext = createMockContext();
            const mockSupabaseClient = createMockSupabaseClient();

            // Create an AuthApiError with the specific error code
            const refreshTokenNotFoundError = new AuthApiError(
                "Refresh token not found",
                400,
                "refresh_token_not_found",
            );

            mockSupabaseClient.auth.getUser.mockResolvedValue({
                data: {user: null},
                error: refreshTokenNotFoundError,
            });

            (getSupabase as vi.Mock).mockReturnValue(mockSupabaseClient);

            // Act
            const result = await getCurrentUser(mockContext);

            // Assert
            expect(result).toBeNull();
            expect(getSupabase).toHaveBeenCalledWith(mockContext);
            expect(mockSupabaseClient.auth.getUser).toHaveBeenCalled();
        });

        it("should return null when session_not_found error occurs", async () => {
            // Arrange
            const mockContext = createMockContext();
            const mockSupabaseClient = createMockSupabaseClient();

            // Create an AuthApiError with the specific error code
            const sessionNotFoundError = new AuthApiError("Session not found", 400, "session_not_found");

            mockSupabaseClient.auth.getUser.mockResolvedValue({
                data: {user: null},
                error: sessionNotFoundError,
            });

            (getSupabase as vi.Mock).mockReturnValue(mockSupabaseClient);

            // Act
            const result = await getCurrentUser(mockContext);

            // Assert
            expect(result).toBeNull();
            expect(getSupabase).toHaveBeenCalledWith(mockContext);
            expect(mockSupabaseClient.auth.getUser).toHaveBeenCalled();
        });

        it("should return null when session_expired error occurs", async () => {
            // Arrange
            const mockContext = createMockContext();
            const mockSupabaseClient = createMockSupabaseClient();

            // Create an AuthApiError with the specific error code
            const sessionExpiredError = new AuthApiError("Session expired", 400, "session_expired");

            mockSupabaseClient.auth.getUser.mockResolvedValue({
                data: {user: null},
                error: sessionExpiredError,
            });

            (getSupabase as vi.Mock).mockReturnValue(mockSupabaseClient);

            // Act
            const result = await getCurrentUser(mockContext);

            // Assert
            expect(result).toBeNull();
            expect(getSupabase).toHaveBeenCalledWith(mockContext);
            expect(mockSupabaseClient.auth.getUser).toHaveBeenCalled();
        });

        it("should throw AuthError for unexpected authentication errors", async () => {
            // Arrange
            const mockContext = createMockContext();
            const mockSupabaseClient = createMockSupabaseClient();
            const unexpectedError = new AuthError("Unexpected auth error", 500);
            mockSupabaseClient.auth.getUser.mockResolvedValue({
                data: {user: null},
                error: unexpectedError,
            });
            (getSupabase as vi.Mock).mockReturnValue(mockSupabaseClient);

            // Act & Assert
            await expect(getCurrentUser(mockContext)).rejects.toThrow(unexpectedError);
            expect(getSupabase).toHaveBeenCalledWith(mockContext);
            expect(mockSupabaseClient.auth.getUser).toHaveBeenCalled();
        });

        it("should re-throw Error exceptions", async () => {
            // Arrange
            const mockContext = createMockContext();
            const mockSupabaseClient = createMockSupabaseClient();
            const unexpectedError = new Error("Network error");
            mockSupabaseClient.auth.getUser.mockRejectedValue(unexpectedError);
            (getSupabase as vi.Mock).mockReturnValue(mockSupabaseClient);

            // Act & Assert
            await expect(getCurrentUser(mockContext)).rejects.toThrow("Network error");
            expect(getSupabase).toHaveBeenCalledWith(mockContext);
            expect(mockSupabaseClient.auth.getUser).toHaveBeenCalled();
        });

        it("should handle non-Error exceptions", async () => {
            // Arrange
            const mockContext = createMockContext();
            const mockSupabaseClient = createMockSupabaseClient();
            mockSupabaseClient.auth.getUser.mockRejectedValue("string error"); // Non-Error rejection
            (getSupabase as vi.Mock).mockReturnValue(mockSupabaseClient);

            // Act & Assert
            await expect(getCurrentUser(mockContext)).rejects.toThrow(/Unexpected non-Error thrown/);
            expect(getSupabase).toHaveBeenCalledWith(mockContext);
            expect(mockSupabaseClient.auth.getUser).toHaveBeenCalled();
        });
    });
});