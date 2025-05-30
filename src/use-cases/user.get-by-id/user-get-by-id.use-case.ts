import { IUserRepository } from "@/repositories/user.repository";
import { UserOutput } from "../user.output";
import { IUuidFactory } from "@/shared/value-objects/uuid.factory";
import { IUserMapper } from "@/mappers/user.mapper";
import { NotFoundError } from "@/errors/not-found-error";
import { ErrorMessages } from "@/constants/error-messages";

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
