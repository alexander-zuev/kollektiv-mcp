import { vi } from "vitest";

// Necessary since integration tests inadvertently import
vi.mock("ajv", () => ({
	Ajv: class {},
}));
