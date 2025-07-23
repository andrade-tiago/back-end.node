import { CPF, type CpfValue } from "./CPF";
import { cpf } from "cpf-cnpj-validator"

export const mockCPF = (): CPF =>
{
  const value: CpfValue = cpf.generate();

  return CPF.unsafeCreate(value);
};
