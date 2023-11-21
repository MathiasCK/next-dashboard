import { User } from "./models";
import { connectToDB } from "./connect";

export const fetchUsers = async (q: string) => {
  const regex = new RegExp(q, "i");
  try {
    await connectToDB();
    const users = await User.find({ username: { $regex: regex } });
    return users;
  } catch (error) {
    throw new Error(`Could not fetch users: ${(error as Error).message}`);
  }
};
