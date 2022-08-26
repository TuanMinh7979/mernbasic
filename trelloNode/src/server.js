import express from 'express';
import { connectDB, getDB } from './config/mongodb';
const hostname = 'localhost';
const port = 8989;

connectDB()
  .then(() => console.log('Connected success to server'))
  .then(() => bootServer())
  .catch((e) => {
    console.log(e);
    process.exit();
  });
const bootServer = () => {
  const app = express();
  const dbIns = getDB();
  dbIns.collection('maintable').insertOne({
    title: 'tuan minh',
  });
  app.get('/', (req, res) => {
    res.send('<h1>abc</h1>');
  });

  app.listen(port, hostname, () => {
    console.log('hello trung quna dev');
  });
};
