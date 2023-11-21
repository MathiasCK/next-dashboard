import { Document } from "mongoose";
import { type } from "os";

export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  img?: string;
  isAdmin: boolean;
  isActive: boolean;
  phone?: string;
  address?: string;
  createdAt: Date;
}

export interface IProduct extends Document {
  title: string;
  desc: string;
  price: number;
  stock: number;
  img?: string;
  color?: string;
  size?: string;
  createdAt: Date;
}

export type UserResponse = {
  users: IUser[];
  count: number;
};

export type ProductResponse = {
  products: IProduct[];
  count: number;
};

export type PageProps = {
  searchParams: {
    q?: string;
    page?: string;
  };
};
