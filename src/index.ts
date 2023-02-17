import mongoose from "mongoose";
import listEndpoints from "express-list-endpoints";
import { server } from "./server";

const port = process.env.PORT || 3001;

mongoose.connect(process.env.MONGO_KEY!);

mongoose.connection.on("connected", () => {
  console.log("connected");
  server.listen(port, () => {
    console.table(listEndpoints(server));
    console.log(`Server is running on port ${port}`);
  });
});
