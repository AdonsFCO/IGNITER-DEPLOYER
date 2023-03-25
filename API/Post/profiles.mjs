import db from "../Database/db.mjs";

async function setNewProfile(req, res) {
  const profile = db.collection("Profiles");

  try {
    if (!req.body.name) {
      res.status(204).send("name is not present.");
      return;
    } else {
      //To make sure that the profile doesn't exist on the server.
      const existingProfile = await profile
        .find({ name: req.body.name })
        .project({ _id: 1, name: 1 })
        .toArray();

      if (existingProfile.length > 0) {
        res.status(208).send({
          message: `A profile with the name "${req.body.name}" already exists.`,
          success: false,
          existingProfile,
        });
        return;
      }

      const currentDate = new Date();
      const newProfile = {
        name: req.body.name,
        logo: req.body.logoUrl,
        globalPrograms: req.body.globalProgramsIds,
        uniquePrograms: req.body.uniquePrograms,
        globalScripts: req.body.globalScriptsIds,
        uniqueScripts: req.body.uniqueScripts,
        agent: req.body.agentUrl,
        addedBy: req.body.addedBy,
        addedDate: currentDate,
        changeDate: currentDate,
      };
      await profile.insertOne(newProfile);
      res.status(201).send({
        message: "Profile added successfully",
        success: true,
        profileAdded: newProfile,
      });
    }
  } catch (error) {
    res.status(400).send({
      message: "Failed to add profile",
      success: false,
      error,
    });
  }
}

export { setNewProfile };
