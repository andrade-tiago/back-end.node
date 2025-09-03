import type { IPositiveIntFactory } from "./IPositiveIntFactory";
import { PositiveInt } from "../value-objects/PositiveInt";

export const mockPositiveIntFactory = (): IPositiveIntFactory =>
{
  return {
    create: value => value instanceof PositiveInt ? value : PositiveInt.unsafeCreate(value),
  };
};
