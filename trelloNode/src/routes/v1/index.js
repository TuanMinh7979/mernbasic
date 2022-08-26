import express from "express";
import { HttpStatusCode } from "../../utils/constants";
import { boardRoute } from "./board.route";
import { columnRoute } from "./column.route";
const router = express.Router();

router.get("/status", (req, res) => {
    return res.status(HttpStatusCode.OK).json({status: 'OK'})
});

router.use("/boards", boardRoute);
router.use("/columns", columnRoute);


export const apiV1= router;