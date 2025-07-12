import type { ActiveUserProps, DeletedUserProps, UserProps } from "@/domain/entities/User";
import type { UserRoleEnum } from "@/domain/enums/UserRoleEnum";

export type UserOutput = {
  id: UserProps['id']['value'],
  name: ActiveUserProps['name']['value'] | null,
  cpf: ActiveUserProps['cpf']['value'] | null,
  email: ActiveUserProps['email']['value'] | null,
  createdAt: UserProps['createdAt']['value'],
  deletedAt: DeletedUserProps['deletedAt']['value'] | null,
  role: UserRoleEnum | null,
}
