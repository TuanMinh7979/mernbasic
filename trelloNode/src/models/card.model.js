import Joi from "joi";
import { getDB } from "../config/mongodb";
//define card collection
const cardCollectionName = "cards";
const cardCollectionSchema = Joi.object({
  boardId: Joi.string().required(),
  columnId: Joi.string().required(),
  title: Joi.string().required().min(3).max(20),
  cover: Joi.string().default(null),
  createdAt: Joi.date().timestamp().default(Date.now()),
  updatedAt: Joi.date().timestamp().default(null),
  _destroy: Joi.boolean().default(false),
});

const validateSchema = async (data) => {
  return await cardCollectionSchema.validateAsync(data, {
    abortEarly: false,
  });
};

const createNew = async (data) => {
  try {


    let result = await getDB().collection(cardCollectionName).insertOne(data);
    console.log("RESULT", result);
    return result;
  } catch (e) {
    throw new Error(e);
  }
};

export const cardModel = { createNew };
