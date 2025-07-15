// Import handlers after mocks are set up

import {beforeEach, describe, expect, it, vi} from "vitest";
import {
    allRoutesHandler,
    authCallbackHandler,
    getAuthorizeHandler,
    loginHandler,
    postAuthorizeHandler,
    rootHandler,
} from "@/api/handlers";
import {logoutHandler} from "@/api/handlers/logout";
import {AppRoutes} from "@/api/routes";

// Mock Hono framework
const mockUse = vi.fn();
const mockGet = vi.fn();
const mockPost = vi.fn();

vi.mock("hono", () => ({
    Hono: vi.fn().mockImplementation(() => ({
        use: mockUse,
        get: mockGet,
        post: mockPost,
    })),
}));

// Mock the handlers
vi.mock("@/api/handlers", () => ({
    allRoutesHandler: vi.fn(),
    authCallbackHandler: vi.fn(),
    authConfirmHandler: vi.fn(),
    getAuthorizeHandler: vi.fn(),
    postAuthorizeHandler: vi.fn(),
    rootHandler: vi.fn(),
    loginHandler: vi.fn(),
    testHandler: vi.fn(),
}));

vi.mock("@/api/handlers/logout", () => ({
    logoutHandler: vi.fn(),
}));

/**
 * Tests for the api app route configuration
 *
 * These tests verify that all routes are correctly registered with their
 * respective handlers in the api application.
 */
describe("Web App Routes", () => {
    beforeEach(async () => {
        // Reset mocks and modules before each test
        vi.clearAllMocks();
        vi.resetModules();

        // Import the app to trigger route registrations
        await import("@/api/app");
    });

    // Test middleware registration
    it("registers middleware for all routes", () => {
        expect(mockUse).toHaveBeenCalledWith(AppRoutes.ALL, allRoutesHandler);
    });

    // Test GET routes
    describe("GET routes", () => {
        it("registers root route", () => {
            expect(mockGet).toHaveBeenCalledWith(AppRoutes.ROOT, rootHandler);
        });

        it("registers authorize route", () => {
            expect(mockGet).toHaveBeenCalledWith(AppRoutes.AUTHORIZE, getAuthorizeHandler);
        });

        it("registers auth callback route", () => {
            expect(mockGet).toHaveBeenCalledWith(AppRoutes.AUTH_CALLBACK, authCallbackHandler);
        });

        it("registers logout route", () => {
            expect(mockGet).toHaveBeenCalledWith(AppRoutes.LOGOUT, logoutHandler);
        });
    });

    // Test POST routes
    describe("POST routes", () => {
        it("registers authorize route", () => {
            expect(mockPost).toHaveBeenCalledWith(AppRoutes.AUTHORIZE, postAuthorizeHandler);
        });

        it("registers login route", () => {
            expect(mockPost).toHaveBeenCalledWith(AppRoutes.LOGIN, loginHandler);
        });
    });
});