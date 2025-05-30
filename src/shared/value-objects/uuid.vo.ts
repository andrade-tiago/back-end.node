import { IUuidService } from "@/services/uuid.service";
import { IUuidParser } from "@/parsers/uuid.parser";

export class Uuid {
  private constructor(
    public readonly value: string,
  ) {}

  public static generate(idGenerator: IUuidService): Uuid {
    const idString = idGenerator.generate();

    return new Uuid(idString);
  }

  public static from(idParser: IUuidParser, uuidStr: string): Uuid {
    const idString = idParser.parse(uuidStr);

    return new Uuid(idString);
  }
}
