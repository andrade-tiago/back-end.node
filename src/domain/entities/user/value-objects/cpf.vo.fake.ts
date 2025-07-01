import { cpf } from "cpf-cnpj-validator";
import { CPF } from "./cpf.vo";

export const makeFakeCPF = (): CPF => {
  return new CPF(cpf.generate());
};
