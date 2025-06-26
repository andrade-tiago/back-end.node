import { DomainErrorMessages } from "@/domain/errors/_error-messages";
import { InvalidDataError } from "@/domain/errors/invalida-data.error";

export class Uuid {
  private static regex = /^[A-F0-9]{8}-[A-F0-9]{4}-4[A-F0-9]{3}-[89AB][A-F0-9]{3}-[A-F0-9]{12}$/i;

  public readonly value: string;

  public constructor(uuidStr: string) {
    uuidStr = uuidStr.trim();

    if (!Uuid.regex.test(uuidStr)) {
      throw new InvalidDataError(DomainErrorMessages.InvalidUuid(uuidStr));
    }
    
    this.value = uuidStr;
  }
}
