import mongoose from "mongoose";

const connect_db = () => {
  mongoose
    .connect("mongodb://127.0.0.1:27017/test_db")
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.error("Error connecting to MongoDB:", err));
};

export default connect_db;
