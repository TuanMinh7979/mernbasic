import React, { useState, useEffect } from "react";
import "./BoardContent.scss";
import Column from "../Column/Column";
import { initData } from "../../actions/initData";
// const isEmpty = require("lodash.isempty");
import { isEmpty } from "lodash";

function BoardContent() {
  const [board, setBoard] = useState({});
  const [column, setColumn] = useState([]);

  //run first time
  useEffect(() => {
    const boardFromDb = initData.boards.find((board) => board.id === "board-1");
    console.log("___________________+_+_", boardFromDb);
    if (boardFromDb) {
      setBoard(boardFromDb);

      boardFromDb.columns.sort((a, b) => {
        return (
          boardFromDb.columnOrder.indexOf(a.id) -
          boardFromDb.columnOrder.indexOf(b.id)
        );
      });
      setColumn(boardFromDb.columns);
    }
  }, []);

  if (isEmpty(board)) {
    console.log("______________", board);
    return <div className="not-found">Board not found</div>;
  }

  return (
    <div className="board-content">
      {column.map((columni, index) => (
        <Column key={index} column={columni}></Column>
      ))}
    </div>
  );

  //   if()
  //   return (
  //     <div className="board-content">
  //       <Column></Column>
  //     </div>
  //   );
}
export default BoardContent;
