import type { IUuidService } from "@/domain/services/IUuidService";
import { v4 as uuid } from "uuid";

export class V4UuidService implements IUuidService {
  public generate(): string {
    return uuid();
  }
}