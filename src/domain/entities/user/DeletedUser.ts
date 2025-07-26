import { ConflictError, ErrorMessages } from "@/domain/errors";
import type { ActiveUser } from "./ActiveUser";
import { User, type UserProps } from "./__User";
import { NonFutureDatetime } from "@/domain/value-objects/NonFutureDatetime";

export class DeletedUser extends User {
  private _deletedAt: DeletedUserProps['deletedAt'];

  private constructor(props: DeletedUserProps) {
    super({
      id: props.id,
      createdAt: props.createdAt,
    });
    this._deletedAt = props.deletedAt;
  }

  public get deletedAt() { return this._deletedAt; }

  public static create(props: DeletedUserProps) {
    if (props.createdAt.toDate() > props.deletedAt.toDate()) {
      throw new ConflictError(ErrorMessages.Date.DeletionEarlierThanCreation);
    }

    return new DeletedUser(props);
  }

  public static fromActiveUser(user: ActiveUser) {
    return new DeletedUser({
      id: user.id,
      createdAt: user.createdAt,
      deletedAt: NonFutureDatetime.now(),
    });
  }
}

export interface DeletedUserProps extends UserProps {
  deletedAt: NonFutureDatetime;
}
