import React, { useState, useEffect } from 'react';
import { Container, Draggable } from 'react-smooth-dnd';
import './BoardContent.scss';

import Column from '../Column/Column';
import { initData } from '../../actions/initData';
// const isEmpty = require('lodash.isempty');
import { isEmpty } from 'lodash';
import { applyDrag } from '../../utils/dragDrop';

import {
  Container as BtContainer,
  Row,
  Col,
  Form,
  Button,
} from 'react-bootstrap';

function BoardContent() {
  const [board, setBoard] = useState({});
  const [column, setColumn] = useState([]);
  const [openNewColumnForm, setOpenNewColumnForm] = useState(false);

  const [newColumnTitle, setNewColumnTitle] = useState('');
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

      setColumn(newCols);
    }
  };

  let toggleOpenNewColumnForm = () => {
    if (openNewColumnForm) {
      setNewColumnTitle('');
    }
    setOpenNewColumnForm(!openNewColumnForm);
    console.log(openNewColumnForm);
  };

  let onNewColumnTitleChange = (event) => {
    setNewColumnTitle(event.target.value);
  };

  const addNewColumn = () => {
    if (!newColumnTitle) {
      return;
    }

    const newColToAdd = {
      id: Math.random().toString(36).substring(2, 5),
      boardId: board.id,
      title: newColumnTitle,
      cardOrder: [],
      cards: [],
    };
    let updateColumns = [...column];
    updateColumns.push(newColToAdd);

    let updateBoard = { ...board };
    updateBoard.columnOrder = updateColumns.map((c) => c.id);
    updateBoard.column = updateColumns;
    setOpenNewColumnForm(false);
    setColumn(updateColumns);
    setBoard(updateBoard);
  };

  const onUpdateColumn = (newColToUpdate) => {
    const colIdToRemove = newColToUpdate.id;
    let newCols = [...column];
    const columnIndexToUpdate = newCols.findIndex(
      i => i.id === colIdToRemove
    );
    newCols.splice(columnIndexToUpdate, 1);
    let newBoard = { ...board };
    newBoard.columnOrder = newCols.map((c) => c.id);
    newBoard.column = newCols;
    setColumn(newCols);
    setBoard(newBoard);

    console.log(columnIndexToUpdate);
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
            <Column
              onCardDrop={onCardDrop}
              column={columni}
              onUpdateColumn={onUpdateColumn}
            >
              {' '}
            </Column>
          </Draggable>
        ))}
      </Container>

      <BtContainer className="btcontainer">
        {!openNewColumnForm && (
          <Row>
            <Col className="add-new-column" onClick={toggleOpenNewColumnForm}>
              <i className="fa fa-plus icon" /> Add new column
            </Col>
          </Row>
        )}
        {openNewColumnForm && (
          <Row>
            <Col className="enter-add-column">
              <Form.Control
                size="sm"
                type="text"
                className="inp-enter-new-column"
                value={newColumnTitle}
                onChange={(event) => onNewColumnTitleChange(event)}
              ></Form.Control>
              <Button variant="success" size="sm" onClick={addNewColumn}>
                Add Column
              </Button>
              <span className="add-cancle" onClick={toggleOpenNewColumnForm}>
                <i className="fa fa-trash" />
              </span>
            </Col>
          </Row>
        )}
      </BtContainer>
    </div>
  );
}
export default BoardContent;
