import { cardModel } from '../models/card.model';
import { columnModel } from '../models/column.model';
const createNew = async (data) => {
  try {
    const insertedData = await cardModel.createNew(data);
    const rs1 = await columnModel.pushCardOrder(data.columnId, insertedData.insertedId.toString());
    console.log("RESULT PUSH CARD ORDER", rs1)
    return insertedData;
  } catch (e) {
    //neu return thi se nam trong khoi try cua controller
    console.log(' err in service ', e);

    throw new Error(e);
    //throw cho thang outer (controller bat trong catch cua controler catch)
  }
};

export const cardService = { createNew };
