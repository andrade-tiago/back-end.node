import type { CpfParserInput, ICpfParser } from "@/domain/parsers/ICpfParser";

export class CPF {
  private constructor(
    private readonly _value: CpfValue,
  ) {}

  public static create(input: CpfCreateValue, { parser }: CpfCreateDependencies): CPF {
    if (input instanceof CPF) {
      return new CPF(input.value);
    }

    const parsedValue = parser.parse(input);

    return new CPF(parsedValue);
  }
  public static unsafeCreate(validValue: CpfValue): CPF {
    return new CPF(validValue);
  }

  public get value() { return this._value; }
}

export type CpfValue = string

export type CpfCreateValue = CpfParserInput | CPF

export type CpfCreateDependencies = {
  parser: ICpfParser;
}
