import express from "express";
import { HttpStatusCode } from "../../utils/constants";
import { boardController } from "../../controllers/board.controller";
import { boardValidation } from "../../validations/board.validation";
const router = express.Router();

router
  .route("/")
//   .get((req, res) => {
//     console.log("board get");
//   })
  .post(boardValidation.createNew,   boardController.createNew);

export const boardRoute= router;
