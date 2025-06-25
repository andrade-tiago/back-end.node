import { describe, expect, test, vi } from "vitest";
import { NonFutureDate } from "./non-future-date.vo";

describe('NonFutureDate VO', () => {
  describe('should be created successfully', () => {
    test('from an ISO string', () => {
      expect(NonFutureDate.create('2025-06-25T19:59:08.740Z').value).toBe(1750881548740);
    });
    
    test('from a number', () => {
      expect(NonFutureDate.create(123456).value).toBe(123456);
    });

    test('from a Date instance', () => {
      const dateInstance = new Date();

      expect(NonFutureDate.create(dateInstance).value).toBe(dateInstance.getTime());
    });

    test('from an undefined value', () => {
      expect(() => NonFutureDate.create(undefined).value).toBeDefined();
    });

    test('with now datetime', () => {
      vi.useFakeTimers();
      vi.setSystemTime(new Date()); // feeze time

      expect(NonFutureDate.now().value).toBe(Date.now());
      expect(NonFutureDate.create().value).toBe(Date.now());

      vi.useRealTimers();
    });
  });

  describe('should throw an error', () => {
    test('if a future date value to be used', () => {
      expect(() => NonFutureDate.create(8.64e15)).toThrow();
    });

    test('if an invalid date argument is used', () => {
      expect(() => NonFutureDate.create(NaN)).toThrow();
      expect(() => NonFutureDate.create('a')).toThrow();
      expect(() => NonFutureDate.create(Number.MAX_SAFE_INTEGER)).toThrow();
    });
  });
});
