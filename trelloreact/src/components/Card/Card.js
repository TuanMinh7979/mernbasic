import React from "react";
import "./Card.scss";

function Card(props) {
  const { card } = props;
  console.log("from card com:", card)
  return (
    <li className="card-item">
      {card && card.cover && <img className="card-cover" src={card.cover} />}
      {card && card.title}
    </li>
  );
}
export default Card;
