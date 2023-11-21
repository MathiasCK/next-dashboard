"use server";
import { revalidatePath } from "next/cache";
import { connectToDB } from "./connect";
import { Product, User } from "./models";
import { redirect } from "next/navigation";
import bcrypt from "bcrypt";

export const addUser = async (formData: FormData) => {
  const data = Object.fromEntries(formData);
  let page = 1;

  try {
    await connectToDB();
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(data.password.toString(), salt);

    const newUser = new User({
      ...data,
      password: hashedPassword,
      isAdmin: data.isAdmin === "true",
      isActive: data.isActive === "true",
    });

    await newUser.save();
    const count = await User.find().count();

    page = Math.ceil(
      count / parseInt(process.env.NEXT_PUBLIC_ITEMS_PER_PAGE as string),
    );
  } catch (error) {
    throw new Error(`Could not create user: ${(error as Error).message}`);
  }

  revalidatePath("/dashboard/users/");
  redirect(`/dashboard/users?page=${page}`);
};

export const addProduct = async (formData: FormData) => {
  const data = Object.fromEntries(formData.entries());
  let page = 1;

  try {
    await connectToDB();
    const newProduct = new Product(data);

    await newProduct.save();
    const count = await Product.find().count();
    page = Math.ceil(
      count / parseInt(process.env.NEXT_PUBLIC_ITEMS_PER_PAGE as string),
    );
  } catch (error) {
    throw new Error(`Could not create user: ${(error as Error).message}`);
  }

  revalidatePath("/products/users/");
  redirect(`/dashboard/products?page=${page}`);
};
