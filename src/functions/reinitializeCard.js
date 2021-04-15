/**
 * @module        reinitializeCard
 * @file          reinitializeCard.js
 * @fileoverview  contains the subroutine to reset the caller's Bingo card.
 * 
 * @exports reinitializeCard()
 */

import InitialState from "../objects/State";

/**
 * @constant    Options
 * @description used to defines reinitializeCard() parameters.
 */
const Options = {
  state : InitialState
}

/**
 * @function    reinitializeCard
 * @description reinitializes the caller's Bingo card.
 * 
 * @returns {Promise<void>} voided Promise object.
 * 
 * @processing scan the card object and reinitialize the hit property, so no
 * numbers are market on the Bingo caller's card.
 */
const reinitializeCard = async (options = Options) => {
  return new Promise(resolve => {

    // All scope's constants and variables are declared at the top.
    const { state } = options;
    let   card    = state.card;
    let   goTrue  = true;
    let   pos     = 0;
  
    while (goTrue) {
      pos = card.findIndex(number => number.hit === true);
      if (pos > -1) 
        card[pos].hit = false;
      else
        goTrue = false;
    }

    resolve();
  });
};

export default reinitializeCard;