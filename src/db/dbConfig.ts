import mongoose from "mongoose";

export async function connect() {
  try {
    mongoose.connect(process.env.MONGO_URI!); //! it denotes proces.env.MONGO_URL will be available
    const connection = mongoose.connection;
    connection.on("connected", () => {
      console.log("MongoDb connected");
    });
    connection.on("error", (err) => {
      console.log(
        "MongoDb connection failed, make sure db is up and running successfully",
        err
      );
      process.exit();
    });
  } catch (error) {
    console.log("Something went wrong in connecting to db");
    console.log(error);
  }
}
