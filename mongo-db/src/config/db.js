import mongoose from "mongoose";

const connect_db = () => {
  mongoose
    .connect(process.env.DATABASE_URL)
    .then(() => console.log("Connected to MongoDB..."))
    .catch((err) => console.error("Error connecting to MongoDB:", err));
};

export default connect_db;
