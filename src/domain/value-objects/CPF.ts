import type { ICpfParser } from "@/domain/parsers/ICpfParser";

export class CPF {
  private constructor(
    private readonly _value: CpfValue,
  ) {}

  public static create(value: CpfCreateValue, { parser }: CpfCreateDependencies): CPF {
    if (value instanceof CPF) {
      return new CPF(value.value);
    }

    const parsedValue = parser.parse(value);

    return new CPF(parsedValue);
  }
  public static unsafeCreate(value: CpfValue): CPF {
    return new CPF(value);
  }

  public get value() { return this._value; }
}

export type CpfValue = string

export type CpfCreateValue = string | CPF

export type CpfCreateDependencies = {
  parser: ICpfParser;
}
