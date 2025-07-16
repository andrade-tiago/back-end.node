import type { IParser } from "./__IParser";
import type { ProductTitle, ProductTitleCreateValue } from "@/domain/value-objects/ProductTitle";

export interface IProductTitleParser extends IParser<ProductTitleCreateValue, ProductTitle['_value']> {}
