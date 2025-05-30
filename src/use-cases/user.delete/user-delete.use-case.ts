import { ErrorMessages } from "@/constants/error-messages";
import { NotFoundError } from "@/errors/not-found-error";
import { IUserMapper } from "@/mappers/user.mapper";
import { IUserRepository } from "@/repositories/user.repository";
import { IUuidFactory } from "@/shared/value-objects/uuid.factory";
import { UserOutput } from "../user.output";
import { Uuid } from "@/shared/value-objects/uuid.vo";
import { DeletedUser } from "@/entities/user";
import { ConflictError } from "@/errors/conflict-error";

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
      throw new NotFoundError(ErrorMessages.UserNotFound);
    }
    if (!user.isActive()) {
      throw new ConflictError(ErrorMessages.UserAlreadyDeleted);
    }

    const deletedUser = DeletedUser.from(user);

    await this._userRepository.save(deletedUser);

    return this._userMapper.toOutput(deletedUser);
  }
}
