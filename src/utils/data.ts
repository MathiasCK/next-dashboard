import { Product, User } from "./models";
import { connectToDB } from "./connect";
import { IProduct, IUser, ProductResponse, UserResponse } from "@/types";

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
    throw new Error(`Could not fetch users: ${error}`);
  }
};

export const fetchUser = async (id: string): Promise<IUser> => {
  try {
    await connectToDB();
    const user = await User.findById(id);
    return user;
  } catch (error) {
    throw new Error(`Could not fetch user with id "${id}": ${error}`);
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
    throw new Error(`Could not fetch products: ${error}`);
  }
};

export const fetchProduct = async (id: string): Promise<IProduct> => {
  try {
    await connectToDB();
    const product = await Product.findById(id);
    return product;
  } catch (error) {
    throw new Error(`Could not fetch user with id "${id}": ${error}`);
  }
};
