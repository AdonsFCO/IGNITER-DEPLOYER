import express from "express";
import * as dotenv from "dotenv";
import bodyParser from "body-parser";
import {
  getFullProfiles,
  getSingleProfile,
  getProfileList,
} from "./get/profiles.mjs";
import { setNewProfile } from "./post/profiles.mjs";
import { updateProfile } from "./Put/profiles.mjs";

dotenv.config();
const port = process.env.SERVER_PORT;

const app = express();
app.use(bodyParser.json());

//Profile
//Get
app.get("/get/FullProfiles/offset/:offset/page/:page", getFullProfiles);
app.get("/get/ProfileList/offset/:offset/page/:page", getProfileList);
app.get("/get/profile/:id", getSingleProfile);

//Set 
app.post("/add/profile", setNewProfile);
app.put("/update/profile", updateProfile);

//Programs

//Scripts

app.listen(port, () => {
  console.log(`Server Running on ${port}`);
});
