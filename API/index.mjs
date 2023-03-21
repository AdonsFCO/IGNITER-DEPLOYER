import express from "express";
import * as dotenv from "dotenv";
import {getFullProfiles,getSingleProfile, getProfileList} from "./Get/profiles.mjs";

dotenv.config();
const port = process.env.SERVER_PORT;

const app = express();

app.use('/get/FullProfiles/offset/:offset/page/:page',getFullProfiles,);
app.use('/get/ProfileList/offset/:offset/page/:page',getProfileList);
app.use('/profile/:id',getSingleProfile); 



app.listen(port, () => {
  console.log(`Server Running on ${port}`);
});
