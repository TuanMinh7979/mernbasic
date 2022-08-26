import express from "express";
import { HttpStatusCode } from "../../utils/constants";
import { cardController } from "../../controllers/card.controller";
import { cardValidation } from "../../validations/card.validation";
const router = express.Router();

router.route("/").post(cardValidation.createNew, cardController.createNew);

export const cardRoute = router;
