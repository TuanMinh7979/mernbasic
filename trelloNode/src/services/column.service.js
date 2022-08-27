import { columnModel } from '../models/column.model';
import { boardModel } from '../models/board.model';
const createNew = async (data) => {
  try {
    const insertedData = await columnModel.createNew(data);
    console.log('inserteddata: ', insertedData);
    await boardModel.pushColumnOrder(
      data.boardId,
      insertedData.insertedId.toString()
    );

    return insertedData;
  } catch (e) {
    //neu return thi se nam trong khoi try cua controller
    console.log(' err in service ', e);

    throw new Error(e);
    //throw cho thang outer (controller bat trong catch cua controler catch)
  }
};
const update = async (id, data) => {
  try {
    const updateData = {
      ...data,
      updatedAt: Date.now(),
    };
    console.log('SERVICE ID ', id);
    console.log('SERVICE data ', updateData);
    const rs = await columnModel.update(id, updateData);
    return rs;
  } catch (e) {
    //neu return thi se nam trong khoi try cua controller
    console.log(' err in service ', e);

    throw new Error(e);
    //throw cho thang outer (controller bat trong catch cua controler catch)
  }
};

export const columnService = { createNew, update };
