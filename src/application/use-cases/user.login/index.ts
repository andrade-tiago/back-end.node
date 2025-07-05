import { IEmailFactory } from "@/application/factories/value-objects/email.factory";
import { IAuthService } from "@/application/services/auth.service";
import { UserLoginInput } from "./user-login.input";
import { LoginError } from "@/application/errors/login-error.error";
import { TokenPayload } from "@/domain/shared/value-objects/token-payload.vo";
import { IHashService } from "@/application/services/hash.service";
import { IUserRepository } from "@/domain/repositories/user.repository";

export class UserLoginUseCase {
  constructor(
    private readonly _emailFactory: IEmailFactory,
    private readonly _userRepository: IUserRepository,
    private readonly _authService: IAuthService,
    private readonly _hashService: IHashService,
  ) {}

  public async execute(input: UserLoginInput): Promise<string> {
    const userEmail = this._emailFactory.create(input.email);
    
    const user = await this._userRepository.findByEmail(userEmail);
    if (!user) {
      throw new LoginError();
    }

    const passwordIsCorrect = await this._hashService.compare(input.password, user.password.value);
    if (!passwordIsCorrect) {
      throw new LoginError();
    }

    const payload = new TokenPayload({
      userId: user.id,
      userEmail: user.email,
    });
    return await this._authService.generateToken(payload);
  }
}
