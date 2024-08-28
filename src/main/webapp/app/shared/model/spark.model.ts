import dayjs from 'dayjs';
import { IUserProfile } from 'app/shared/model/user-profile.model';
import { IMentions } from 'app/shared/model/mentions.model';
import { IHashtag } from 'app/shared/model/hashtag.model';

export interface ISpark {
  id?: number;
  sparkId?: number | null;
  userId?: number | null;
  date?: dayjs.Dayjs | null;
  body?: string | null;
  url?: string | null;
  userProfile?: IUserProfile | null;
  mentions?: IMentions[] | null;
  hashtags?: IHashtag[] | null;
}

export const defaultValue: Readonly<ISpark> = {};
