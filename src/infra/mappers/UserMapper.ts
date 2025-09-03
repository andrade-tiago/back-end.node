import { UserOutput } from "@/application/dtos/UserOutput";
import { ActiveUser, DeletedUser, User } from "@/domain/entities/User";
import type { IUserMapper } from "@/domain/mappers/IUserMapper";
import { isUserActive } from "@/domain/utils/isUserActive";
import { isUserDeleted } from "@/domain/utils/isUserDeleted";

export class UserMapper implements IUserMapper
{
  public toOutput(user: User): UserOutput
  {
    const userIsActive = isUserActive(user);
    const userIsDeleted = isUserDeleted(user);

    return {
      id: user.id.value,
      createdAt: user.createdAt.value,

      name: userIsActive ? user.name.value : null,
      cpf: userIsActive ? user.cpf.value : null,
      email: userIsActive ? user.email.value : null,
      role: userIsActive ? user.role : null,

      deletedAt: userIsDeleted ? user.deletedAt.value : null,
    }  
  }
}
