import { columnModel } from "../models/column.model";

const createNew = async (data) => {
  try {
    const rs = await columnModel.createNew(data);
    return rs;
  } catch (e) {
    //neu return thi se nam trong khoi try cua controller
    console.log(" err in service ", e)

    throw new Error(e);
    //throw cho thang outer (controller bat trong catch cua controler catch)
  }
};
const update = async (id , data) => {
  try {
   
    const updateData={
      ...data, 
      updatedAt:Date.now()
    }
    console.log("SERVICE ID ", id)
    console.log("SERVICE data ", updateData)
    const rs = await columnModel.update(id, updateData);
    return rs;
  } catch (e) {
    //neu return thi se nam trong khoi try cua controller
    console.log(" err in service ", e)

    throw new Error(e);
    //throw cho thang outer (controller bat trong catch cua controler catch)
  }
};

export const columnService = { createNew ,update};
