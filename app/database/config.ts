import mongoose from "mongoose";

const dbConnection = async () => {
  const DB_URI = process.env.NEXT_PUBLIC_DB_URI ?? "";
  console.log("DB_URI ", DB_URI);
  try {
    await mongoose.connect(DB_URI);

    console.log("DB Online");
  } catch (error) {
    console.log(error);
    throw new Error("Error a la hora de iniciar la BD ver logs");
  }
};

export default dbConnection;
