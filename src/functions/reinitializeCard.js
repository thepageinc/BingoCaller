/**
 * @file          reinitializeCard.js
 * @fileoverview  contains the subroutine to reset the caller's Bingo card.
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
 * @description reset the caller's Bingo card to initial state.
 * 
 * @returns {void}
 * 
 * @processing reinitializes the caller's Bingo card by setting the numbers as
 * not hit.
 */
const reinitializeCard = (options = Options) => {
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
};

export default reinitializeCard;