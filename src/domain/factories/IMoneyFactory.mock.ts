import type { IMoneyFactory } from "./IMoneyFactory";
import { Money } from "@/domain/value-objects/Money";

export const mockMoneyFactory = (): IMoneyFactory =>
{
  return {
    create: value => value instanceof Money ? value : Money.unsafeCreate(value),
  };
};
