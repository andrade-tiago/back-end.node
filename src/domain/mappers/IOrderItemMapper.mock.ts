import type { IOrderItemMapper } from "./IOrderItemMapper";

export const mockOrderItemMapper = (): IOrderItemMapper =>
{
  return {
    toOutput: item => (
    {
      productId: item.productId.value,
      unitPrice: item.unitPrice.value,
      quantity: item.quantity.value,
    }),
  };
};
