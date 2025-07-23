import type { IProductTitleParser, ProductTitleParserInput } from '@/domain/parsers/IProductTitleParser';
import { ProductTitle, type ProductTitleValue } from './ProductTitle';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { faker } from '@faker-js/faker';
import { InvalidDataError } from '@/domain/errors';

describe('ProductTitle Value Object', () =>
{
  const validTestInput: ProductTitleParserInput = faker.commerce.productName();
  const invalidTestInput: ProductTitleParserInput = faker.animal.bear();
  const testParserOutput: ProductTitleValue = faker.commerce.productName();

  let parser: IProductTitleParser;

  beforeEach(() =>
  {
    parser = {
      parse: vi.fn<IProductTitleParser['parse']>((input) =>
      {
        if (input === validTestInput)
        {
          return testParserOutput;
        }
        throw new InvalidDataError('Invalid product title');
      }),
    };
  });

  it('should create a ProductTitle using the parser', () =>
  {
    const result = ProductTitle.create(validTestInput, { parser });

    expect(result).toBeInstanceOf(ProductTitle);
    expect(result.value).toBe(testParserOutput);
    expect(parser.parse).toHaveBeenCalledWith(validTestInput);
    expect(parser.parse).toHaveBeenCalledTimes(1);
  });

  it('should return a new instance if a ProductTitle is passed to create()', () =>
  {
    const original = ProductTitle.unsafeCreate(testParserOutput);
    const result = ProductTitle.create(original, { parser });

    expect(result).not.toBe(original);
    expect(result.value).toBe(original.value);
    expect(parser.parse).not.toHaveBeenCalled();
  });

  it('should throw if parser throws', () =>
  {
    expect(() => ProductTitle.create(invalidTestInput, { parser }))
      .toThrow(InvalidDataError);
  });

  it('should create using unsafeCreate without validation', () =>
  {
    const instance = ProductTitle.unsafeCreate(testParserOutput);

    expect(instance).toBeInstanceOf(ProductTitle);
    expect(instance.value).toBe(testParserOutput);
  });
});
