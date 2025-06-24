import { OrderOutput } from "../order.output";
import { OrderCreateInput } from "./order-create.input";
import { IOrderMapper } from "@/application/mappers/order.mapper";
import { IUuidFactory } from "@/application/factories/value-objects/uuid.factory";
import { NotFoundError } from "@/application/errors/not-found.error";
import { IOrderFactory } from "@/application/factories/entities/order.factory";
import { IOrderRepository } from "@/domain/repositories/order.repository";
import { IProductRepository } from "@/domain/repositories/product.repository";
import { InvalidDataError } from "@/domain/errors/invalida-data.error";
import { DomainErrorMessages } from "@/domain/errors/_error-messages";
import { ApplicationErrorMessages } from "@/application/errors/_error-messages";
import { IOrderItemFactory } from "@/application/factories/value-objects/order-item.factory";

export class OrderCreateUseCase {
  public constructor(
    private readonly _orderRepository: IOrderRepository,
    private readonly _orderMapper: IOrderMapper,
    private readonly _orderFactory: IOrderFactory,
    private readonly _orderItemFactory: IOrderItemFactory,
    private readonly _productRepository: IProductRepository,
    private readonly _uuidFactory: IUuidFactory,
  ) {}

  public async execute(data: OrderCreateInput): Promise<OrderOutput> {
    const productIds = data.items.map(i => this._uuidFactory.createFromString(i.productId));

    {
      const uniqueIdsCount = new Set(data.items).size;
      if (uniqueIdsCount !== productIds.length) {
        throw new InvalidDataError(DomainErrorMessages.Order.DuplicateItems);
      }
    }

    const products = await this._productRepository.getMany(productIds);
    if (products.length !== productIds.length) {
      throw new NotFoundError(ApplicationErrorMessages.Products.NotFoundMany);
    }

    const orderItems = products.map(prod => this._orderItemFactory.create({
      productId: prod.id,
      unitPrice: prod.price,
      quantity: data.items.find(item => item.productId === prod.id.value)!.quantity,
    }));

    const order = this._orderFactory.create({
      userId: data.userId,
      items: orderItems,
    });

    await this._orderRepository.create(order);

    return this._orderMapper.toOutput(order);
  }
}
