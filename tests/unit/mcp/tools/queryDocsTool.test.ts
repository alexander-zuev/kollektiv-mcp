import { describe, it, expect, vi } from 'vitest';
import { queryDocsTool } from '@/mcp/tools/queryDocsTool';
import { z } from 'zod';

describe('queryDocsTool', () => {
  it('should have the correct structure', () => {
    expect(queryDocsTool.name).toBe('queryDocs');
    expect(queryDocsTool.description).toBeDefined();
    expect(queryDocsTool.schema).toBeDefined();
    expect(queryDocsTool.handler).toBeInstanceOf(Function);
  });

  it('should validate input correctly', () => {
    const validInput = { query: 'test query' };
    const invalidInput = { query: '' };

    expect(() => queryDocsTool.schema.parse(validInput)).not.toThrow();
    expect(() => queryDocsTool.schema.parse(invalidInput)).toThrow();
  });

  it('should call the backend API and return results', async () => {
    // Mock fetch or API call
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ results: [{ id: '1', title: 'Test Doc' }] }),
    });

    const result = await queryDocsTool.handler({ query: 'test query' });
    
    expect(global.fetch).toHaveBeenCalledWith(
      expect.any(String),
      expect.objectContaining({
        method: 'POST',
        body: expect.any(String),
      })
    );
    
    expect(result).toEqual({
      content: expect.arrayContaining([
        expect.objectContaining({
          type: 'text',
          text: expect.any(String),
        }),
      ]),
    });
  });
});