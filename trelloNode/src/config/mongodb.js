import { MongoClient } from 'mongodb';
import { env } from './environment';
const uri = env.MONGODB_URI;
let dbIns;
export const connectDB = async () => {
  const client = new MongoClient(uri, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  });

  //connect pthe client to the server
  await client.connect();
  dbIns = client.db('tuanmernapp');
};

export const getDB = () => {
  if (!dbIns) throw new Error('Must connect to DB first');
  return dbIns;
};

