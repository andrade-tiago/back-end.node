import type { IUuidFactory } from "./IUuidFactory";
import { Uuid } from "@/domain/value-objects/Uuid";
import { mockUuid } from "@/domain/value-objects/Uuid.mock";

export const mockUuidFactory = (): IUuidFactory =>
{
  return {
    create: value => value instanceof Uuid ? value : Uuid.unsafeCreate(value),
    generate: () => mockUuid(),
  };
};
