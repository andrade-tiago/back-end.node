import type {
  NonFutureDatetime,
  NonFutureDatetimeCreateValue,
} from "@/domain/value-objects/NonFutureDatetime";

export interface INonFutureDateFactory {
  create(datetime: NonFutureDatetimeCreateValue): NonFutureDatetime;
}
