import { UserOutput } from "@/application/use-cases/user.output";
import { User } from "@/domain/entities/user";
import { IUserMapper } from "../user.mapper";
import { isUserActive } from "@/domain/entities/user/utils/is-user-active";
import { isUserDeleted } from "@/domain/entities/user/utils/is-user-deleted";

export class UserMapper implements IUserMapper {
  public toOutput(user: User): UserOutput {
    return {
      id: user.id.value,
      name: isUserActive(user) ? user.name.value : null,
      cpf: isUserActive(user) ? user.cpf.value : null,
      email: isUserActive(user) ? user.email.value : null,
      role: isUserActive(user) ? user.role.value : null,
      createdAt: user.createdAt.toDate().toISOString(),
      deletedAt: isUserDeleted(user) ? user.deletedAt.toDate().toISOString() : null,
    };
  }
}
