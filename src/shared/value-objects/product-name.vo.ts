import { IProductNameParser } from "@/parsers/product-name.parser";

export class ProductName {
  public readonly value: string;

  constructor(
    parser: IProductNameParser,
    nameStr: string,
  ) {
    this.value = parser.parse(nameStr);
  }
}
