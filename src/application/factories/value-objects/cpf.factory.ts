import { CPF } from "@/domain/entities/user/value-objects/cpf.vo";

export interface ICpfFactory {
  create(cpfStr: string): CPF;
}
