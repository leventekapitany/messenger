import { TokenPayload } from 'google-auth-library';

interface User extends TokenPayload {
  userId: TokenPayload['sub'];
}

export type Context = {
  user: User;
};
