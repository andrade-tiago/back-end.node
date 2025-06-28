import { describe, expect, it, test, vi } from "vitest";
import { NonFutureDate } from "./non-future-date.vo";

describe('NonFutureDate VO', () => {
  describe('should be created successfully', () => {
    const now = new Date();

    test('from an ISO string', () => {
      expect(NonFutureDate.create(now).toDate().getTime())
        .toBe(now.getTime());
    });
    
    test('from a number', () => {
      expect(NonFutureDate.create(now.getTime()).toDate().getTime())
        .toBe(now.getTime());
    });

    test('from a Date instance', () => {
      expect(NonFutureDate.create(now).toDate().getTime())
        .toBe(now.getTime());
    });

    test('from an undefined value', () => {
      vi.useFakeTimers();
      vi.setSystemTime(now);

      expect(NonFutureDate.create(undefined).toDate().getTime())
        .toBe(now.getTime());

      vi.useRealTimers();
    });

    test('with now datetime', () => {
      vi.useFakeTimers();
      vi.setSystemTime(now);
      
      expect(NonFutureDate.now().toDate().getTime()).toBe(now.getTime());

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
