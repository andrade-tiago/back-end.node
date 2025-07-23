import type { INonNegativeIntParser, NonNegativeIntParserInput } from '@/domain/parsers/INonNegativeIntParser';
import { NonNegativeInt, type NonNegativeIntValue } from './NonNegativeInt';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { faker } from '@faker-js/faker';
import { InvalidDataError } from '@/domain/errors';

describe('NonNegativeInt Value Object', () =>
{
  const validTestInput: NonNegativeIntParserInput = faker.number.int({ min: 0 });
  const invalidTestInput: NonNegativeIntParserInput = faker.number.int({ min: -100, max: -1 });
  const testParserOutput: NonNegativeIntValue = faker.number.int({ min: 0 });

  let parser: INonNegativeIntParser;

  beforeEach(() =>
  {
    parser = {
      parse: vi.fn<INonNegativeIntParser['parse']>((input) =>
      {
        if (input === validTestInput)
        {
          return testParserOutput;
        }
        throw new InvalidDataError('Invalid non-negative integer');
      }),
    };
  });

  it('should create a NonNegativeInt using the parser', () =>
  {
    const result = NonNegativeInt.create(validTestInput, { parser });

    expect(result).toBeInstanceOf(NonNegativeInt);
    expect(result.value).toBe(testParserOutput);
    expect(parser.parse).toHaveBeenCalledWith(validTestInput);
    expect(parser.parse).toHaveBeenCalledTimes(1);
  });

  it('should return a new instance if a NonNegativeInt is passed to create()', () =>
  {
    const original = NonNegativeInt.unsafeCreate(testParserOutput);
    const result = NonNegativeInt.create(original, { parser });

    expect(result).not.toBe(original);
    expect(result.value).toBe(original.value);
    expect(parser.parse).not.toHaveBeenCalled();
  });

  it('should throw if parser throws', () =>
  {
    expect(() => NonNegativeInt.create(invalidTestInput, { parser }))
      .toThrow(InvalidDataError);
  });

  it('should create using unsafeCreate without validation', () =>
  {
    const instance = NonNegativeInt.unsafeCreate(testParserOutput);

    expect(instance).toBeInstanceOf(NonNegativeInt);
    expect(instance.value).toBe(testParserOutput);
  });

  it('should have a static ZERO instance representing 0', () =>
  {
    const zero = NonNegativeInt.ZERO;

    expect(zero).toBeInstanceOf(NonNegativeInt);
    expect(zero.value).toBe(0);
  });
});
