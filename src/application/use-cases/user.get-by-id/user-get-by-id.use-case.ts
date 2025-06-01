import { UserOutput } from "../user.output";
import { IUserMapper } from "@/application/mappers/user.mapper";
import { NotFoundError } from "@/domain/errors/not-found-error";
import { ErrorMessages } from "@/domain/constants/error-messages";
import { IUserRepository } from "@/domain/repositories/user.repository";
import { IUuidFactory } from "@/application/factories/value-objects/uuid.factory";

export class UserGetByIdUseCase {
  constructor(
    private readonly _userRepository: IUserRepository,
    private readonly _uuidFactory: IUuidFactory,
    private readonly _userMapper: IUserMapper,
  ) {}

  public async execute(id: string): Promise<UserOutput> {
    const userId = this._uuidFactory.createFromString(id);

    const user = await this._userRepository.getById(userId);

    if (!user) {
      throw new NotFoundError(ErrorMessages.UserNotFound);
    }

    return this._userMapper.toOutput(user);
  }
}
