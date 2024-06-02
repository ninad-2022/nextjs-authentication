import mongoose from "mongoose";

export const connect = async () => {
  try {
    mongoose.connect(process.env.MONGO_URI!); //! it denotes proces.env.MONGO_URL will be available
    const connection = mongoose.connection;
    connection.on("connected", () => { console.log("MongoDb connected")});
    connection.on("error", (err) => {
      console.log("MongoDb connection failed, make sure db is up and running successfully", err);
      process.exit(); //exit the process, there is no use of running app after this.
    });
  } catch (error) {
    console.log("Something went wrong in connecting to db");
    console.log(error);
  }
};
