import { cardService } from '../services/card.service';
import { HttpStatusCode } from '../utils/constants';
//import  a object use {}
const createNew = async (req, res) => {
  try {
    const result = await cardService.createNew(req.body);
    console.log('From controller', result);
    res.status(HttpStatusCode.OK).json(result);
  } catch (e) {
    console.log(' err in controller', e);
    res.status(HttpStatusCode.INTERNAL_SERVER).json({
      errors: e.message,
    });
  }
};



export const cardController = { createNew };
