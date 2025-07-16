import type { IParser } from "./__IParser";
import type { ProductTitleValue } from "@/domain/value-objects/ProductTitle";

export type ProductTitleParserInput = string

export interface IProductTitleParser
  extends IParser<ProductTitleParserInput, ProductTitleValue> {}
