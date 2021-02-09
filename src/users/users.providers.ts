import { Connection } from 'mongoose';
import { USER } from '../constants';
import { UserSchema } from './schemas/user.schema';

export const userProviders = [
  {
    provide: USER.name,
    useFactory: (connection: Connection) =>
      connection.model('User', UserSchema),
    inject: ['DATABASE_CONNECTION'],
  },
];
