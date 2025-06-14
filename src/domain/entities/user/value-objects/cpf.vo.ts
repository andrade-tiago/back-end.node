import { InvalidCpfError } from "@/domain/errors/invalid-cpf-error";

export class CPF {
  private static readonly cpfRegex = /^\d{11}$/;

  public readonly value: string;

  constructor(cpfStr: string) {
    cpfStr = cpfStr.trim();

    if (!CPF.cpfRegex.test(cpfStr) || !CPF.hasValidNumbers(cpfStr)) {
      throw new InvalidCpfError(cpfStr);
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
