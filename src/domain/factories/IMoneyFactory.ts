import type { Money, MoneyCreateValue } from "@/domain/value-objects/Money";

export interface IMoneyFactory {
  create(value: MoneyCreateValue): Money;
}
