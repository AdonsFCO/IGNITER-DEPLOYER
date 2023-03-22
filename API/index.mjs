import express from "express";
import * as dotenv from "dotenv";
import bodyParser from "body-parser";
import {getFullProfiles,getSingleProfile, getProfileList} from "./Post/profiles.mjs";
import {setNewProfile} from "./Set/profiles.mjs"

dotenv.config();
const port = process.env.SERVER_PORT;

const app = express();
app.use(bodyParser.json())


//---------------Get--->
//Profile
app.get('/get/FullProfiles/offset/:offset/page/:page',getFullProfiles,);
app.get('/get/ProfileList/offset/:offset/page/:page',getProfileList);
app.get('/profile/:id',getSingleProfile); 

//Programs

//Scripts 

//---------------Post--->

//Profile
    app.post('/set/profile',setNewProfile);

//Programs

//Scripts 




app.listen(port, () => {
  console.log(`Server Running on ${port}`);
});
