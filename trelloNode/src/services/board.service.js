import { boardModel } from '../models/board.model';

const createNew = async (data) => {
  try {
    const rs = await boardModel.createNew(data);
    return rs;
  } catch (e) {
    //neu return thi se nam trong khoi try cua controller
    console.log(' err in service ', e);

    throw new Error(e);
    //throw cho thang outer (controller bat trong catch cua controler catch)
  }
};
const getBoards = async (id) => {
  try {
    const totalBoard = await boardModel.getBoards(id);
    totalBoard.columns.forEach((col) => {
      col.cards = totalBoard.cards.filter(
        (card) => card.columnId.toString() === col._id.toString()
      );
    });
    delete totalBoard.cards;
    return totalBoard;
  } catch (e) {
    //neu return thi se nam trong khoi try cua controller
    console.log(' err in service ', e);

    throw new Error(e);
    //throw cho thang outer (controller bat trong catch cua controler catch)
  }
};

export const boardService = { createNew, getBoards };
