import db from "../Database/db.mjs";

async function getProfiles(req, res) {
  const offset = parseInt(req.params.offset)+1;
  const page = parseInt(req.params.page);
  const order = { length: -1 };

  let profiles = await db
    .collection("Profiles")
    .find()
    .sort(order)
    .limit(offset)
    .skip(page)
    .toArray();

  res.send(profiles);
}

export default getProfiles;
