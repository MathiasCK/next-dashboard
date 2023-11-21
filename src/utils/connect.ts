import mongoose from "mongoose";

const connection = {};

export const connectToDB = async () => {
  try {
    // @ts-ignore
    if (connection.isCoonnected) return;
    const db = await mongoose.connect(process.env.MONGODB_URI as string);
    // @ts-ignore
    connection.isConnected = db.connections[0].readyState;
  } catch (error) {
    throw new Error(
      `Could not connect to database: ${(error as Error).message}`,
    );
  }
};
