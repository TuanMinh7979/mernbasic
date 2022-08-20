import React, { useState, useEffect } from 'react';
import { Container, Draggable } from 'react-smooth-dnd';
import './BoardContent.scss';

import Column from '../Column/Column';
import { initData } from '../../actions/initData';
// const isEmpty = require('lodash.isempty');
import { isEmpty } from 'lodash';
import { applyDrag } from '../../utils/dragDrop';

function BoardContent() {
  const [board, setBoard] = useState({});
  const [column, setColumn] = useState([]);

  //run first time
  useEffect(() => {
    const boardFromDb = initData.boards.find((board) => board.id === 'board-1');

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
    console.log('______________', board);
    return <div className="not-found">Board not found</div>;
  }

  const onColumnDrop = (dropResult) => {
    let newCols = [...column];
    newCols = applyDrag(newCols, dropResult);

    console.log(column, 'column=========== newCols', newCols);

    let newBoard = { ...board };
    newBoard.columnOrder = newCols.map((c) => c.id);
    newBoard.column = newCols;
    setColumn(newCols);
    setBoard(newBoard);
  };

  const onCardDrop = (id, dropResult) => {
    if (dropResult.removedIndex !== null || dropResult.addedIndex !== null) {
      let newCols = [...column];
      let currentColumn = newCols.find((c) => c.id === id);
      currentColumn.cards = applyDrag(currentColumn.cards, dropResult);
      currentColumn.cardOrder = currentColumn.cards.map((i) => i.id);
      console.log(currentColumn);


      setColumn(newCols)
     
    }
  };

  return (
    <div className="board-content">
      <Container
        orientation="horizontal"
        onDrop={onColumnDrop}
        getChildPayload={(index) => column[index]}
        dragHandleSelector=".column-drag-handle"
        dropPlaceholder={{
          animationDuration: 150,
          showOnTop: true,
          className: 'cards-drop-preview',
        }}
      >
        {column.map((columni, index) => (
          <Draggable key={index}>
            <Column onCardDrop={onCardDrop} column={columni}></Column>
          </Draggable>
        ))}

        <div className='add-new-column'>
        <i className="fa fa-plus icon" /> Add new column
        </div>
      </Container>
    </div>
  );

  //   if()
  //   return (
  //     <div className='board-content'>
  //       <Column></Column>
  //     </div>
  //   );
}
export default BoardContent;
