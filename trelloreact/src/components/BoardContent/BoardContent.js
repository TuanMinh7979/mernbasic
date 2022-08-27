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

import { fetchBoardDetail } from '../../actions/ApiCall';
function BoardContent() {
  const [board, setBoard] = useState({});
  const [columns, setColumns] = useState([]);
  const [openNewColumnForm, setOpenNewColumnForm] = useState(false);

  let toggleOpenNewColumnForm = () => {
    if (openNewColumnForm) {
      setNewColumnTitle('');
    }
    setOpenNewColumnForm(!openNewColumnForm);
    console.log(openNewColumnForm);
  };

  const [newColumnTitle, setNewColumnTitle] = useState('');
  //run first time
  useEffect(() => {
    // const board = initData.boards.find((boardi) => boardi._id === 'board-1');

    fetchBoardDetail('630889c3e4bb6c26429c9827').then((board) => {
      setBoard(board);

      board.columns.sort((a, b) => {
        return (
          board.columnOrder.indexOf(a._id) - board.columnOrder.indexOf(b._id)
        );
      });
      setColumns(board.columns);
    });

    // if (boardFromDb) {
    //   setBoard(boardFromDb);

    //   boardFromDb.columns.sort((a, b) => {
    //     return (
    //       boardFromDb.columnOrder.indexOf(a._id) -
    //       boardFromDb.columnOrder.indexOf(b._id)
    //     );
    //   });
    //   setColumns(boardFromDb.columns);
    // }
  }, []);

  if (isEmpty(board)) {
    console.log('______________', board);
    return <div className="not-found">Board not found</div>;
  }

  const onColumnDrop = (dropResult) => {
    let newCols = [...columns];
    newCols = applyDrag(newCols, dropResult);

    console.log(columns, 'column=========== newCols', newCols);

    let newBoard = { ...board };
    newBoard.columnOrder = newCols.map((c) => c._id);
    newBoard.column = newCols;
    setColumns(newCols);
    setBoard(newBoard);
  };

  const onCardDrop = (id, dropResult) => {
    if (dropResult.removedIndex !== null || dropResult.addedIndex !== null) {
      let newCols = [...columns];

      let currentColumn = newCols.find((c) => c._id === id);
      console.log('ID', id);
      console.log('newCols', newCols, 'currnetCol', currentColumn);
      currentColumn.cards = applyDrag(currentColumn.cards, dropResult);
      currentColumn.cardOrder = currentColumn.cards.map((i) => i._id);
      // console.log(currentColumn);

      setColumns(newCols);
    }
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
      boardId: board._id,
      title: newColumnTitle,
      cardOrder: [],
      cards: [],
    };
    let updateColumns = [...columns];
    updateColumns.push(newColToAdd);

    let updateBoard = { ...board };
    updateBoard.columnOrder = updateColumns.map((c) => c._id);
    updateBoard.column = updateColumns;
    setOpenNewColumnForm(false);
    setColumns(updateColumns);
    setBoard(updateBoard);
  };

  const onRemoveColumn = (newColToUpdate) => {
    const colIdToRemove = newColToUpdate._id;
    let newCols = [...columns];
    const columnIndexToUpdate = newCols.findIndex(
      (i) => i._id === colIdToRemove
    );
    newCols.splice(columnIndexToUpdate, 1);
    let newBoard = { ...board };
    newBoard.columnOrder = newCols.map((c) => c._id);
    newBoard.columns = newCols;
    setColumns(newCols);
    setBoard(newBoard);

    console.log(columnIndexToUpdate);
  };

  const onUpdateColumnCards = (newColToUpdate) => {
    const colIdToupdateCards = newColToUpdate._id;

    let newCols = [...columns];
    const columnIndexToUpdate = newCols.findIndex(
      (i) => i._id === colIdToupdateCards
    );

    newCols[colIdToupdateCards] = newColToUpdate;
    let newBoard = { ...board };
    newBoard.columnOrder = newCols.map((c) => c._id);
    newBoard.columns = newCols;
    setColumns(newCols);
    setBoard(newBoard);
  };

  return (
    <div className="board-content">
      <Container
        orientation="horizontal"
        onDrop={onColumnDrop}
        getChildPayload={(index) => columns[index]}
        dragHandleSelector=".column-drag-handle"
        dropPlaceholder={{
          animationDuration: 150,
          showOnTop: true,
          className: 'cards-drop-preview',
        }}
      >
        {columns.map((columni, index) => (
          <Draggable key={index}>
            <Column
              onCardDrop={onCardDrop}
              column={columni}
              onRemoveColumn={onRemoveColumn}
              onUpdateColumnCards={onUpdateColumnCards}
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
              <span className="cancle-icon" onClick={toggleOpenNewColumnForm}>
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
