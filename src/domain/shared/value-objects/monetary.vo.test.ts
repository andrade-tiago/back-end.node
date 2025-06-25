import { describe, expect, it } from 'vitest';
import { Monetary } from './monetary.vo';

describe('Monetary VO', () => {
  it('should be created successfully', () => {
    expect(new Monetary(0).value).toBe(0);
    expect(new Monetary(Number.MAX_VALUE).value).toBe(Number.MAX_VALUE);
  });

  it('should round values ​​with more than two decimal places', () => {
    expect(new Monetary(12.5).value).toBe(12.5);
    expect(new Monetary(100.12345).value).toBe(100.12);
  });

  describe('should throw an error', () => {
    it('if value is non-numeric', () => {
      expect(() => new Monetary(NaN)).toThrow();
      expect(() => new Monetary(Infinity)).toThrow();
    });

    it('if value is negative', () => {
      expect(() => new Monetary(-1)).toThrow();
    });
  });
});
