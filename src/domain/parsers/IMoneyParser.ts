import type { IParser } from "./__IParser";
import type { MoneyValue } from "@/domain/value-objects/Money";

export interface IMoneyParser extends IParser<MoneyValue> {}
