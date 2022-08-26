import Joi from 'joi';
import { HttpStatusCode } from '../utils/constants';
const createNew = async (req, res, next) => {
  const condition = Joi.object({
    boardId: Joi.string().required(),
    columnId: Joi.string().required(),

    title: Joi.string().required().min(3).max(20),
  });

  try {
    await condition.validateAsync(req.body, { abortEarly: false });
    next();
  } catch (e) {
    res.status(HttpStatusCode.BAD_REQUEST).json({
      erros: new Error(e).message,
    });
  }
};


export const cardValidation = { createNew};
