import express from "express";
import cors from "cors";
import usersRouter from "./api/user";
import {
  badRequestHandler,
  unauthorizedErrorHandler,
  forbiddenErrorHandler,
  notFoundHandler,
  genericErrorHandler,
} from "./errorHandlers";

const server = express();

server.use(cors());
server.use(express.json());

server.use("/users", usersRouter);

server.use(badRequestHandler);
server.use(unauthorizedErrorHandler);
server.use(forbiddenErrorHandler);
server.use(notFoundHandler);
server.use(genericErrorHandler);

export { server };
