import type { CPF, CpfCreateValue } from "@/domain/value-objects/CPF";

export interface ICpfFactory {
  create(cpfStr: CpfCreateValue): CPF;
}
