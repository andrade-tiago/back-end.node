import type { IParser } from "./__IParser";
import type { MoneyCreateValue, MoneyValue } from "@/domain/value-objects/Money";

export interface IMoneyParser extends IParser<MoneyCreateValue, MoneyValue> {}
