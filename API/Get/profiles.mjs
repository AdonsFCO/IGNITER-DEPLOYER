import db from "../Database/db.mjs";
import { ObjectId } from "mongodb";

async function getFullProfiles(req, res) {
  const offset = parseInt(req.params.offset);
  const page = parseInt(req.params.page);
  const order = { length: -1 };
try {
  let profiles = await db
  .collection("Profiles")
  .find()
  .sort(order)
  .limit(offset)
  .skip(page)
  .toArray();

res.send(profiles);
} catch (error) {
  res.send("Not found or out of limits.");
  console.error(`Error trying to get profiles: ${error}`)
}
 
}

async function getProfileList(req, res) {
  const offset = parseInt(req.params.offset);
  const page = parseInt(req.params.page);
  const order = { length: -1 };
  const projection = {_id:1, name:1}
try {
  let profiles = await db
  .collection("Profiles")
  .find().project(projection)
  .sort(order)
  .limit(offset)
  .skip(page)
  .toArray();

res.send(profiles);
} catch (error) {
  res.send("Not found or out of limits.");
  console.error(`Error trying to get profiles: ${error}`)
}
 
}

async function getSingleProfile(req, res) {
 const id = new ObjectId(req.params.id);

  try {
    let profile = await db.collection("Profiles").find({_id:id}).toArray();
    res.send(profile);
  } catch (error) {
    console.error(`Error trying to get a profile: ${error}`)
    res.send("Not found.");
  }
}

export { getFullProfiles, getProfileList, getSingleProfile };
