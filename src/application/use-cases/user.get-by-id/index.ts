import { UserOutput } from "../user.output";
import { IUserMapper } from "@/application/mappers/user.mapper";
import { IUuidFactory } from "@/application/factories/value-objects/uuid.factory";
import { IUserRepository } from "@/domain/repositories/user.repository";
import { NotFoundError } from "@/application/errors/not-found.error";
import { ApplicationErrorMessages } from "@/application/errors/_error-messages";

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
      throw new NotFoundError(ApplicationErrorMessages.User.NotFoundById(userId.value));
    }

    return this._userMapper.toOutput(user);
  }
}
