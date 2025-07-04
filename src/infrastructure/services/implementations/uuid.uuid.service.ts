import { IUuidService } from "@/application/services/uuid.service";
import { v4 as uuid } from "uuid";

export class UuidService implements IUuidService {
  public generate(): string {
    return uuid();
  }
}