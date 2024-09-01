import dayjs from 'dayjs';

export interface IUserProfile {
  id?: number;
  userId?: number | null;
  userName?: string | null;
  password?: string | null;
  firstName?: string | null;
  lastName?: string | null;
  createdDate?: dayjs.Dayjs | null;
}

export const defaultValue: Readonly<IUserProfile> = {};
