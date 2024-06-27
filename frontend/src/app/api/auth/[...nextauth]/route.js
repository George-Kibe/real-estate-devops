import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials"
import connect from "@/lib/db";
import bcrypt from "bcryptjs";
import User from "@/models/User";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import client from "@/lib/authDb";

const handler = NextAuth({
  // adapter: MongoDBAdapter(client),
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      async authorize(credentials) {
        console.log("Credentials: ", credentials);
        //Check if the user exists.
        await connect();
        try {
          const user = await User.findOne({
            email: credentials.email,
          });
          if (user) {
            const isPasswordCorrect = await bcrypt.compare(
              credentials.password,
              user.password
            );
            console.log("Password Correct: ", isPasswordCorrect);
            if (isPasswordCorrect) {
              console.log("Returned user: ", user)
              return user;
            } else {
              throw new Error("Wrong Credentials!");
            }
          } else {
            throw new Error("User not found!");
          }
        } catch (err) {
          throw new Error(err);
        }
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          scope: "openid profile email",
        },
      }
    }),
  ],
  // callbacks: {
  //   async jwt(token, user) {
  //     if (user) {
  //       token.id = user.id;
  //       token.email = user.email;
  //       token.name = user.name;
  //     }
  //     return token;
  //   },
  //   async session(session, token) {
  //     session.user.id = token.id;
  //     session.user.email = token.email;
  //     session.user.name = token.name;
  //     return session;
  //   },
  // },
  
  pages: {
    error: "/login",
    success: "/login"
  },

});

export { handler as GET, handler as POST };
