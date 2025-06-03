import { IUuidParser } from "../parsers/uuid.parser";

export class Uuid {
  public readonly value: string;

  public constructor(
    value: string,
    validator: IUuidParser,
  ) {
    this.value = validator.parse(value);
  }
}
