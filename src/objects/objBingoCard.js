/**
 * @module        objBingoCard
 * @file          objBingocard
 * @fileoverview  contains the data structure and initial values of a Bingo Card.
 * @description   since numbers are unique to a letter, no letter needed in the structure.
 * 
 * @exports getCardObject
 * 
 * Card structure
 * Card = [
 *  {
 *    num : 1,
 *    hit : false
 *  }
 *  {
 *    num : 2,
 *    hit : false
 *  }
 *  ...
 *  {
 *    num : 75,
 *    hit : false
 *  }
 * ]
 */

import { ALL_BALLS } from "./Constants";

/**
 * @constant    BingoNumber object.
 * @description data structure of a bingo number in the card.
 * 
 * @processing  USED ONLY FOR DOC. using this object adds 3 unusefull lines of code. 
 */

// eslint-disable-next-line no-unused-vars
const BingoNumber = {
  num : 0,
  hit : false
};

const FROM  = 1;
const TO    = ALL_BALLS.length;

/**
 * @function    getCardObject
 * @description generate the Bingo card object used to mark called numbers.
 * 
 * @returns {Array<BingoNumber>} an array of 75 elements.
 * 
 * @processing creates a list of 75 elements with two properties : 
 *  -'number' containing a number from 1 to 75
 *  -'hit' containing a boolean initialized to FALSE.
 */
const getCardObject = () => {

  let card = [];
  let num       = FROM;

  while (num <= TO) {
    card.push({ num: num, hit: false });
    num++;
  }
  
  return card;
};

export default getCardObject;