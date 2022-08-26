import express from "express";
import { HttpStatusCode } from "../../utils/constants";
import { columnController } from "../../controllers/column.controller";
import { columnValidation } from "../../validations/column.validation";
const router = express.Router();

router.route("/").post(columnValidation.createNew, columnController.createNew);
router.route("/:id").put(columnValidation.update, columnController.update);

export const columnRoute = router;
