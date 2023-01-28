import { MongoClient } from 'mongodb';
import { config } from 'dotenv';

config();

export default async function connect() {
  const mongo = new MongoClient(process.env.MONGO_URL);
  console.log('Connected to MongoDB');

  const db = await mongo.db('messenger-plus');
  console.log('Connected to messenger-plus DB');
  return db;
}
