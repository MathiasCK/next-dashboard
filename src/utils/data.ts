import { Product, User } from "./models";
import { connectToDB } from "./connect";
import { ProductResponse, UserResponse } from "@/types";

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

export const fetchProducts = async (
  q: string,
  page: string,
): Promise<ProductResponse> => {
  const regex = new RegExp(q, "i");
  const itemsPerPage = parseInt(
    process.env.NEXT_PUBLIC_ITEMS_PER_PAGE as string,
  );
  try {
    await connectToDB();
    const count = await Product.find({
      title: { $regex: regex },
    }).count();
    const products = await Product.find({ title: { $regex: regex } })
      .limit(itemsPerPage)
      .skip(itemsPerPage * (parseInt(page) - 1));
    return { products, count };
  } catch (error) {
    throw new Error(`Could not fetch products: ${(error as Error).message}`);
  }
};
