import type { IHashedPasswordParser, HashedPasswordParserInput } from '@/domain/parsers/IHashedPasswordParser';
import type { Password } from './Password';
import type { IPasswordHasherService } from '@/domain/services/IPasswordHasherService';
import { HashedPassword, type HashedPasswordValue } from './HashedPassword';
import { afterAll, afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { mockPassword } from './Password.mock';
import { faker } from '@faker-js/faker';
import { InvalidDataError } from '@/domain/errors';

describe('HashedPassword Value Object', () =>
{
  const validTestInput: HashedPasswordParserInput = faker.internet.password();
  const invalidTestInput: HashedPasswordParserInput = faker.string.numeric();
  const testParserOutput: HashedPasswordValue = faker.string.alphanumeric(60);
  
  const pass: Password = mockPassword();  

  let parser: IHashedPasswordParser;
  let hasher: IPasswordHasherService;

  beforeEach(() =>
  {
    parser =
    {
      parse: vi.fn<IHashedPasswordParser['parse']>((value) =>
      {
        if (value === validTestInput)
        {
          return testParserOutput;
        }
        throw new InvalidDataError('Invalid password');
      }),
    };
    hasher =
    {
      hash: vi.fn<IPasswordHasherService['hash']>(async (value) => testParserOutput),
      compare: async (pass, hashed) => true
    }
  });
  afterEach(() =>
  {
    vi.clearAllMocks();
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

  it('should create a HashedPassword through Password', async () =>
  {
    const result = await HashedPassword.fromPassword(pass, { hasher });

    expect(result.value).toBe(testParserOutput);
    expect(hasher.hash).toHaveBeenCalledTimes(1);
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
