import { ISpark } from 'app/shared/model/spark.model';
import { IUserProfile } from 'app/shared/model/user-profile.model';

export interface ILikes {
  id?: number;
  liked?: number | null;
  dislike?: number | null;
  spark?: ISpark | null;
  userProfile?: IUserProfile | null;
}

export const defaultValue: Readonly<ILikes> = {};
