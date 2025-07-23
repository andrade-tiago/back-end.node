import type { IPositiveIntParser, PositiveIntParserInput } from '@/domain/parsers/IPositiveIntParser';
import { PositiveInt, type PositiveIntValue } from './PositiveInt';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { faker } from '@faker-js/faker';
import { InvalidDataError } from '@/domain/errors';

describe('PositiveInt Value Object', () =>
{
  const validTestInput: PositiveIntParserInput = faker.number.int({ min: 1 });
  const invalidTestInput: PositiveIntParserInput = faker.number.int({ min: -100, max: 0 });
  const testParserOutput: PositiveIntValue = faker.number.int({ min: 1 });

  let parser: IPositiveIntParser;

  beforeEach(() =>
  {
    parser = {
      parse: vi.fn<IPositiveIntParser['parse']>((input) =>
      {
        if (input === validTestInput)
        {
          return testParserOutput;
        }
        throw new InvalidDataError('Invalid positive integer');
      }),
    };
  });

  it('should create a PositiveInt using the parser', () =>
  {
    const result = PositiveInt.create(validTestInput, { parser });

    expect(result).toBeInstanceOf(PositiveInt);
    expect(result.value).toBe(testParserOutput);
    expect(parser.parse).toHaveBeenCalledWith(validTestInput);
    expect(parser.parse).toHaveBeenCalledTimes(1);
  });

  it('should return a new instance if a PositiveInt is passed to create()', () =>
  {
    const original = PositiveInt.unsafeCreate(testParserOutput);
    const result = PositiveInt.create(original, { parser });

    expect(result).not.toBe(original);
    expect(result.value).toBe(original.value);
    expect(parser.parse).not.toHaveBeenCalled();
  });

  it('should throw if parser throws', () =>
  {
    expect(() => PositiveInt.create(invalidTestInput, { parser }))
      .toThrow(InvalidDataError);
  });

  it('should create using unsafeCreate without validation', () =>
  {
    const instance = PositiveInt.unsafeCreate(testParserOutput);

    expect(instance).toBeInstanceOf(PositiveInt);
    expect(instance.value).toBe(testParserOutput);
  });

  it('should have a static ONE instance representing 1', () =>
  {
    const one = PositiveInt.ONE;

    expect(one).toBeInstanceOf(PositiveInt);
    expect(one.value).toBe(1);
  });
});
