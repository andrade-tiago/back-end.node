import type { NonFutureDatetime } from "@/domain/value-objects/NonFutureDatetime";
import type { Uuid } from "@/domain/value-objects/Uuid";

export abstract class User {
  private readonly _id: UserProps['id'];
  private readonly _createdAt: UserProps['createdAt'];

  protected constructor(props: UserProps) {
    this._id = props.id;
    this._createdAt = props.createdAt;
  }

  public get id() { return this._id; }
  public get createdAt() { return this._createdAt; }
}

export interface UserProps {
  id: Uuid;
  createdAt: NonFutureDatetime;
}
