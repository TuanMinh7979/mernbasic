import Joi from "joi";
import { getDB } from "../config/mongodb";
//define board collection
const boardCollectionName = "boards";
const boardCollectionSchema = Joi.object({
  title: Joi.string().required().min(3).max(20),
  columnOrder: Joi.array().items(Joi.string()).default([]),
  createdAt: Joi.date().timestamp().default(Date.now()),
  updatedAt: Joi.date().timestamp().default(null),
  test1: Joi.string().default("abc"),
  _destroy: Joi.boolean().default(false),
});

const validateSchema = async (data) => {
  return await boardCollectionSchema.validateAsync(data, {
    abortEarly: false,
  });
};

const createNew = async (data) => {
  try {
    const value = await validateSchema(data);

    let result = await getDB().collection(boardCollectionName).insertOne(data);
    console.log("RESULT", result);
    return result;
  } catch (e) {
    //throw cho service
    console.log(" err in model", e);
    throw new Error(e);
  }
};

export const boardModel = { createNew };
