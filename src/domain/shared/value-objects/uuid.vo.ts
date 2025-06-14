import { InvalidUuidError } from "@/domain/errors/invalid-uuid-error";

export class Uuid {
  // ref: https://ihateregex.io/expr/uuid/
  private static regex = /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/;

  public readonly value: string;

  public constructor(uuidStr: string) {
    uuidStr = uuidStr.trim();

    if (Uuid.regex.test(uuidStr)) {
      throw new InvalidUuidError(uuidStr);
    }
    
    this.value = uuidStr;
  }
}
