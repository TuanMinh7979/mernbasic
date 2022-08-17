import React from "react";
import "./Column.scss";
import Card from "../Card/Card";
function Column(props) {
  const { column } = props;
  const cards = column.cards;
  cards.sort((a, b) => {
    return column.cardOrder.indexOf(a.id) - column.cardOrder.indexOf(b.id);
  });

  return (
    <div className="column">
      <header> Brainstorm</header>
      <ul className="card-list">
        {cards.map((card, index) => (
          <Card key={index} card={card}></Card>
        ))}
        <Card />
      </ul>

      <footer>Footer</footer>
    </div>
  );
}
export default Column;
