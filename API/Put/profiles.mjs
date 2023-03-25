import { ObjectId } from "mongodb";
import db from "../Database/db.mjs";

async function updateProfile(req, res) {
  const profiles = db.collection("Profiles");
  const { id } = req.params;
  const allowedFields = ["name", "logo", "agent", "addedBy", "date", "changeDate"];
  const notAllowedFields =["globalPrograms", "uniquePrograms", "globalScripts", "uniqueScripts"]
  if (!id) {
    return res.status(204).send("id is not present.");
  }

  if (!req.body || Object.keys(req.body).length === 0) {
    return res.status(400).send("Request body is empty or missing.");
  }

  const updateObj = {};
  for (const field in req.body) {

    if (allowedFields.includes(field)) {
        updateObj.$set = updateObj.$set || {};
        updateObj.$set[field] = req.body[field];
      }
       else {
        if(notAllowedFields.includes(field))
        {
       
          return res.status(400).send(`Invalid parameter: ${field}
          The parameters ${notAllowedFields} are valid however they needs to be update by its correct method.
          Read the documentation for more details.
          `);
        }
        
      return res.status(400).send(`Invalid parameter: ${field}`);
    }
  }
  

  const profileToUpdate = await profiles.findOne({ _id: new ObjectId(id) });
  if (!profileToUpdate) {
    return res.status(404).send({ message: "Profile not found." });
  }
  //Change the time that was changed
  const currentDate = new Date();
  updateObj.$set.changeDate = currentDate;

  await profiles.updateOne({ _id:new ObjectId(id) }, updateObj);
  return res.status(200).send({
    message: "Profile updated successfully.",
    success: true,
    updates: updateObj.$set,
  });
}


export { updateProfile };
