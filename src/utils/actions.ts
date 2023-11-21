"use server";
import { revalidatePath } from "next/cache";
import { connectToDB } from "./connect";
import { Product, User } from "./models";
import { redirect } from "next/navigation";
import bcrypt from "bcrypt";
import { UserUpdateFields } from "@/types";

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
    throw new Error(`Failed to create user "${data.username}" - ${error}`);
  }

  revalidatePath("/dashboard/users/");
  redirect(`/dashboard/users?page=${page}`);
};

export const deleteUser = async (formData: FormData) => {
  const { id, username } = Object.fromEntries(formData.entries());

  try {
    await connectToDB();

    await User.findByIdAndDelete(id);
  } catch (error) {
    throw new Error(`Failed to delete user "${username}" - ${error}`);
  }

  revalidatePath("/dashboard/users/");
};

export const updateUser = async (formData: FormData) => {
  const { id, username, email, password, phone, address, isAdmin, isActive } =
    Object.fromEntries(formData.entries());

  try {
    await connectToDB();

    const updateFields: UserUpdateFields = {
      username: username,
      email: email,
      password: password,
      phone: phone,
      address: address,
      isAdmin: isAdmin === "true",
      isActive: isActive === "true",
    };

    Object.keys(updateFields).forEach(
      key =>
        // @ts-ignore
        (updateFields[key] === "" || undefined) && delete updateFields[key],
    );

    await User.findByIdAndUpdate(id, updateFields);
  } catch (error) {
    throw new Error(`Failed to update user "${id}" - ${error}`);
  }

  revalidatePath("/dashboard/users");
  redirect("/dashboard/users");
};

export const addProduct = async (formData: FormData) => {
  const data = Object.fromEntries(formData);
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
    throw new Error(`Failed to create product "${data.title}" - ${error}`);
  }

  revalidatePath("/dashboard/products/");
  redirect(`/dashboard/products?page=${page}`);
};

export const updateProduct = async (formData: FormData) => {
  const { id, title, desc, price, stock, color, size } =
    Object.fromEntries(formData);

  try {
    connectToDB();

    const updateFields = {
      title,
      desc,
      price,
      stock,
      color,
      size,
    };

    Object.keys(updateFields).forEach(
      key =>
        // @ts-ignore
        (updateFields[key] === "" || undefined) && delete updateFields[key],
    );

    await Product.findByIdAndUpdate(id, updateFields);
  } catch (error) {
    throw new Error(`Failed to update product "${id}" - ${error}`);
  }

  revalidatePath("/dashboard/products");
  redirect("/dashboard/products");
};

export const deleteProduct = async (formData: FormData) => {
  const { id, title } = Object.fromEntries(formData.entries());

  try {
    await connectToDB();

    await Product.findByIdAndDelete(id);
  } catch (error) {
    throw new Error(`Failed to delete product "${title}" - ${error}`);
  }

  revalidatePath("/dashboard/products/");
};
