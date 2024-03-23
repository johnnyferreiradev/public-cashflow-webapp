import NextAuth, { NextAuthOptions, TokenSet } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

async function refreshAccessToken(token: TokenSet) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API_URL}/v1/auth/refresh`,
      {
        method: 'POST',
        body: JSON.stringify({
          refresh: token.refreshToken,
        }),
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      },
    );
    const refreshedTokens = await response.json();

    if (!response.ok) {
      throw refreshedTokens;
    }

    const payload = atob(refreshedTokens.access.split('.')[1]);
    const tokenData = JSON.parse(payload);

    return {
      ...token,
      accessToken: refreshedTokens.access,
      accessTokenExpires: tokenData.exp * 1000,
      refreshToken: refreshedTokens.refresh,
      user: {
        // @ts-ignore
        ...token.user,
        refresh: refreshedTokens.refresh,
        access: refreshedTokens.access,
      },
    };
  } catch (error) {
    return {
      ...token,
      error: 'RefreshAccessTokenError',
    };
  }
}

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: 'Username', type: 'text', placeholder: 'jsmith' },
        password: { label: 'Senha', type: 'password' },
      },
      async authorize(credentials, req) {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_API_URL}/v1/auth/login/`,
          {
            method: 'POST',
            body: JSON.stringify(credentials),
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
          },
        );
        const user = await res.json();

        if (res.ok && user) {
          return user;
        } else {
          return null;
        }
      },
    }),
  ],
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async jwt({ token, user }: any) {
      if (user) {
        const payload = atob(user.access.split('.')[1]);
        const tokenData = JSON.parse(payload);

        return {
          accessToken: user.access,
          accessTokenExpires: tokenData.exp * 1000,
          refreshToken: user.refresh,
          user,
        };
      }

      if (Date.now() < token.accessTokenExpires) {
        return token;
      }

      return refreshAccessToken(token);
    },
    async session({ session, token }: any) {
      if (token) {
        session.accessToken = token.accessToken;
        session.accessTokenExpires = token.accessTokenExpires;
        session.error = token.error;
        session.user = token.user;
      }

      return session;
    },
  },
  pages: {
    signIn: '/login',
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
