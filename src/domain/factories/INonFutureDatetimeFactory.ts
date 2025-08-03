import type {
  NonFutureDatetime,
  NonFutureDatetimeCreateValue,
} from "@/domain/value-objects/NonFutureDatetime";

export interface INonFutureDatetimeFactory {
  create(datetime: NonFutureDatetimeCreateValue): NonFutureDatetime;
}
