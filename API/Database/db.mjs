import { MongoClient } from "mongodb";
import * as dotenv from "dotenv";
dotenv.config();

console.log(process.env.URi)
const connectionString = process.env.URi || "";

const client = new MongoClient(connectionString);

let conn;
try {
  conn = await client.connect();
  console.log("Conected to the database.");
} catch (e) {
  console.error(e);
}

const db = conn.db("DB_0");




export default db;