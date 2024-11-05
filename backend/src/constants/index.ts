import dotenv from "dotenv";

dotenv.config();

export const envConstants = {
  Port: process.env.PORT || 5000,
  MongoUri: process.env.MONGO_URI || "",
  JwtSecret: process.env.JWT_SECRET || "this_is_test_jwt_key",
  SerpApi: process.env.SERP_API || "",
};
