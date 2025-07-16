import type { IParser } from "./__IParser";
import type { MoneyValue } from "@/domain/value-objects/Money";

export type MoneyParserInput = number

export interface IMoneyParser extends IParser<MoneyParserInput, MoneyValue> {}
