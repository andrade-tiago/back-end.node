import { OrderOutput } from "../order.output";
import { OrderCreateInput } from "./order-create.input";
import { IOrderMapper } from "@/application/mappers/order.mapper";
import { IProductMapper } from "@/application/mappers/product.mapper";
import { IUuidFactory } from "@/application/factories/value-objects/uuid.factory";
import { NotFoundError } from "@/application/errors/not-found.error";
import { IOrderFactory } from "@/application/factories/entities/order.factory";
import { IOrderRepository } from "@/domain/repositories/order.repository";
import { IProductRepository } from "@/domain/repositories/product.repository";
import { InvalidDataError } from "@/domain/errors/invalida-data.error";
import { DomainErrorMessages } from "@/domain/errors/_error-messages";
import { ApplicationErrorMessages } from "@/application/errors/_error-messages";

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
        throw new InvalidDataError(DomainErrorMessages.Order.DuplicateItems);
      }
    }

    const products = await this._productRepository.getMany(productIds);
    if (products.length !== productIds.length) {
      throw new NotFoundError(ApplicationErrorMessages.Products.NotFoundMany);
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
