import {describe, expect, it, vi} from 'vitest';
// Then import it normally to get the real implementation
import {getAuthHeader} from '@/features/auth/utils';

// First unmock the module
vi.unmock('@/features/auth/utils');

describe('No frills getAuthHeader unit tests', () => {
    it('returns { Authorization } when JWT present', () => {
        const token = 'test_token'
        expect(getAuthHeader(token)).toEqual({Authorization: 'Bearer test_token'});
    });

    it('returns { } when JWT not present', () => {
        expect(getAuthHeader()).toEqual({});
    });
});