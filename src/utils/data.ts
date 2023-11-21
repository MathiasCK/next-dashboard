import { User } from "./models";
import { connectToDB } from "./connect";
import { UserResponse } from "@/types";

export const fetchUsers = async (
  q: string,
  page: string,
): Promise<UserResponse> => {
  const regex = new RegExp(q, "i");
  const itemsPerPage = parseInt(
    process.env.NEXT_PUBLIC_ITEMS_PER_PAGE as string,
  );

  try {
    await connectToDB();
    const count = await User.find({
      username: { $regex: regex },
    }).count();
    const users = await User.find({ username: { $regex: regex } })
      .limit(itemsPerPage)
      .skip(itemsPerPage * (parseInt(page) - 1));
    return { users, count };
  } catch (error) {
    throw new Error(`Could not fetch users: ${(error as Error).message}`);
  }
};
