import { describe, expect, it, test } from "vitest";
import { PositiveInt } from "./positive-int.vo";

describe('PositiveInt VO', () => {
  it('should be created successfully', () => {
    expect(new PositiveInt(1).value).toBe(1);
    expect(new PositiveInt(Number.MAX_SAFE_INTEGER).value).toBe(Number.MAX_SAFE_INTEGER);
  });

  describe('should throw an error', () => {
    test('if value to be negative', () => {
      expect(() => new PositiveInt(-1)).toThrow();
      expect(() => new PositiveInt(-2)).toThrow();
    });

    test('if value to be zero', () => {
      expect(() => new PositiveInt(0)).toThrow();
    });

    test('if value to be decimal', () => {
      expect(() => new PositiveInt(1.2)).toThrow();
      expect(() => new PositiveInt(0.00000000001)).toThrow();
    });

    test('if value to be non numeric', () => {
      expect(() => new PositiveInt(NaN)).toThrow();
      expect(() => new PositiveInt(Infinity)).toThrow();
    });
  });
});
