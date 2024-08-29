import dayjs from 'dayjs';
import { ISpark } from 'app/shared/model/spark.model';

export interface IHashtag {
  id?: number;
  hashtagId?: number | null;
  hashtagName?: string | null;
  dataCreated?: dayjs.Dayjs | null;
  sparks?: ISpark[] | null;
}

export const defaultValue: Readonly<IHashtag> = {};
