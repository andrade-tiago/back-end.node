import { describe, expect, test, vi } from "vitest";
import { NonFutureDate } from "./non-future-date.vo";

describe('NonFutureDate VO', () => {
  describe('should be created successfully', () => {
    const now = new Date();

    test('from an ISO string', () => {
      const datetimeIsoString = now.toISOString();

      expect(new NonFutureDate(datetimeIsoString).toDate().getTime())
        .toBe(now.getTime());
    });
    
    test('from a number', () => {
      const datetimeInNumber = now.getTime();

      expect(new NonFutureDate(datetimeInNumber).toDate().getTime())
        .toBe(now.getTime());
    });

    test('from a Date instance', () => {
      expect(new NonFutureDate(now).toDate().getTime())
        .toBe(now.getTime());
    });

    test('from an undefined value', () => {
      vi.useFakeTimers();
      vi.setSystemTime(now);

      expect(new NonFutureDate(undefined).toDate().getTime())
        .toBe(now.getTime());

      vi.useRealTimers();
    });

    test('with now datetime', () => {
      vi.useFakeTimers();
      vi.setSystemTime(now);
      
      expect(new NonFutureDate().toDate().getTime())
        .toBe(now.getTime());

      vi.useRealTimers();
    });
  });

  describe('should throw an error', () => {
    test('if a future date value to be used', () => {
      expect(() => new NonFutureDate(8.64e15)).toThrow();
    });

    test('if an invalid date argument is used', () => {
      expect(() => new NonFutureDate(NaN)).toThrow();
      expect(() => new NonFutureDate('a')).toThrow();
      expect(() => new NonFutureDate(Number.MAX_SAFE_INTEGER)).toThrow();
    });
  });
});
