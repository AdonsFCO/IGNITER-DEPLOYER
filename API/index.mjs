import express from "express";
import * as dotenv from "dotenv";
import getProfiles from "./Get/profiles.mjs";

dotenv.config();
const port = process.env.SERVER_PORT;

const app = express();

app.use('/profiles/offset/:offset/page/:page',getProfiles)
app.listen(port, () => {
  console.log(`Server Running on ${port}`);
});
