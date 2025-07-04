import { UserCreateInput } from "./user-create.input";
import { UserOutput } from "../user.output";
import { IUserFactory } from "@/application/factories/entities/user.factory";
import { IEmailFactory } from "@/application/factories/value-objects/email.factory";
import { IUserMapper } from "@/application/mappers/user.mapper";
import { IUserRepository } from "@/domain/repositories/user.repository";
import { ConflictError } from "@/application/errors/conflict.error";
import { ApplicationErrorMessages } from "@/application/errors/_error-messages";

export class UserCreateUseCase {
  constructor(
    private readonly _userRepository: IUserRepository,
    private readonly _userFactory: IUserFactory,
    private readonly _emailFactory: IEmailFactory,
    private readonly _userMapper: IUserMapper,
  ) {}

  public async execute(data: UserCreateInput): Promise<UserOutput> {
    const userEmail = this._emailFactory.create(data.email);

    {
      const emailIsAlreadyInUse = await this._userRepository.containsUserWithEmail(userEmail);

      if (emailIsAlreadyInUse) {
        throw new ConflictError(ApplicationErrorMessages.User.Conflict(userEmail.value));
      }
    }

    const user = await this._userFactory.createActive({
      name: data.name,
      email: userEmail,
      password: data.password,
      cpf: data.cpf,
      role: data.role,
    });

    await this._userRepository.save(user);

    return this._userMapper.toOutput(user);
  }
}
