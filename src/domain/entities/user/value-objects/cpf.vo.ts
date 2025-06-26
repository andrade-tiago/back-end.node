import { DomainErrorMessages } from "@/domain/errors/_error-messages";
import { InvalidDataError } from "@/domain/errors/invalida-data.error";

export class CPF {
  private static readonly cpfRegex = /^\d{11}$/;

  public readonly value: string;

  constructor(cpfStr: string) {
    cpfStr = cpfStr.trim().replaceAll(/[^0-9]/g, '');

    if (!CPF.cpfRegex.test(cpfStr) || !CPF.hasValidNumbers(cpfStr)) {
      throw new InvalidDataError(DomainErrorMessages.User.InvalidCpf(cpfStr));
    }

    this.value = cpfStr;
  }

  // ref: https://www.calculadorafacil.com.br/computacao/validar-cpf
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
  }
} 
