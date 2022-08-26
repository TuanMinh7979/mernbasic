import Joi from 'joi';
import { ObjectId } from 'mongodb';
import { getDB } from '../config/mongodb';
//define column collection
const columnCollectionName = 'columns';
const columnCollectionSchema = Joi.object({
  boardId: Joi.string().required(),
  title: Joi.string().required().min(3).max(20),
  cardOrder: Joi.array().items(Joi.string()).default([]),
  createdAt: Joi.date().timestamp().default(Date.now()),
  updatedAt: Joi.date().timestamp().default(null),
  _destroy: Joi.boolean().default(false),
});

const validateSchema = async (data) => {
  return await columnCollectionSchema.validateAsync(data, {
    abortEarly: false,
  });
};

const createNew = async (data) => {
  try {
    // const value = await validateSchema(data);

    let result = await getDB()
      .collection(columnCollectionName)
      .insertOne(value);

    return result;
  } catch (e) {
    throw new Error(e);
  }
};

const update = async (id, data) => {

  try {
    let result = await getDB()
      .collection(columnCollectionName)
      .findOneAndUpdate(
        {
          _id: ObjectId(id),
        },
        {
          $set: data,
        },
        {
          returnOriginal: false,
        }
      );

    return result;
  } catch (e) {
    throw new Error(e);
  }
};

export const columnModel = { createNew, update };
