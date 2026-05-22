import dotenv from "dotenv";
import { createApp } from "./app.js";
import { connectDatabase } from "./config/database.js";

dotenv.config();

const port = process.env.PORT || 5000;
const app = createApp();

await connectDatabase(process.env.MONGO_URI);

app.listen(port, () => {
  console.log(`HiveCore API running on port ${port}`);
});
