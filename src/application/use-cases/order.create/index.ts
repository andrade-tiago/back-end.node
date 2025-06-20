import { IOrderRepository } from "@/domain/entities/order/order.repository";
import { OrderOutput } from "../order.output";
import { OrderCreateInput } from "./order-create.input";
import { IOrderMapper } from "@/application/mappers/order.mapper";
import { IProductMapper } from "@/application/mappers/product.mapper";
import { IProductRepository } from "@/domain/entities/product/product.repository";
import { IUuidFactory } from "@/application/factories/value-objects/uuid.factory";
import { DuplicateItemsError } from "@/application/errors/duplicate-items.error";
import { NotFoundError } from "@/application/errors/not-found.error";
import { IOrderFactory } from "@/application/factories/entities/order.factory";

export class OrderCreateUseCase {
  public constructor(
    private readonly _orderRepository: IOrderRepository,
    private readonly _orderMapper: IOrderMapper,
    private readonly _orderFactory: IOrderFactory,
    private readonly _productRepository: IProductRepository,
    private readonly _productMapper: IProductMapper,
    private readonly _uuidFactory: IUuidFactory,
  ) {}

  public async execute(data: OrderCreateInput): Promise<OrderOutput> {
    const productIds = data.itemIds.map(this._uuidFactory.createFromString);

    {
      const uniqueIdsCount = new Set(data.itemIds).size;
      if (uniqueIdsCount !== productIds.length) {
        throw new DuplicateItemsError('An order cannot contain duplicate products');
      }
    }

    const products = await this._productRepository.getMany(productIds);
    if (products.length !== productIds.length) {
      throw new NotFoundError('One or more products not found');
    }

    const orderItems = products.map(this._productMapper.toOrderItem);

    const order = this._orderFactory.create({
      userId: data.userId,
      items: orderItems,
    });

    await this._orderRepository.create(order);

    return this._orderMapper.toOutput(order);
  }
}
