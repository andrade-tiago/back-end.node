import type { IHashedPasswordParser, HashedPasswordParserInput } from '@/domain/parsers/IHashedPasswordParser';
import { HashedPassword, type HashedPasswordValue } from './HashedPassword';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { InvalidDataError } from '@/domain/errors';
import { faker } from '@faker-js/faker';

describe('HashedPassword Value Object', () =>
{
  const validTestInput: HashedPasswordParserInput = faker.internet.password();
  const invalidTestInput: HashedPasswordParserInput = faker.string.numeric();
  const testParserOutput: HashedPasswordValue = faker.string.alphanumeric(60);

  let parser: IHashedPasswordParser;

  beforeEach(() =>
  {
    parser = {
      parse: vi.fn<IHashedPasswordParser['parse']>((value) =>
      {
        if (value === validTestInput)
        {
          return testParserOutput;
        }
        throw new InvalidDataError('Invalid password');
      }),
    };
  });

  it('should create HashedPassword using parser', () =>
  {
    const hashed = HashedPassword.create(validTestInput, { parser });

    expect(hashed).toBeInstanceOf(HashedPassword);
    expect(parser.parse).toHaveBeenCalledWith(validTestInput);
    expect(parser.parse).toHaveBeenCalledTimes(1);
    expect(hashed.value).toBe(testParserOutput);
  });

  it('should return new instance if HashedPassword is passed to create()', () =>
  {
    const original = HashedPassword.unsafeCreate(validTestInput);
    const result = HashedPassword.create(original, { parser });

    expect(result).not.toBe(original);
    expect(result.value).toBe(original.value);
    expect(parser.parse).not.toHaveBeenCalled();
  });

  it('should throw if parser throws', () =>
  {
    expect(() => HashedPassword.create(invalidTestInput, { parser }))
      .toThrow(InvalidDataError);
  });

  it('should create using unsafeCreate without validation', () =>
  {
    const hashed = HashedPassword.unsafeCreate(validTestInput);

    expect(hashed).toBeInstanceOf(HashedPassword);
    expect(hashed.value).toBe(validTestInput);
  });
});
