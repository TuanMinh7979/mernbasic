import React from 'react';
import './Card.scss';

function Card(props) {
  const { card } = props;

  return (
    <div className='card-item'>
      {card && card.cover && <img className='card-cover' src={card.cover} />}
      {card && card.title}
    </div>
  );
}
export default Card;
