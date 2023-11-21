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

export type SearchParamsProps = {
  searchParams: {
    q?: string;
    page?: string;
  };
};

export type ParamsIdProps = {
  params: {
    id: string;
  };
};

export type UserUpdateFields = {
  username: FormDataEntryValue;
  email: FormDataEntryValue;
  password: FormDataEntryValue;
  phone: FormDataEntryValue;
  address: FormDataEntryValue;
  isAdmin: boolean;
  isActive: boolean;
};
