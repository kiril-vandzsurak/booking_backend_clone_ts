import { Model, Document } from "mongoose";

interface User {
  email: string;
  password: string;
  role: "Guest" | "Host";
}

export interface UserDocument extends User, Document {}

export interface UserModel extends Model<UserDocument> {
  checkCredentials(
    email: string,
    password: string
  ): Promise<UserDocument | null>;
}
