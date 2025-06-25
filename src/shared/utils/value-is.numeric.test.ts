import { describe, expect, it, test } from "vitest";
import { valueIsNumeric } from "./value-is-numeric";

describe('Function valueIsNumeric', () => {
  it('returns true correctly', () => {
    expect(valueIsNumeric(0)).toBe(true);
    expect(valueIsNumeric(1)).toBe(true);
    expect(valueIsNumeric(-1)).toBe(true);
    expect(valueIsNumeric(Number.MAX_SAFE_INTEGER)).toBe(true);
    expect(valueIsNumeric(Number.MIN_SAFE_INTEGER)).toBe(true);
    expect(valueIsNumeric(Number.MIN_SAFE_INTEGER)).toBe(true);
    expect(valueIsNumeric(1.5)).toBe(true);
  });

  describe('returns false', () => {
    test('if value is NaN', () => {
      expect(valueIsNumeric(NaN)).toBe(false);
    });

    test('if value is Infinity', () => {
      expect(valueIsNumeric(Infinity)).toBe(false);
    });
  });
});
