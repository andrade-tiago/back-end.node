import { IProductDescriptionParser } from "@/parsers/product-description.parser";

export class ProductDescription {
  public readonly value: string;

  constructor(
    validator: IProductDescriptionParser,
    value: string,
  ) {
    this.value = validator.parse(value);
  }
}
