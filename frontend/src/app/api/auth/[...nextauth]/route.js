import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials"
import connect from "@/lib/db";
import bcrypt from "bcryptjs";
import User from "@/models/User";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import clientPromise from "@/lib/authDb";

const handler = NextAuth({
  adapter: MongoDBAdapter(clientPromise),
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      async authorize(credentials) {
        //Check if the user exists.
        await connect();
        try {
          const user = await User.findOne({
            email: credentials.email,
          });
          console.log("user: ", user)
          if (user) {
            const isPasswordCorrect = await bcrypt.compare(
              credentials.password,
              user.password
            );

            if (isPasswordCorrect) {
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
  pages: {
    error: "/login",
  },

});

export { handler as GET, handler as POST };
