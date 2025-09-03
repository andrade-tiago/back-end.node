import type { IFullNameFactory } from "./IFullNameFactory";
import { FullName } from "@/domain/value-objects/FullName";

export const mockFullNameFactory = (): IFullNameFactory =>
{
  return {
    create: value => value instanceof FullName ? value : FullName.unsafeCreate(value),
  };
};
