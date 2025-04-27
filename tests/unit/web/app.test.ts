import { AppRoutes } from "@/web/routes";
import { beforeEach, describe, expect, it, vi } from "vitest";

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
vi.mock("@/web/handlers", () => ({
	allRoutesHandler: vi.fn(),
	authCallbackHandler: vi.fn(),
	authConfirmHandler: vi.fn(),
	getAuthorizeHandler: vi.fn(),
	postAuthorizeHandler: vi.fn(),
	rootHandler: vi.fn(),
	loginHandler: vi.fn(),
}));

vi.mock("@/web/handlers/logout", () => ({
	logoutHandler: vi.fn(),
}));

// Import handlers after mocks are set up
import {
	allRoutesHandler,
	authCallbackHandler,
	authConfirmHandler,
	getAuthorizeHandler,
	loginHandler,
	postAuthorizeHandler,
	rootHandler,
} from "@/web/handlers";
import { logoutHandler } from "@/web/handlers/logout";

/**
 * Tests for the web app route configuration
 *
 * These tests verify that all routes are correctly registered with their
 * respective handlers in the web application.
 */
describe("Web App Routes", () => {
	beforeEach(async () => {
		// Reset mocks and modules before each test
		vi.clearAllMocks();
		vi.resetModules();

		// Import the app to trigger route registrations
		await import("@/web/app");
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

		it("registers auth confirm route", () => {
			expect(mockPost).toHaveBeenCalledWith(AppRoutes.AUTH_CONFIRM, authConfirmHandler);
		});

		it("registers login route", () => {
			expect(mockPost).toHaveBeenCalledWith(AppRoutes.LOGIN, loginHandler);
		});
	});
});
