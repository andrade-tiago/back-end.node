import type { ICpfParser } from "@/domain/parsers/ICpfParser";
import { cpf } from "cpf-cnpj-validator";
import { ErrorMessages, InvalidDataError } from "@/domain/errors";

export class CpfParser implements ICpfParser
{
  public parse(value: string): string
  {
    try
    {
      const unformattedValue = cpf.strip(value);
      
      if (cpf.isValid(unformattedValue))
      {
        return unformattedValue;
      }
    } catch {}

    throw new InvalidDataError(ErrorMessages.User.InvalidCpf(value));
  }
}