import NextAuth from "next-auth";
import Providers from "next-auth/providers";

// export default NextAuth({
//   // 使用 Google 驗證
//   providers: [
//     Providers.Google({
//       clientId: process.env.GOOGLE_ID,
//       clientSecret: process.env.GOOGLE_SECRET,
//     }),
//   ],

//   // 如果需要將使用者的資料儲存在資料庫中，可以在 database 這個參數加上 url
//   database: process.env.DATABASE_URL,
// });

export default NextAuth({
  session: {
    jwt: true,
  },
  providers: [
    Providers.Credentials({
      async authorize(credentials) {
        const res = await fetch("http://localhost:8000/auth/login", {
          method: "POST",
          body: JSON.stringify(credentials),
          headers: {
            "Content-Type": "application/json",
          },
        });

        const user = await res.json();
        if (res.ok && user) {
          return user;
        }

        return null;
      },
    }),
  ],
  callbacks: {
    async session(session, token) {
      session.accessToken = token.accessToken;
      return session;
    },
    async jwt(token, user) {
      if (user) {
        token.accessToken = user.access_token;
      }
      return token;
    },
  },
});