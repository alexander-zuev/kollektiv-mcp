import {afterEach, beforeEach, describe, expect, it, vi} from "vitest";
import {createApiClient} from "@/api-client/client/base";
import {ApiError} from "@/api-client/types/base";

// --- Configuration ---
const BASE_URL = "https://fake-api.com";
const DEFAULT_TIMEOUT = 100;
const TEST_ROUTE_WITH_PARAM = "/items/:itemId";

let mockFetch: ReturnType<typeof vi.fn>;

beforeEach(() => {
    // Create a fresh mock before each test
    mockFetch = vi.fn();
    // Replace the global fetch ith out mock
    vi.stubGlobal("fetch", mockFetch);
    // Use fake timers
    vi.useFakeTimers(); // <--- Add () here
});

afterEach(() => {
    // Restore fetch and timers after each test
    vi.restoreAllMocks();
    vi.useRealTimers();
});

// Enhanced mock response creator
const createMockResponse = (
    body: any,
    status: number,
    ok: boolean,
    statusText = "",
    headers: HeadersInit = {"Content-Type": "application/json"},
): Response => {
    const responseBody = typeof body === "string" ? body : JSON.stringify(body);
    return {
        ok,
        status,
        statusText,
        headers: new Headers(headers), // Use Headers object
        json: vi.fn().mockResolvedValue(body),
        text: vi.fn().mockResolvedValue(responseBody),
        // Add other methods if needed
    } as unknown as Response;
};

const createTimeoutMockFetch = (resolveDelayMs: number) => {
    return vi.fn((url: string, options?: RequestInit) => {
        const signal = options?.signal;
        return new Promise((resolve, reject) => {
            const doResolve = () => {
                console.log(`[mockFetch setTimeout ${resolveDelayMs}ms] Resolving.`);
                signal?.removeEventListener("abort", handleAbort);
                resolve(createMockResponse({}, 200, true));
            };
            const timerId = setTimeout(doResolve, resolveDelayMs);

            const handleAbort = () => {
                console.log("[mockFetch abortListener] Abort signal received! Rejecting.");
                clearTimeout(timerId);
                reject(new DOMException("The operation was aborted.", "AbortError"));
            };

            if (signal) {
                if (signal.aborted) {
                    handleAbort();
                } else {
                    signal.addEventListener("abort", handleAbort, {once: true});
                }
            } else {
                // If no signal is provided (e.g., client default timeout), we might need this promise to never resolve for timeout tests, or resolve normally otherwise.
                // For this specific test, a signal IS expected because a timeoutMs is provided.
            }
        });
    });
};

// --- Tests ---
describe("Good ol unit tests of baseClient", () => {
    // Create a client instance of client for testing
    const defaultHeaders = {Accept: "application/json", "Content-Type": "application/json"};
    const apiClient = createApiClient({baseUrl: BASE_URL, timeout: DEFAULT_TIMEOUT});

    // Helper to run a test expecting an ApiError
    const expectApiError = async (
        apiCall: () => Promise<any>,
        expectedStatus: number,
        expectedStatusText: string,
        expectedMessageContent?: string | RegExp,
    ) => {
        try {
            await apiCall();
            // If the apiCall completes without throwing, the test should fail.
            expect.fail("Expected apiCall to throw an ApiError, but it did not.");
        } catch (error: any) {
            // Check if the caught error is the correct type
            expect(error).toBeInstanceOf(ApiError);
            // Check the specific properties of the ApiError
            expect(error.status).toBe(expectedStatus);
            expect(error.statusText).toBe(expectedStatusText);
            if (expectedMessageContent) {
                expect(error.message).toMatch(expectedMessageContent);
            }
        }
    };

    describe("URL Building & Request Options", () => {
        it("should build URL with path parameters", async () => {
            const mockResponse = createMockResponse({id: "123", status: "ok"}, 200, true);
            mockFetch.mockResolvedValue(mockResponse);

            await apiClient.get(TEST_ROUTE_WITH_PARAM as any, {pathParams: {itemId: "123"}});

            expect(mockFetch).toHaveBeenCalledWith(
                `${BASE_URL}/items/123`,
                expect.objectContaining({method: "GET"}),
            );
        });

        it("should build URL with query parameters, ignoring null/undefined", async () => {
            const mockResponse = createMockResponse([], 200, true);
            mockFetch.mockResolvedValue(mockResponse);

            await apiClient.get("/search" as any, {
                queryParams: {
                    q: "test",
                    filter: "active",
                    page: undefined,
                    limit: undefined,
                },
            });

            expect(mockFetch).toHaveBeenCalledWith(
                `${BASE_URL}/search?q=test&filter=active`, // page and limit should be excluded
                expect.objectContaining({method: "GET"}),
            );
        });

        it("should build URL with both path and query parameters", async () => {
            const mockResponse = createMockResponse({id: "456", status: "ok"}, 200, true);
            mockFetch.mockResolvedValue(mockResponse);

            await apiClient.get(TEST_ROUTE_WITH_PARAM as any, {
                pathParams: {itemId: "456"},
                queryParams: {format: "short"},
            });

            expect(mockFetch).toHaveBeenCalledWith(
                `${BASE_URL}/items/456?format=short`,
                expect.objectContaining({method: "GET"}),
            );
        });

        it("should merge default and request-specific headers", async () => {
            const mockResponse = createMockResponse({status: "ok"}, 200, true);
            mockFetch.mockResolvedValue(mockResponse);
            const customHeaders = {"X-Custom-Header": "value1", Accept: "application/xml"};

            await apiClient.get("/resource" as any, {headers: customHeaders});

            expect(mockFetch).toHaveBeenCalledWith(
                expect.any(String),
                expect.objectContaining({
                    headers: {
                        ...defaultHeaders, // Default headers should be present
                        ...customHeaders, // Custom headers override defaults
                    },
                }),
            );
        });
    });

    describe("GET Requests (testing request and getProcessedResponse indirectly)", () => {
        it("should return camelCased data on successful GET (200 OK)", async () => {
            const rawData = {user_id: 1, user_name: "Test User"};
            const expectedData = {userId: 1, userName: "Test User"}; // convertToCamelCase(rawData)
            const mockResponse = createMockResponse(rawData, 200, true, "OK");
            mockFetch.mockResolvedValue(mockResponse);

            const result = await apiClient.get("/query");

            expect(result).toEqual(expectedData);
            expect(mockFetch).toHaveBeenCalledOnce();
            expect(mockFetch).toHaveBeenCalledWith(
                `${BASE_URL}/query`, // Verify URL
                expect.objectContaining({method: "GET"}), // Verify method and other options if needed
            );
            expect(mockResponse.json).toHaveBeenCalledTimes(1);
        });

        it("should return empty content {} on successful GET (204 No content)", async () => {
            const mockResponse = createMockResponse({}, 204, true, "No Content");
            mockFetch.mockResolvedValue(mockResponse);

            const result = await apiClient.get("/query");

            expect(result).toEqual({});
            expect(mockResponse.json).not.toHaveBeenCalled();
        });

        it("should throw ApiError for a 404 Not Found response", async () => {
            const errorBody = {error: "Resource not found", code: "NOT_FOUND"};
            const mockResponse = createMockResponse(errorBody, 404, false, "Not Found");
            mockFetch.mockResolvedValue(mockResponse);

            // Act & Assert
            await expect(apiClient.get("/nonexistent" as any)).rejects.toThrow(ApiError);

            // For more specific checks:
            await expect(apiClient.get("/nonexistent" as any)).rejects.toEqual(
                expect.objectContaining({
                    name: "ApiError",
                    status: 404,
                    statusText: "Not Found",
                    // Check message derived from body (adjust based on your error parsing logic)
                    message: expect.stringContaining("Resource not found"),
                }),
            );

            expect(mockFetch).toHaveBeenCalledTimes(2); // Called twice due to the two awaits above
            expect(mockResponse.text).toHaveBeenCalled(); // Error logic tries .text()
        });

    });

    describe("POST Requests", () => {
        // Add tests similar to GET but for POST
        it("should send snake_case body on successful POST (201 Created)", async () => {
            // Arrange
            const requestBody = {requestData: "value", anotherKey: 123};
            const expectedSentBody = JSON.stringify({
                request_data: "value",
                another_key: 123,
            });
            const responseBody = {result_id: "xyz", status_text: "Created"};
            const expectedResult = {resultId: "xyz", statusText: "Created"};
            const mockResponse = createMockResponse(responseBody, 201, true, "Created");
            mockFetch.mockResolvedValue(mockResponse);

            // Act
            const result = await apiClient.post("/create" as any, requestBody);

            // Assert
            expect(result).toEqual(expectedResult);
            expect(mockFetch).toHaveBeenCalledTimes(1);
            expect(mockFetch).toHaveBeenCalledWith(
                `${BASE_URL}/create`,
                expect.objectContaining({
                    method: "POST",
                    body: expectedSentBody, // Verify snake_case and stringified body
                    headers: expect.objectContaining({"Content-Type": "application/json"}),
                }),
            );
            expect(mockResponse.json).toHaveBeenCalledTimes(1);
        });
    });

    describe("PUT Requests", () => {
        it("should send snake_cased body and return camelCased data on success (200 OK)", async () => {
            const requestBody = {isActive: false};
            const expectedSentBody = {is_active: false};
            const responseBody = {
                user_id: 456,
                user_name: "updated_user",
                ...expectedSentBody,
            };
            const expectedResult = {userId: 456, userName: "updated_user", isActive: false};

            const mockResponse = createMockResponse(responseBody, 200, true, "OK");
            mockFetch.mockResolvedValue(mockResponse);

            const result = await apiClient.put("items/:itemId" as any, requestBody, {
                pathParams: {itemId: "456"},
            });

            expect(result).toEqual(expectedResult);
            expect(mockFetch).toHaveBeenCalledOnce();
            expect(mockFetch).toHaveBeenCalledWith(
                `${BASE_URL}/items/456`,
                expect.objectContaining({
                    method: "PUT",
                    headers: defaultHeaders,
                    body: JSON.stringify(expectedSentBody),
                }),
            );
            expect(mockResponse.json).toHaveBeenCalledTimes(1);
        });
    });

    describe("DELETE Requests", () => {
        it("should return empty object {} on success (204 No Content)", async () => {
            const mockResponse = createMockResponse(null, 204, true, "No Content");
            mockFetch.mockResolvedValue(mockResponse);

            const result = await apiClient.delete(TEST_ROUTE_WITH_PARAM as any, {
                pathParams: {itemId: "789"},
            });

            expect(result).toEqual({});
            expect(mockFetch).toHaveBeenCalledOnce();
            expect(mockFetch).toHaveBeenCalledWith(
                `${BASE_URL}/items/789`,
                expect.objectContaining({
                    method: "DELETE",
                    headers: defaultHeaders,
                    body: undefined, // DELETE should not have a body by default
                }),
            );
            expect(mockResponse.json).not.toHaveBeenCalled();
        });
    });

    describe("Error Handling", () => {
        it("should throw ApiError for 404 Not Found (JSON body)", async () => {
            const errorBody = {error: "Resource not found", code: "NOT_FOUND"};
            const mockResponse = createMockResponse(errorBody, 404, false, "Not Found");
            mockFetch.mockResolvedValue(mockResponse);

            const apiCall = () => apiClient.get("/nonexistent" as any);

            await expectApiError(apiCall, 404, "Not Found", /Resource not found/);
            expect(mockResponse.text).toHaveBeenCalled(); // Error logic tries .text() then .json()
        });

        it("should throw ApiError for 500 Internal Server Error (plain text body)", async () => {
            const errorBody = "Internal Server Error occurred";
            const mockResponse = createMockResponse(errorBody, 500, false, "Server Error", {
                "Content-Type": "text/plain",
            });
            // Mock .json() to reject for non-json responses
            mockResponse.json = vi
                .fn()
                .mockRejectedValue(new SyntaxError("Unexpected token I in JSON at position 0"));
            mockFetch.mockResolvedValue(mockResponse);

            const apiCall = () => apiClient.get("/server-error" as any);

            await expectApiError(apiCall, 500, "Server Error", /Internal Server Error occurred/);
            expect(mockResponse.text).toHaveBeenCalledTimes(1); // Called once to get the text body
        });

        it("should throw ApiError for 500 Internal Server Error (no body, fallback to statusText)", async () => {
            const mockResponse = createMockResponse(null, 500, false, "Internal Server Error");
            // Mock .text() to resolve with empty string or reject if that's more realistic
            mockResponse.text = vi.fn().mockResolvedValue("");
            // Mock .json() should ideally not be reached if text is empty, but mock it just in case
            mockResponse.json = vi.fn().mockRejectedValue(new Error("No body"));
            mockFetch.mockResolvedValue(mockResponse);

            const apiCall = () => apiClient.get("/server-error-no-body" as any);

            await expectApiError(apiCall, 500, "Internal Server Error", /Internal Server Error/); // Falls back to status text
            expect(mockResponse.text).toHaveBeenCalledTimes(1);
        });

        it("should throw ApiError for JSON parsing error on success response (200 OK)", async () => {
            const invalidJsonBody = "{ invalid json ";
            const mockResponse = createMockResponse(invalidJsonBody, 200, true, "OK", {
                "Content-Type": "application/json",
            });
            // Make .json() actually throw a parse error
            mockResponse.json = vi
                .fn()
                .mockRejectedValue(new SyntaxError("Unexpected token i in JSON at position 2"));
            mockFetch.mockResolvedValue(mockResponse);

            const apiCall = () => apiClient.get("/invalid-json-success" as any);

            await expectApiError(apiCall, 200, "JSON Parsing Error", /Received malformed response from server/i);
            expect(mockResponse.json).toHaveBeenCalledTimes(1);
        });

        it("should throw ApiError for network errors (fetch rejects)", async () => {
            const networkError = new TypeError("Failed to fetch"); // Example network error
            mockFetch.mockRejectedValue(networkError);

            const apiCall = () => apiClient.get("/network-issue" as any);

            await expectApiError(
                apiCall,
                0,
                "Fetch failed",
                /Request failed - either the server could not respond or there was a network \/ CORS issue\./i,
            );
        });
    });

    // You can add a new describe block for timeouts if you like
    describe("Timeout Handling", () => {
        it("should throw ApiError on default timeout", async () => {
            // Mock fetch to simulate an AbortError when the timeout occurs
            mockFetch.mockImplementation(() => {
                // Immediately throw an AbortError when fetch is called
                // This simulates what happens when a timeout occurs
                throw new DOMException("The operation was aborted.", "AbortError");
            });

            // Call the API and expect it to throw an ApiError
            await expect(apiClient.get("/slow" as any)).rejects.toMatchObject({
                status: 0,
                statusText: "Request Cancelled",
                message: "Request timed out or was cancelled",
            });
        });
        it("should reject with ApiError when request-specific timeout is exceeded", async () => {
            // Mock fetch to simulate an AbortError when the timeout occurs
            mockFetch.mockImplementation(() => {
                // Immediately throw an AbortError when fetch is called
                // This simulates what happens when a timeout occurs
                throw new DOMException("The operation was aborted.", "AbortError");
            });

            // Call the API with a custom timeout and expect it to throw an ApiError
            await expect(apiClient.get("/slow" as any, {timeoutMs: 50})).rejects.toMatchObject({
                status: 0,
                statusText: "Request Cancelled",
                message: "Request timed out or was cancelled",
            });
        });
    });
});