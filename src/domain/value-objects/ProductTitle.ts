import type { IProductTitleParser, ProductTitleParserInput } from "@/domain/parsers/IProductTitleParser";

export class ProductTitle {
  private constructor(
    private readonly _value: ProductTitleValue,
  ) {}

  public static create(input: ProductTitleCreateValue, { parser }: ProductTitleCreateDependencies): ProductTitle {
    if (input instanceof ProductTitle) {
      return new ProductTitle(input.value);
    }
    const parsedValue = parser.parse(input);

    return new ProductTitle(parsedValue);
  }
  public static unsafeCreate(validValue: ProductTitleValue): ProductTitle {
    return new ProductTitle(validValue);
  }

  public get value() { return this._value; }
}

export type ProductTitleValue = string

export type ProductTitleCreateValue = ProductTitleParserInput | ProductTitle

export type ProductTitleCreateDependencies = {
  parser: IProductTitleParser;
}
