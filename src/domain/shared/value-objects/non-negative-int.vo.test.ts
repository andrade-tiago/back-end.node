import { describe, expect, it, test } from "vitest";
import { NonNegativeInt } from "./non-negative-int.vo";

describe('NonNegativeInt VO', () => {
  it('should be created successfully', () => {
    expect(new NonNegativeInt(0).value).toBe(0);
    expect(new NonNegativeInt(1).value).toBe(1);
    expect(new NonNegativeInt(Number.MAX_SAFE_INTEGER).value).toBe(Number.MAX_SAFE_INTEGER);
  });

  describe('should throw an error', () => {
    test('if value to be negative', () => {
      expect(() => new NonNegativeInt(-1)).toThrow();
      expect(() => new NonNegativeInt(-2)).toThrow();
    });

    test('if value to be decimal', () => {
      expect(() => new NonNegativeInt(1.2)).toThrow();
      expect(() => new NonNegativeInt(0.00000000001)).toThrow();
    });

    test('if value to be non numeric', () => {
      expect(() => new NonNegativeInt(NaN)).toThrow();
      expect(() => new NonNegativeInt(Infinity)).toThrow();
    });
  });
});
