import type { IPasswordParser, PasswordParserInput } from '@/domain/parsers/IPasswordParser';
import { Password } from './Password';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { mockPassword } from './Password.mock';
import { faker } from '@faker-js/faker';
import { InvalidDataError } from '@/domain/errors';

describe('Password Value Object', () =>
{
  const validTestInput: PasswordParserInput = mockPassword().value;
  const invalidTestInput: PasswordParserInput = faker.animal.bear();
  const testParserOutput: PasswordParserInput = mockPassword().value;

  let parser: IPasswordParser;

  beforeEach(() =>
  {
    parser = {
      parse: vi.fn<IPasswordParser['parse']>((input) =>
      {
        if (input === validTestInput)
        {
          return testParserOutput;
        }
        throw new InvalidDataError('Invalid password');
      }),
    };
  });

  it('should create a Password using the parser', () =>
  {
    const result = Password.create(validTestInput, { parser });

    expect(result).toBeInstanceOf(Password);
    expect(result.value).toBe(testParserOutput);
    expect(parser.parse).toHaveBeenCalledWith(validTestInput);
    expect(parser.parse).toHaveBeenCalledTimes(1);
  });

  it('should return a new instance if a Password is passed to create()', () =>
  {
    const original = Password.unsafeCreate(testParserOutput);
    const result = Password.create(original, { parser });

    expect(result).not.toBe(original);
    expect(result.value).toBe(original.value);
    expect(parser.parse).not.toHaveBeenCalled();
  });

  it('should throw if parser throws', () =>
  {
    expect(() => Password.create(invalidTestInput, { parser }))
      .toThrow(InvalidDataError);
  });

  it('should create using unsafeCreate without validation', () =>
  {
    const instance = Password.unsafeCreate(testParserOutput);

    expect(instance).toBeInstanceOf(Password);
    expect(instance.value).toBe(testParserOutput);
  });
});
