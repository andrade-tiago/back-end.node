import { IUuidFactory } from "@/application/factories/value-objects/uuid.factory";
import { IUserMapper } from "@/application/mappers/user.mapper";
import { Uuid } from "@/domain/shared/value-objects/uuid.vo";
import { UserOutput } from "../user.output";
import { UserNotFoundError } from "@/application/errors/user-not-found.error";
import { UserDeletedError } from "@/application/errors/user-deleted.error";
import { DeletedUser } from "@/domain/entities/user";
import { IUserRepository } from "@/domain/repositories/user.repository";

export class UserDeleteUseCase {
  constructor(
    private readonly _uuidFactory: IUuidFactory,
    private readonly _userRepository: IUserRepository,
    private readonly _userMapper: IUserMapper,
  ) {}

  public async execute(id: Uuid['value']): Promise<UserOutput> {
    const userId = this._uuidFactory.createFromString(id);

    const user = await this._userRepository.getById(userId);

    if (!user) {
      throw new UserNotFoundError(userId);
    }
    if (!user.isActive()) {
      throw new UserDeletedError(userId);
    }

    const deletedUser = DeletedUser.from(user);

    await this._userRepository.save(deletedUser);

    return this._userMapper.toOutput(deletedUser);
  }
}
