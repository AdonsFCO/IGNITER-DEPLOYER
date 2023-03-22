import { ObjectId } from "mongodb";
import db from "../Database/db.mjs";

  async function updateProfile(req, res) {
    const profiles = db.collection("Profiles");

  try {
    //Check if the parameter of the profile exists.
    if (!req.body.id) {
      res.status(204).send("id is not present.");
      return;
    }
    const id = new ObjectId(req.body.id);
    //Determine that the id exists on the database.
    const profileToUpdate = profiles.findOne({ _id: id }).toArray()
    if (profileToUpdate.length === 1) {
      console.log(profileToUpdate);



    }
  } catch (error) {}
}

export { updateProfile };
