import express from 'express';
import { connectDB, getDB } from './config/mongodb';
import { BoardModel } from './models/board.model';

import { apiV1 } from './routes/v1';
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

  app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000'); // update to match the domain you will make the request from
    res.header('Access-Control-Allow-Credentials', true);
    res.header(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept'
    );
    next();
  });

  app.use(express.json());
  app.use('/v1', apiV1);

  app.get('/', (req, res) => {
    res.send('<h1>abc</h1>');
  });

  // app.get("/test", async (req, res) => {
  //   try {
  //     let fakeData = { title: "Abc", test1: "bar1234" };
  //     const newBoard = await BoardModel.createNew(fakeData);
  //     console.log("INSERTED DATA ", newBoard);
  //     res.end("<h1>hello success</h1>");
  //   } catch (e) {
  //     console.log("<>>>>>", e);
  //   }
  // });

  app.listen(port, hostname, () => {
    console.log('hello trung quna dev');
  });
};
