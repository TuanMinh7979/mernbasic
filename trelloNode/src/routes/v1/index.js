import express from "express";
import { HttpStatusCode } from "../../utils/constants";
import { boardRoute } from "./board.route";

const router = express.Router();

router.get("/status", (req, res) => {
    return res.status(HttpStatusCode.OK).json({status: 'OK'})
});

router.use("/boards", boardRoute);


export const apiV1= router;