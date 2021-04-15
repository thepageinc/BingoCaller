/**
 * @module      updateCard
 * @file        updateCard.js
 * @fileoverview  contains functions and routine to update the caller's Bingo card.
 */

import InitialState from "../objects/State";

/**
 * @constant Options
 * @description used to define updateCard's parameters.
 */
const Options = {
  num   : 0,
  state : InitialState
};

/**
 * @async
 * @method      updateCard
 * @description updates the bingo card with mark on the number called.
 * 
 * @returns {Promise<void>} voided Promise object.
 * 
 * @processing finds the number called in the list and adds and changes the
 * hit mark value to TRUE.
 * 
 */
 const updateCard = async (options = Options) => {
  return new Promise(resolve => {
    const { State, Num } = options
      
    let Card = State.card;
    let pos = Card.findIndex(number => number.num === Num);
  
    Card[pos].hit = true;

    resolve();
  });
}

export default updateCard;