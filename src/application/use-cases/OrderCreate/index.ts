import type { IOrderFactory } from "@/domain/factories/IOrderFactory";
import type { IOrderItemFactory } from "@/domain/factories/IOrderItemFactory";
import type { IUuidFactory } from "@/domain/factories/IUuidFactory";
import type { IOrderMapper } from "@/domain/mappers/IOrderMapper";
import type { IOrderRepository } from "@/domain/repositories/IOrderRepository";
import type { IProductRepository } from "@/domain/repositories/IProductRepository";
import type { OrderCreateInput } from "./input";
import type { OrderOutput } from "@/application/dtos/OrderOutput";
import { ErrorMessages as DomainErrorMessages, InvalidDataError } from "@/domain/errors";
import { ErrorMessages as ApplicationErrorMessages, NotFoundError } from "@/application/errors";

export class OrderCreateUseCase {
  private readonly _orderFactory: OrderCreateUseCaseDependencies['orderFactory'];
  private readonly _orderItemFactory: OrderCreateUseCaseDependencies['orderItemFactory'];
  private readonly _orderMapper: OrderCreateUseCaseDependencies['orderMapper'];
  private readonly _orderRepository: OrderCreateUseCaseDependencies['orderRepository'];
  private readonly _productRepository: OrderCreateUseCaseDependencies['productRepository'];
  private readonly _uuidFactory: OrderCreateUseCaseDependencies['uuidFactory'];
  
  public constructor(dependencies: OrderCreateUseCaseDependencies) {
    this._orderFactory = dependencies.orderFactory;
    this._orderItemFactory = dependencies.orderItemFactory;
    this._orderMapper = dependencies.orderMapper;
    this._orderRepository = dependencies.orderRepository;
    this._productRepository = dependencies.productRepository;
    this._uuidFactory = dependencies.uuidFactory;
  }

  public async execute(data: OrderCreateInput): Promise<OrderOutput> {
    const productIds = data.items.map(i => this._uuidFactory.create(i.productId));

    {
      const uniqueIdsSet = new Set(data.items.map(i => i.productId));
      if (uniqueIdsSet.size !== productIds.length) {
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

    await this._orderRepository.add(order);

    return this._orderMapper.toOutput(order);
  }
}

type OrderCreateUseCaseDependencies = {
  orderFactory: IOrderFactory;
  orderItemFactory: IOrderItemFactory;
  orderMapper: IOrderMapper;
  orderRepository: IOrderRepository;
  productRepository: IProductRepository;
  uuidFactory: IUuidFactory;
}
