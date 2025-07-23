import type { IMoneyParser, MoneyParserInput } from '@/domain/parsers/IMoneyParser';
import { Money, type MoneyValue } from './Money';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { InvalidDataError } from '@/domain/errors';
import { faker } from '@faker-js/faker';

describe('Money Value Object', () =>
{
  const validTestInput: MoneyParserInput = faker.number.float({ min: 0.01 });
  const invalidTestInput: MoneyParserInput = faker.number.float({ max: 0 });
  const testParserOutput: MoneyValue = faker.number.float({ min: 0.01 });

  let parser: IMoneyParser;

  beforeEach(() =>
  {
    parser = {
      parse: vi.fn<IMoneyParser['parse']>((value) =>
      {
        if (value === validTestInput)
        {
          return testParserOutput;
        }
        throw new InvalidDataError('Invalid monetary value');
      }),
    };
  });

  it('should create Money using parser', () =>
  {
    const money = Money.create(validTestInput, { parser });

    expect(money).toBeInstanceOf(Money);
    expect(parser.parse).toHaveBeenCalledWith(validTestInput);
    expect(parser.parse).toHaveBeenCalledTimes(1);
    expect(money.value).toBe(testParserOutput);
  });

  it('should return new instance if Money is passed to create()', () =>
  {
    const original = Money.unsafeCreate(validTestInput);
    const result = Money.create(original, { parser });

    expect(result).not.toBe(original);
    expect(result.value).toBe(original.value);
    expect(parser.parse).not.toHaveBeenCalled();
  });

  it('should throw if parser throws', () =>
  {
    expect(() => Money.create(invalidTestInput, { parser }))
      .toThrow(InvalidDataError);
  });

  it('should create using unsafeCreate without validation', () =>
  {
    const money = Money.unsafeCreate(validTestInput);

    expect(money).toBeInstanceOf(Money);
    expect(money.value).toBe(validTestInput);
  });
});
