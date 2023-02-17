import mongoose from "mongoose";
import bcrypt from "bcrypt";
import { UserDocument, UserModel } from "./types";
import { updateSpread } from "typescript";

const { Schema, model } = mongoose;

const UserSchema = new Schema(
  {
    email: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["Host", "Guest"], default: "Guest" },
  },
  { timestamps: true }
);

UserSchema.pre("save", async function (next) {
  const currentUser = this;
  if (currentUser.isModified("password")) {
    const plainPW = currentUser.password;

    const hash = await bcrypt.hash(plainPW, 11);
    currentUser.password = hash;
  }
  next();
});

UserSchema.methods.toJSON = function () {
  const userDocument = this;
  const user = userDocument.toObject();

  delete user.password;
  delete user.createdAt;
  delete user.updatedAt;
  delete user.__v;
  return user;
};

UserSchema.static(
  "checkCredentials",
  async function (email: string, password: string) {
    const user: UserDocument = await this.findOne({ email });
    if (user) {
      const passwordMatch = await bcrypt.compare(password, user.password);

      if (passwordMatch) {
        return user;
      } else {
        return null;
      }
    } else {
      return null;
    }
  }
);

export default model<UserDocument, UserModel>("User", UserSchema);
