import type { IParser } from "./__IParser";
import type { ProductTitle } from "@/domain/value-objects/ProductTitle";

export interface IProductTitleParser extends IParser<ProductTitle['_value']> {}
