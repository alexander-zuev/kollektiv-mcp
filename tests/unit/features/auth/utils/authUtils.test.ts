import {beforeEach, describe, it, vi, expect, afterEach, Mock} from "vitest";
import {getSupabase} from "@/web/middleware/supabase";

import {getCurrentUser, getUserSession} from "@/features/auth/utils/authUtils";
import {createMockContext} from "tests/mocks/";
import {testUser, testSession} from "@tests/mocks";
import {AuthApiError} from "@supabase/supabase-js";


describe('getCurrentUser tests', () => {
    beforeEach(() => {
        vi.resetAllMocks();
    })

    it('Should return user on success', async () => {
        const mockContext = createMockContext(); // ignored by global setup

        const supabase = getSupabase(mockContext);
        (supabase.auth.getUser as Mock).mockResolvedValue({
                data: {user: testUser},
                error: null
            }
        )
        const user = await getCurrentUser(mockContext);
        expect(user).toEqual(testUser);
    })
    it('Should return null on AuthApiError', async () => {
        const mockContext = createMockContext(); // ignored by global setup

        const supabase = getSupabase(mockContext);
        const authError = new AuthApiError("Session expired", 401, "session_expired");
        (supabase.auth.getUser as Mock).mockResolvedValue({
            data: null,
            error: authError
        })

        const response = await getCurrentUser(mockContext);
        expect(response).toEqual(null);
    })
    it('Should throw on other errors', async () => {
        const mockContext = createMockContext(); // ignored by global setup

        const supabase = getSupabase(mockContext);
        const nonAuthError = new Error("I must be thrown");
        (supabase.auth.getUser as Mock).mockResolvedValue({
            data: null,
            error: nonAuthError
        })

        await expect(() => getCurrentUser(mockContext)).rejects.toThrow(nonAuthError);
    })
})

describe('getUserSession tests', () => {
    beforeEach(() => {
        vi.resetAllMocks();
    })

    it('Should return session on success', async () => {
        const mockContext = createMockContext();
        const supabase = getSupabase(mockContext);
        (supabase.auth.getSession as Mock).mockResolvedValue({
            data: {session: testSession},
            error: null
        })
        const session = await getUserSession(createMockContext());
        expect(session).toEqual(testSession);
    })
    it('should throw on error returned by supabase', async () => {
        const mockContext = createMockContext();

        const supabase = getSupabase(mockContext);
        const authError = new AuthApiError("Session expired", 401, "session_expired");
        (supabase.auth.getSession as Mock).mockResolvedValue({
            data: null,
            error: authError
        })
        await expect(() => getUserSession(createMockContext())).rejects.toThrow(authError);
    })
    it('should return null if no session', async () => {
        const mockContext = createMockContext();

        const supabase = getSupabase(mockContext);
        (supabase.auth.getSession as Mock).mockResolvedValue({
            data: null,
            error: null
        })
        const session = await getUserSession(createMockContext());
        expect(session).toEqual(null);

    })
})