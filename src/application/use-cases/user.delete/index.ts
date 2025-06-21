import { IUuidFactory } from "@/application/factories/value-objects/uuid.factory";
import { IUserMapper } from "@/application/mappers/user.mapper";
import { Uuid } from "@/domain/shared/value-objects/uuid.vo";
import { UserOutput } from "../user.output";
import { DeletedUser } from "@/domain/entities/user";
import { IUserRepository } from "@/domain/repositories/user.repository";
import { NotFoundError } from "@/application/errors/not-found.error";
import { ApplicationErrorMessages } from "@/application/errors/_error-messages";
import { ConflictError } from "@/application/errors/conflict.error";

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
      throw new NotFoundError(ApplicationErrorMessages.User.NotFoundById(userId.value));
    }
    if (!user.isActive()) {
      throw new ConflictError(ApplicationErrorMessages.User.AlreadyDeleted(userId.value));
    }

    const deletedUser = DeletedUser.from(user);

    await this._userRepository.save(deletedUser);

    return this._userMapper.toOutput(deletedUser);
  }
}
