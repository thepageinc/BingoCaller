/**
 * @module        getLetterOf
 * @file          getLetterOf.js
 * @fileoverview  contains functions and subroutines to retrieve a letter attached to a bingo number.
 * 
 * @exports getLetterOf()
 */

/**
 * @constant INVALID_NUMBER
 * @description used to throw an error.
 */
const INVALID_NUMBER = 'invalid bingo number!';

/**
 * @function    getLetterOf
 * @description returns the letter a Bingo number is attached to.
 * 
 * @param {number} number the number.
 * 
 * @returns {string} B, I, N, G or O.
 * 
 * @processing validates the number passed in parameter to return the letter
 * attached to it. Returns:
 *    'B' if number is from 1 to 15
 *    'I' if number is from 16 to 30
 *    'N' if number is from 31 to 45
 *    'G' if number is from 46 to 60
 *    'O' if number is from 61 to 75.
 * 
 * Throws an error if number passed in is out of this range.
 * 
 * @throws 'invalid bingo number!'
 * 
 */
const getLetterOf = (number) => {
  let letter  = '';

  switch (true) {
    case number >=1 && number <=15:
      letter = 'B';
      break;
  
    case number >=16 && number <=30:
      letter  = 'I';
      break;

    case number >=31 && number <=45:
      letter  = 'N';
      break;

    case number >=46 && number <=60:
      letter  = 'G';
      break;

    case number >=61 && number <=75:
      letter  = 'O';
      break;

    default:
      throw new Error(INVALID_NUMBER)
  }

  return letter;
};

export default getLetterOf;