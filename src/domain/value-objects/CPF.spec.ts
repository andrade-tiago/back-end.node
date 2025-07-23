import type { CpfParserInput, ICpfParser } from "@/domain/parsers/ICpfParser";
import { CPF, type CpfValue } from "./CPF";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { faker } from '@faker-js/faker';
import { InvalidDataError } from "@/domain/errors";

describe('CPF Value Object', () =>
{
  const validTestInput: CpfParserInput = faker.string.numeric();
  const invalidTestInput: CpfParserInput = faker.string.alpha();
  const testParserOutput: CpfValue = faker.string.numeric();

  let parser: ICpfParser;

  beforeEach(() =>
  {
    parser =
    {
      parse: vi.fn<ICpfParser['parse']>((value) =>
      {
        if (value === validTestInput)
        {
          return testParserOutput;
        }
        throw new InvalidDataError('');
      }),
    };
  });

  it('should create CPF using parser', () =>
  {
    const cpf = CPF.create(validTestInput, { parser });
    expect(cpf).toBeInstanceOf(CPF);
    expect(parser.parse).toHaveBeenCalledWith(validTestInput);
    expect(parser.parse).toHaveBeenCalledTimes(1);
    expect(cpf.value).toBe(testParserOutput);
  });

  it('should return same instance if CPF is passed to create()', () =>
  {
    const original = CPF.unsafeCreate(validTestInput);
    const result = CPF.create(original, { parser });

    expect(result).not.toBe(original);
    expect(result.value).toBe(original.value);
    expect(parser.parse).not.toHaveBeenCalled();
  });

  it('should throw if parser throws', () =>
  {
    expect(() => CPF.create(invalidTestInput, { parser }))
      .toThrow(InvalidDataError);
  });

  it('should create using unsafeCreate without validation', () =>
  {
    const cpf = CPF.unsafeCreate(validTestInput);

    expect(cpf).toBeInstanceOf(CPF);
    expect(cpf.value).toBe(validTestInput);
  });
});
