import type { ProductTitle } from "@/domain/value-objects/ProductTitle";
import type { IParser } from "./__IParser";

export interface IProductTitleParser extends IParser<ProductTitle['_value']> {}
