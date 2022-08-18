import React from 'react';
import './Column.scss';
import Card from '../Card/Card';
import { Container, Draggable } from 'react-smooth-dnd';
function Column(props) {
  const { column } = props;
  const cards = column.cards;
  cards.sort((a, b) => {
    return column.cardOrder.indexOf(a.id) - column.cardOrder.indexOf(b.id);
  });

  const onCardDrop = () => {
    console.log('----');
  };
  return (
    <div className="column">
      <header className="column-drag-handle"> Brainstorm</header>
      <div className="card-list">
        <Container
          // {...column.props}
          groupName="col"
          // onDragStart={(e) => console.log('drag started', e)}
          // onDragEnd={(e) => console.log('drag end', e)}
          // onDragEnter={() => {
          //   console.log('drag enter:', column.id);
          // }}

          // onDragLeave={() => {
          //   console.log('drag leave:', column.id);
          // }}
          // onDropReady={(p) => console.log('Drop ready: ', p)}
          onDrop={() => onCardDrop()}
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

      <footer>Footer</footer>
    </div>
  );
}
export default Column;
