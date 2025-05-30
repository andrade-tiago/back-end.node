import { UserCreateInput } from "./user-create.input";
import { UserOutput } from "../user.output";
import { ConflictError } from "@/errors/conflict-error";
import { IUserRepository } from "@/repositories/user.repository";
import { IEmailFactory } from "@/shared/value-objects/email.factory";
import { IUserMapper } from "@/mappers/user.mapper";
import { ErrorMessages } from "@/constants/error-messages";
import { IUserFactory } from "@/entities/user.factory";

export class UserCreateUseCase {
  constructor(
    private readonly _userRepository: IUserRepository,
    private readonly _userFactory: IUserFactory,
    private readonly _emailFactory: IEmailFactory,
    private readonly _userMapper: IUserMapper,
  ) {}

  public async execute(data: UserCreateInput): Promise<UserOutput> {
    const userEmail = this._emailFactory.create(data.email);

    const emailIsAlreadyInUse = await this._userRepository.containsUserWithEmail(userEmail);
    if (emailIsAlreadyInUse) {
      throw new ConflictError(ErrorMessages.EmailAlreadyUsed);
    }

    const user = await this._userFactory.createActive({
      name: data.name,
      email: userEmail,
      password: data.password,
      cpf: data.cpf,
    });

    await this._userRepository.save(user);

    return this._userMapper.toOutput(user);
  }
}
