import Joi from 'joi';
import { ObjectId } from 'mongodb';
import { getDB } from '../config/mongodb';
// import {columnCollectionName1} from './column.model'

//define board collection
const boardCollectionName = 'boards';
const boardCollectionSchema = Joi.object({
  title: Joi.string().required().min(3).max(20),
  columnOrder: Joi.array().items(Joi.string()).default([]),
  createdAt: Joi.date().timestamp().default(Date.now()),
  updatedAt: Joi.date().timestamp().default(null),
  test1: Joi.string().default('abc'),
  _destroy: Joi.boolean().default(false),
});

const validateSchema = async (data) => {
  return await boardCollectionSchema.validateAsync(data, {
    abortEarly: false,
  });
};

const createNew = async (data) => {
  try {
    // const value = await validateSchema(data);

    let result = await getDB().collection(boardCollectionName).insertOne(data);
    console.log('RESULT', result);
    return result;
  } catch (e) {
    //throw cho service
    console.log(' err in model', e);
    throw new Error(e);
  }
};

const pushColumnOrder = async (boardId, columnId) => {
  try {
    const rs = await getDB()
      .collection(boardCollectionName)
      .findOneAndUpdate(
        { _id: ObjectId(boardId) },
        { $push: { columnOrder: columnId } },
        { returnOriginal: false }
      );
    
  } catch (e) {
    console.log(e);
  }
};

const getBoards = async (id) => {
  try {
    let result = await getDB()
      .collection(boardCollectionName)
      .aggregate([
        {
          $match: {
            _id: ObjectId(id),
          },
        },

        {
          $lookup: {
            from: "columns", //collection Name
            localField: '_id',
            foreignField: 'boardId',
            as: 'columns',
          },
        },
        {
          $lookup: {
            from: 'cards', //collection Name
            localField: '_id',
            foreignField: 'boardId',
            as: 'cards',
          },
        },
      ])
      .toArray();
    console.log('RESULT', result);
    return result[0];
  } catch (e) {
    //throw cho service
    console.log(' err in model', e);
    throw new Error(e);
  }
};

export const boardModel = { createNew, getBoards, pushColumnOrder };
