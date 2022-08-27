import React, { useState } from 'react';
import './Column.scss';
import Card from '../Card/Card';
import { Container, Draggable } from 'react-smooth-dnd';
import { Dropdown, Button, Form } from 'react-bootstrap';

import ConfirmModal from '../Common/ConfirmModal';
function Column(props) {
  const { column, onCardDrop, onRemoveColumn, onUpdateColumnCards } = props;
  const cards = column.cards;
  cards.sort((a, b) => {
    return column.cardOrder.indexOf(a._id) - column.cardOrder.indexOf(b._id);
  });

  const [showRemoveConfirmModal, setShowRemoveConfirmModal] = useState(false);
  const toggleShowRemoveConfirmModal = () => {
    setShowRemoveConfirmModal(!showRemoveConfirmModal);
  };

  let onConfirmModalAction = (type) => {
    if (type === 'confirm') {
      const newCol = { ...column, _destroy: true };
      console.log('-------------', newCol);
      onRemoveColumn(newCol);
    }

    toggleShowRemoveConfirmModal();
  };

  const [openNewCardForm, setOpenNewCardForm] = useState(false);

  let toggleOpenNewCardForm = () => {
    setOpenNewCardForm(!openNewCardForm);
  };
  

  const [newCardTitle, setNewCardTitle] = useState('');

  const onNewCardTitleChange = (event) => {
    setNewCardTitle(event.target.value);
  };
  const addNewCard = () => {
    const newCardToAdd = {
      id: Math.random().toString(36).substr(2, 5),
      boardId: column.boardId,
      columnId: column._id,
      title: newCardTitle,
      cover: null,
    };
    console.log(column);
    let newColumn = { ...column };
    newColumn.cards.push(newCardToAdd);
    newColumn.cardOrder.push(newCardToAdd._id);
    //function from parent to update state
    onUpdateColumnCards(newColumn);

    //>function in local to update UI
    setNewCardTitle('');
    toggleOpenNewCardForm();
  };

  return (
    <div className="column">
      <header className="column-drag-handle">
        <div className="column-title"> {column.title}</div>
        <div className="column-dropdown-actions">
          <Dropdown>
            <Dropdown.Toggle
              // variant="success"
              id="dropdown-basic"
              size="sm"
              className="dropdown-btn"
            ></Dropdown.Toggle>

            <Dropdown.Menu style={{ margin: 0 }}>
              <Dropdown.Item>Add card</Dropdown.Item>
              <Dropdown.Item onClick={toggleShowRemoveConfirmModal}>
                Remove column
              </Dropdown.Item>
              <Dropdown.Item>...</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </header>
      <div className="card-list">
        <Container
          groupName="col"
          onDrop={(dropResult) => onCardDrop(column._id, dropResult)}
          getChildPayload={(index) => cards[index]}
          dragClass="card-ghost"
          dropClass="card-ghost-drop"
          dropPlaceholder={{
            animationDuration: 150,
            showOnTop: true,
            className: 'card-drop-preview',
          }}
          dropPlaceholderAnimationDuration={200}
        >
          {cards.map((card, index) => (
            <Draggable key={index}>
              <Card card={card}></Card>
            </Draggable>
          ))}
        </Container>
      </div>

      <footer>
        {openNewCardForm && (
          <div className="add-new-card-area">
            <Form.Control
              size="sm"
              type="text"
              className="inp-enter-new-column"
              value={newCardTitle}
              onChange={(event) => onNewCardTitleChange(event)}
            ></Form.Control>
            <Button variant="success" size="sm" onClick={addNewCard}>
              Add Column
            </Button>
            <span className="cancle-icon" onClick={toggleOpenNewCardForm}>
              <i className="fa fa-times" aria-hidden="true"></i>
            </span>
          </div>
        )}
        {!openNewCardForm && (
          <div className="footer-actions" onClick={toggleOpenNewCardForm}>
            <i className="fa fa-plus icon" /> Add another card
          </div>
        )}
      </footer>

      <ConfirmModal
        title="Remove column"
        content="Are you sure?"
        show={showRemoveConfirmModal}
        onAction={onConfirmModalAction}
      ></ConfirmModal>
    </div>
  );
}
export default Column;
