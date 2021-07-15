import React, { useState, useEffect } from "react";
import Card from './Card';
import './CardList.css';
import PropTypes from 'prop-types';

const axios = require('axios');

const CardList = props => {
  const [cards, setCards] = useState([]);
  const [selectedCard, setSelectedCard] = useState({card:{board_id: null, card_id: null, message:'', like_count:''}});

  useEffect( () => {
    axios
      .get(`http://localhost:5000/boards/${props.board_id}/cards`)
      .then( response => {
        setCards(response.data);
      })
      .catch(error => console.log(error))
      .finally( () => console.log(`Tried to get cards for board ${props.board_id}`))
    }, [cards, props.board_id]);

  const onDeleteCard = id => {
    axios
      .delete(`http://localhost:5000/${id}`)
      .then( response => {
          const newCards= cards.filter( (card) => card.card_id !== id)
        setCards(newCards);
      })
      .catch(error => console.log(error))
      .finally( () => console.log(`Tried to get cards for board ${id}`))
    }

  return (
    <section id="card-list">
    {cards.map( card => 
      <Card key={card.card_id} 
        board_id={card.board_id} 
        card_id={card.card_id} 
        message={card.message} 
        votes={card.like_count} 
        onDeleteCard={onDeleteCard} 
      />
    )}
    </section>
  )
}
export default CardList;