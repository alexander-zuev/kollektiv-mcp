import {api} from "@/api/client";
import {ApiRoutes} from "@/api/routes";
import type {UserFile} from "@/api/types/documents";
import {listDocumentsTool} from "@/mcp/tools/listDocumentsTool";
import {createErrorResponse, createSuccessTextResponse} from "@/mcp/tools/types";
import {afterEach, describe, expect, it, vi} from "vitest";
import {getAuthHeader} from "@/features/auth";

// Mock the api client
vi.mock("@/api/client", () => ({
    api: {
        get: vi.fn(),
    },
}));
const USER_ID = "test-user-id";

const mockUserDocuments: UserFile[] = [
    {
        id: crypto.randomUUID(),
        filename: "a.pdf",
        filesize: 12_345,
        status: "available",
        uploadedAt: new Date().toISOString(),
    },
    {
        id: crypto.randomUUID(),
        filename: "b.pdf",
        filesize: 67_890,
        status: "failed",
        uploadedAt: new Date().toISOString(),
    },
];

afterEach(() => {
    vi.clearAllMocks();
});

describe("Testing listDocumentsTool", () => {
    it("should return a list of user documents if successful", async () => {
        vi.mocked(api.get).mockResolvedValue(mockUserDocuments);
        // @ts-ignore
        const result = await listDocumentsTool.handler(
            {}, // empty params
            {
                auth: {
                    userId: USER_ID,
                    accessToken: "test_token",
                },
            } as any, // extra
        );
        expect(api.get).toHaveBeenCalledWith(ApiRoutes.DOCUMENTS, {
            headers: {...getAuthHeader("test_token")},
        });
        expect(result).toEqual(createSuccessTextResponse(JSON.stringify(mockUserDocuments, null, 2)));
    });

    it("should catch an error thrown by the API and return a proper MCP response response when" +
        " API call" +
        " throws an error", async () => {
        const errMsg = "There was a server error while fetching your documents. " + "Please try again.";
        vi.mocked(api.get).mockRejectedValue(new Error(errMsg));

        // Even though the API call will throw an error, we can still verify that it was called with the correct parameters
        const result = await listDocumentsTool.handler({}, {
            auth: {
                userId: USER_ID,
                accessToken: "test_token",
            },
        } as any);

        expect(api.get).toHaveBeenCalledWith(ApiRoutes.DOCUMENTS, {
            headers: {...getAuthHeader("test_token")},
        });
        expect(result).toEqual(createErrorResponse(errMsg));
    });
});