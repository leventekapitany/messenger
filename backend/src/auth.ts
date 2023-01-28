import { IncomingMessage } from 'http';
import { OAuth2Client, TokenPayload } from 'google-auth-library';
import { GraphQLError } from 'graphql';

export default async function auth(req: IncomingMessage) {
  const authHeader = req.headers.authorization || '';
  const token = authHeader.replace('Bearer ', '');

  const oauthClient = new OAuth2Client(process.env.OAUTH_CLIENT_ID);
  let payload: TokenPayload;

  try {
    const loginTicket = await oauthClient.verifyIdToken({
      idToken: token,
    });
    payload = loginTicket.getPayload();
  } catch (error) {
    console.error(error);

    throw new GraphQLError('User is not authenticated', {
      extensions: {
        code: 'UNAUTHENTICATED',
        http: { status: 401 },
      },
    });
  }

  return payload;
}
