import dayjs from 'dayjs';
import { ISpark } from 'app/shared/model/spark.model';

export interface IMentions {
  id?: number;
  mentionId?: number | null;
  mentionUsername?: string | null;
  date?: dayjs.Dayjs | null;
  sparks?: ISpark[] | null;
}

export const defaultValue: Readonly<IMentions> = {};
