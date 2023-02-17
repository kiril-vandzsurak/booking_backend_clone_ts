import supertest from "supertest";
import dotenv from "dotenv";
import mongoose from "mongoose";
import { server } from "../server";
import UsersModel from "../api/user/model";

const client = supertest(server);

const validUser = {
  email: "john@gmail.com",
  password: "1234",
  role: "Guest",
};

const notValidUser = {
  firstName: "John",
  lastName: "Rambo",
  email: "john@gmail.com",
};

beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_KEY_TEST!);
  const product = new UsersModel(validUser);
  await product.save();
});
// beforeAll is a Jest hook ran before all the tests, usually it is used to connect to the db and to do some initial setup (like inserting some mock data in the db)

afterAll(async () => {
  await UsersModel.deleteMany();
  await mongoose.connection.close();
});

let accessToken: string;

describe("Test API", () => {
  it("Should test POST users/login with correct credentials", async () => {
    const response = await client.post("users/login").send(validUser);
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("accessToken");
    accessToken = response.body.accessToken;
  });
});
