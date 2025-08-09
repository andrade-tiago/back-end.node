import type { ICpfFactory } from "@/domain/factories/ICpfFactory";
import { ICpfParser } from "@/domain/parsers/ICpfParser";
import { CpfCreateValue, CPF } from "@/domain/value-objects/CPF";

type FactoryDependencies = {
  cpfParser: ICpfParser;
}

export class CpfFactory implements ICpfFactory
{
  private readonly cpfParser: ICpfParser;

  public constructor(dependencies: FactoryDependencies)
  {
    this.cpfParser = dependencies.cpfParser;
  }

  public create(value: CpfCreateValue): CPF
  {
    return CPF.create(value, { parser: this.cpfParser });
  }
}
