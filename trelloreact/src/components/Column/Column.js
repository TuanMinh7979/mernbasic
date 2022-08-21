import React, { useState } from 'react';
import './Column.scss';
import Card from '../Card/Card';
import { Container, Draggable } from 'react-smooth-dnd';
import { Dropdown } from 'react-bootstrap';

import ConfirmModal from '../Common/ConfirmModal';
function Column(props) {
  const { column, onCardDrop, onUpdateColumn } = props;
  const cards = column.cards;
  cards.sort((a, b) => {
    return column.cardOrder.indexOf(a.id) - column.cardOrder.indexOf(b.id);
  });

  const [showRemoveConfirmModal, setShowRemoveConfirmModal] = useState(false);
  const toggleShowRemoveConfirmModal = () => {
    setShowRemoveConfirmModal(!showRemoveConfirmModal);
  };
  // const onCardDrop = (id, dropResult) => {
  //   if (dropResult.removedIndex !== null || dropResult.addedIndex !== null) {
  //     console.log(id);
  //     console.log(dropResult);
  //   }
  // };

  let onConfirmModalAction = (type) => {
    if (type === 'confirm') {
      const newCol = { ...column, _destroy: true };
      console.log('-------------', newCol);
      onUpdateColumn(newCol);
    }

    toggleShowRemoveConfirmModal();
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
          onDrop={(dropResult) => onCardDrop(column.id, dropResult)}
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
        <div className="footer-actions">
          <i className="fa fa-plus icon" /> Add another card
        </div>
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
