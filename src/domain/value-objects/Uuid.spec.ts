import type { IUuidParser, UuidParserInput } from '@/domain/parsers/IUuidParser';
import { Uuid, type UuidValue } from './Uuid';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { faker } from '@faker-js/faker';
import { InvalidDataError } from '@/domain/errors';

describe('Uuid Value Object', () =>
{
  const validTestInput: UuidParserInput = faker.string.uuid().toUpperCase();
  const invalidTestInput: UuidParserInput = faker.string.numeric();
  const testParserOutput: UuidValue = faker.string.uuid();

  let parser: IUuidParser;

  beforeEach(() =>
  {
    parser = {
      parse: vi.fn<IUuidParser['parse']>((input) =>
      {
        if (input === validTestInput)
        {
          return testParserOutput;
        }
        throw new InvalidDataError('Invalid UUID');
      }),
    };
  });

  it('should create a Uuid using the parser', () =>
  {
    const result = Uuid.create(validTestInput, { parser });

    expect(result).toBeInstanceOf(Uuid);
    expect(result.value).toBe(testParserOutput);
    expect(parser.parse).toHaveBeenCalledWith(validTestInput);
    expect(parser.parse).toHaveBeenCalledTimes(1);
  });

  it('should return a new instance if a Uuid is passed to create()', () =>
  {
    const original = Uuid.unsafeCreate(testParserOutput);
    const result = Uuid.create(original, { parser });

    expect(result).not.toBe(original);
    expect(result.value).toBe(original.value);
    expect(parser.parse).not.toHaveBeenCalled();
  });

  it('should throw if parser throws', () =>
  {
    expect(() => Uuid.create(invalidTestInput, { parser }))
      .toThrow(InvalidDataError);
  });

  it('should create using unsafeCreate without validation', () =>
  {
    const instance = Uuid.unsafeCreate(testParserOutput);

    expect(instance).toBeInstanceOf(Uuid);
    expect(instance.value).toBe(testParserOutput);
  });
});
