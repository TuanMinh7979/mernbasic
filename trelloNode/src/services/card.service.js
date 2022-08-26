import { cardModel } from "../models/card.model";

const createNew = async (data) => {
  try {
    const rs = await cardModel.createNew(data);
    return rs;
  } catch (e) {
    //neu return thi se nam trong khoi try cua controller
    console.log(" err in service ", e)

    throw new Error(e);
    //throw cho thang outer (controller bat trong catch cua controler catch)
  }
};


export const cardService = { createNew};
