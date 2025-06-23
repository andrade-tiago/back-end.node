import { CPF } from "@/domain/entities/user/value-objects/cpf.vo";
import { ICpfFactory } from "../cpf.factory";

export class CpfFactory implements ICpfFactory {
  public create(cpfStr: string): CPF {
    return new CPF(cpfStr);
  }
}
