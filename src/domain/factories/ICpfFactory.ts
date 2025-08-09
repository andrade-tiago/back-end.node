import type { CPF, CpfCreateValue } from "@/domain/value-objects/CPF";

export interface ICpfFactory {
  create(value: CpfCreateValue): CPF;
}
