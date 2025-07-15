import {describe, expect, it} from "vitest";
import {createApiClient} from "@/api-client/client/base";
import {ApiError} from "@/api-client/types/base";

// Define the expected structure for the /json endpoint response
interface HttpbinJsonResponse {
    slideshow: {
        author: string;
        date: string;
        slides: Array<{ title: string; type: string; items?: string[] }>;
        title: string;
    };
}

const skipIntegration = process.env.CI || process.env.SKIP_INTEGRATION;

describe.skipIf(skipIntegration)("API Client integration tests using HTTPBIN", () => {
    const apiClient = createApiClient({baseUrl: "https://httpbin.org"});
    const testTimeoutMs = 10000; // 10 sec for external calls

    // Helper to handle potential 5xx errors from httpbin and skip the test
    const runTestHandlingHttpbin5xx = async (testFn: () => Promise<void>, context: any) => {
        try {
            await testFn();
        } catch (error) {
            // If httpbin returns 5xx, it's their issue, not ours. Skip the test.
            if (error instanceof ApiError && error.status >= 500) {
                console.warn(
                    `[WARN] Skipping test due to httpbin server error: ${error.status} ${error.message}`,
                );
                context.skip(); // Use Vitest's context.skip()
                return; // Exit early
            }

            // If it's an assertion error with a message about 5xx status, also skip the test
            if (
                error instanceof Error &&
                (error.message.includes("503") ||
                    error.message.includes("5xx") ||
                    error.message.includes("server error"))
            ) {
                console.warn(`[WARN] Skipping test due to possible httpbin server error: ${error.message}`);
                context.skip(); // Use Vitest's context.skip()
                return; // Exit early
            }

            // Re-throw other errors (like 4xx, network errors, other assertion failures)
            throw error;
        }
    };

    // Updated Test: GET request to /json endpoint
    it(
        "should GET JSON structure from /json endpoint",
        async (context) => {
            await runTestHandlingHttpbin5xx(async () => {
                const response = await apiClient.get<HttpbinJsonResponse>("/json" as any, {
                    timeoutMs: testTimeoutMs, // Add test-specific timeout
                });
                // Basic structure checks: Verify the 'slideshow' object and some of its properties exist
                expect(response).toBeDefined();
                expect(response).toHaveProperty("slideshow");
                expect(response.slideshow).toHaveProperty("author");
                expect(response.slideshow).toHaveProperty("title");
                expect(response.slideshow).toHaveProperty("slides");
                expect(Array.isArray(response.slideshow.slides)).toBe(true);
                // You could add more specific checks here if needed, e.g., checking types or specific values
                expect(typeof response.slideshow.author).toBe("string");
            }, context);
        },
        testTimeoutMs + 1000,
    ); // Vitest timeout slightly longer than request timeout

    it(
        "should POST JSON (camelCase) and receive echoed data (camelCase)",
        async (context) => {
            await runTestHandlingHttpbin5xx(async () => {
                const body = {userId: "testUser", isActive: true, nestedData: {value: 1}};
                // Client converts body to snake_case, httpbin echoes it, http-client converts response back to camelCase
                const response = await apiClient.post<{
                    json: typeof body;
                }>("/anything" as any, body, {timeoutMs: testTimeoutMs});
                expect(response.json).toEqual(body);
            }, context);
        },
        testTimeoutMs + 1000,
    );

    it(
        "should handle expected 4xx client errors correctly",
        async (context) => {
            await runTestHandlingHttpbin5xx(async () => {
                // First test: Check that the request throws an ApiError
                await expect(
                    apiClient.get("/status/404" as any, {timeoutMs: testTimeoutMs}),
                ).rejects.toThrowError(ApiError); // Expect ApiError specifically

                // Second test: Check the error properties
                try {
                    await apiClient.get("/status/404" as any, {timeoutMs: testTimeoutMs});
                } catch (error: any) {
                    expect(error).toBeInstanceOf(ApiError);
                    // Check that it's an error status code (4xx or 5xx)
                    expect(error.status).toBeGreaterThanOrEqual(400);
                }
            }, context);
        },
        testTimeoutMs + 1000,
    );
});