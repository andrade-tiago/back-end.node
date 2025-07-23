import type { IFullNameParser, FullNameInput } from '@/domain/parsers/IFullNameParser';
import { FullName, type FullNameValue } from './FullName';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { InvalidDataError } from '@/domain/errors';
import { faker } from '@faker-js/faker';

describe('FullName Value Object', () =>
{
  const validTestInput: FullNameInput = faker.person.fullName();
  const invalidTestInput: FullNameInput = faker.string.numeric();
  const testParserOutput: FullNameValue = faker.person.fullName();

  let parser: IFullNameParser;

  beforeEach(() =>
  {
    parser = {
      parse: vi.fn<IFullNameParser['parse']>((value) =>
      {
        if (value === validTestInput)
        {
          return testParserOutput;
        }
        throw new InvalidDataError('Invalid full name');
      }),
    };
  });

  it('should create FullName using parser', () =>
  {
    const fullName = FullName.create(validTestInput, { parser });

    expect(fullName).toBeInstanceOf(FullName);
    expect(parser.parse).toHaveBeenCalledWith(validTestInput);
    expect(parser.parse).toHaveBeenCalledTimes(1);
    expect(fullName.value).toBe(testParserOutput);
  });

  it('should return new instance if FullName is passed to create()', () =>
  {
    const original = FullName.unsafeCreate(validTestInput);
    const result = FullName.create(original, { parser });

    expect(result).not.toBe(original);
    expect(result.value).toBe(original.value);
    expect(parser.parse).not.toHaveBeenCalled();
  });

  it('should throw if parser throws', () =>
  {
    expect(() => FullName.create(invalidTestInput, { parser }))
      .toThrow(InvalidDataError);
  });

  it('should create using unsafeCreate without validation', () =>
  {
    const fullName = FullName.unsafeCreate(validTestInput);

    expect(fullName).toBeInstanceOf(FullName);
    expect(fullName.value).toBe(validTestInput);
  });
});
