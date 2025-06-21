import { UserOutput } from "../user.output";
import { IUserMapper } from "@/application/mappers/user.mapper";
import { IUuidFactory } from "@/application/factories/value-objects/uuid.factory";
import { UserNotFoundError } from "@/application/errors/user-not-found.error";
import { IUserRepository } from "@/domain/repositories/user.repository";

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
      throw new UserNotFoundError(userId);
    }

    return this._userMapper.toOutput(user);
  }
}
