import type { INonNegativeIntFactory } from "./INonNegativeIntFactory";
import { NonNegativeInt } from "@/domain/value-objects/NonNegativeInt";

export const mockNonNegativeIntFactory = (): INonNegativeIntFactory =>
{
  return {
    create: value => value instanceof NonNegativeInt ? value : NonNegativeInt.unsafeCreate(value),
  };
};
