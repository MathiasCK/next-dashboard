import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import { authConfig } from "./auth.config";
import { connectToDB } from "./utils/connect";
import { User } from "./utils/models";

const login = async (credentials: any) => {
  try {
    await connectToDB();

    const user = await User.findOne({ username: credentials.username });

    if (!user) {
      throw new Error("Invalid credentials");
    }

    const isPasswordCorrect = await bcrypt.compare(
      credentials.password,
      user.password,
    );

    if (!isPasswordCorrect) {
      throw new Error("Invalid credentials");
    }

    return user;
  } catch (error) {
    throw new Error(`Failed to log in - ${error}`);
  }
};

export const { signIn, signOut, auth } = NextAuth({
  ...authConfig,
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        try {
          const user = await login(credentials);
          return user;
        } catch (error) {
          return null;
        }
      },
    }),
  ],
});
