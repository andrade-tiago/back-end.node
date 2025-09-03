import type { ICpfFactory } from "./ICpfFactory";
import { CPF } from "@/domain/value-objects/CPF";

export const mockCpfFactory = (): ICpfFactory =>
{
  return {
    create: value => value instanceof CPF ? value : CPF.unsafeCreate(value),
  };
};
