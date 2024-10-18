import clientPromise from "./mongo.js";
const client = await clientPromise;
export const db = client.db("CTFBOARD_DATABASE");  // replace with your database name
