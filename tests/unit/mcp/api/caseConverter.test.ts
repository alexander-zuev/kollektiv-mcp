import { convertToCamelCase, convertToSnakeCase } from "@/mcp/api/utils/caseConverter";
import { describe, expect, it } from "vitest";

describe("caseConverter", () => {
	describe("convertToSnakeCase", () => {
		it("should convert object keys to snake_case", () => {
			const input = { firstName: "John", lastName: "Doe" };
			const expected = { first_name: "John", last_name: "Doe" };
			expect(convertToSnakeCase(input)).toEqual(expected);
		});

		it("should handle nested objects", () => {
			const input = {
				userInfo: {
					firstName: "John",
					lastName: "Doe",
					contactDetails: {
						phoneNumber: "123-456-7890",
					},
				},
			};
			const expected = {
				user_info: {
					first_name: "John",
					last_name: "Doe",
					contact_details: {
						phone_number: "123-456-7890",
					},
				},
			};
			expect(convertToSnakeCase(input)).toEqual(expected);
		});

		it("should handle arrays", () => {
			const input = [
				{ firstName: "John", lastName: "Doe" },
				{ firstName: "Jane", lastName: "Smith" },
			];
			const expected = [
				{ first_name: "John", last_name: "Doe" },
				{ first_name: "Jane", last_name: "Smith" },
			];
			expect(convertToSnakeCase(input)).toEqual(expected);
		});

		it("should handle arrays within objects", () => {
			const input = {
				userList: [
					{ firstName: "John", lastName: "Doe" },
					{ firstName: "Jane", lastName: "Smith" },
				],
			};
			const expected = {
				user_list: [
					{ first_name: "John", last_name: "Doe" },
					{ first_name: "Jane", last_name: "Smith" },
				],
			};
			expect(convertToSnakeCase(input)).toEqual(expected);
		});

		it("should return empty object for null input", () => {
			expect(convertToSnakeCase(null)).toEqual({});
		});

		it("should return empty object for undefined input", () => {
			expect(convertToSnakeCase(undefined)).toEqual({});
		});

		it("should return primitive values unchanged", () => {
			expect(convertToSnakeCase("test")).toBe("test");
			expect(convertToSnakeCase(123)).toBe(123);
			expect(convertToSnakeCase(true)).toBe(true);
		});

		it("should handle empty objects", () => {
			expect(convertToSnakeCase({})).toEqual({});
		});

		it("should handle empty arrays", () => {
			expect(convertToSnakeCase([])).toEqual([]);
		});
	});

	describe("convertToCamelCase", () => {
		it("should convert object keys to camelCase", () => {
			const input = { first_name: "John", last_name: "Doe" };
			const expected = { firstName: "John", lastName: "Doe" };
			expect(convertToCamelCase(input)).toEqual(expected);
		});

		it("should handle nested objects", () => {
			const input = {
				user_info: {
					first_name: "John",
					last_name: "Doe",
					contact_details: {
						phone_number: "123-456-7890",
					},
				},
			};
			const expected = {
				userInfo: {
					firstName: "John",
					lastName: "Doe",
					contactDetails: {
						phoneNumber: "123-456-7890",
					},
				},
			};
			expect(convertToCamelCase(input)).toEqual(expected);
		});

		it("should handle arrays", () => {
			const input = [
				{ first_name: "John", last_name: "Doe" },
				{ first_name: "Jane", last_name: "Smith" },
			];
			const expected = [
				{ firstName: "John", lastName: "Doe" },
				{ firstName: "Jane", lastName: "Smith" },
			];
			expect(convertToCamelCase(input)).toEqual(expected);
		});

		it("should handle arrays within objects", () => {
			const input = {
				user_list: [
					{ first_name: "John", last_name: "Doe" },
					{ first_name: "Jane", last_name: "Smith" },
				],
			};
			const expected = {
				userList: [
					{ firstName: "John", lastName: "Doe" },
					{ firstName: "Jane", lastName: "Smith" },
				],
			};
			expect(convertToCamelCase(input)).toEqual(expected);
		});

		it("should return empty object for null input", () => {
			expect(convertToCamelCase(null)).toEqual({});
		});

		it("should return empty object for undefined input", () => {
			expect(convertToCamelCase(undefined)).toEqual({});
		});

		it("should return primitive values unchanged", () => {
			expect(convertToCamelCase("test")).toBe("test");
			expect(convertToCamelCase(123)).toBe(123);
			expect(convertToCamelCase(true)).toBe(true);
		});

		it("should handle empty objects", () => {
			expect(convertToCamelCase({})).toEqual({});
		});

		it("should handle empty arrays", () => {
			expect(convertToCamelCase([])).toEqual([]);
		});
	});
});
