import mongoose from "mongoose";

const connectMongo = async () => {
  try {
    await mongoose.connect(process.env.MONGO_CONNECTION_STRING ?? "");
  } catch (err) {
    console.error(err);
  }
};

export default connectMongo;
