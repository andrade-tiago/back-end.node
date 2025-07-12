import type { IProductTitleParser } from "@/domain/parsers/IProductTitleParser";

export class ProductTitle {
  private constructor(
    private readonly _value: ProductTitleValue,
  ) {}

  public static create(value: ProductTitleCreateValue, { parser }: ProductTitleCreateDependencies): ProductTitle {
    if (value instanceof ProductTitle) {
      return new ProductTitle(value.value);
    }
    const parsedValue = parser.parse(value);

    return new ProductTitle(parsedValue);
  }
  public static unsafeCreate(value: ProductTitleValue): ProductTitle {
    return new ProductTitle(value);
  }

  public get value() { return this._value; }
}

export type ProductTitleValue = string

export type ProductTitleCreateValue = string | ProductTitle

export type ProductTitleCreateDependencies = {
  parser: IProductTitleParser;
}
