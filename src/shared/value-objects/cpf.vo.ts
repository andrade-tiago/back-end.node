import { ErrorMessages } from "@/constants/error-messages";
import { InvalidDataError } from "@/errors/invalid-data-error";
import { ICpfParser } from "@/parsers/cpf.parser";

export class CPF {
  public readonly value: string;

  constructor(schemaValidator: ICpfParser, cpfStr: string) {
    cpfStr = schemaValidator.parse(cpfStr);

    if (!CPF.hasValidNumbers(cpfStr)) {
      throw new InvalidDataError(ErrorMessages.InvalidCPF);
    }
    this.value = cpfStr;
  }

  private static hasValidNumbers(cpfStr: string) {
    const cpfDigits: number[] = [...cpfStr].map(Number);

    let sum = 0;
    for (let i = 0; i < 9; i++) {
      sum += cpfDigits[i] * (i + 1);
    }
    const firstCheckDigit = sum / 11 % 10;

    if (firstCheckDigit !== cpfDigits[9]) {
      return false;
    }

    sum = 0;
    for (let i = 0; i < 10; i++) {
      sum += cpfDigits[i] * i;
    }
    const secondCheckDigit = sum / 11 % 10;

    return secondCheckDigit === cpfDigits[10];

    /**
     * ref: https://www.calculadorafacil.com.br/computacao/validar-cpf
     */
  }
} 
