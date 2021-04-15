/**
 * @module        shuffleBalls
 * @file          shuffleBalls.js
 * @fileoverview  contains the functions and subroutines to shuffle the Bingo balls.
 * 
 * @export shuffleBalls
 */

import { ALL_BALLS } from "../objects/Constants";
import InitialState from "../objects/State";

/**
 * @constant    Options
 * @description used to define shuffleBall parameters.
 */
const Options = {
  state: InitialState
}

/**
 * @constant SHUFFLE_ROUNDS
 * @description used to determine the amount of rounds in a shuffling.
 */
const SHUFFLE_ROUNDS = ALL_BALLS.length * 2;

/**
 * @function    shuffleBalls
 * @description shuffles the 75 Bingo balls and stores the result in state.
 * 
 * @param {Options} options options={ state: InitialState }.
 * 
 * @returns {Promise<void>} a voided Promise object.
 * 
 * @throws  'Error shuffling Bingo balls' + number counted in shuffled list.
 * 
 * @processing shuffles the numbers and return the result. To shuffle the
 * numbers, a copy of the sorted Bingo numbers is created and a list is 
 * created to store the shuffled numbers. Then, until the sorted list is
 * empty, a random number is chosen within the amount of elements left of this
 * list. Once chosen, 1 is substracted from this number and the element in the
 * sorted list at the position represented by the last computed number is 
 * transfered into the list of shuffled numbers. Once the sorted list is
 * empty, the shuffled numbers are assigned to the round IF AND ONLY IF the
 * entire list is shuffled. When the shuffled list doesn't contain the 
 * complete list of numbers, the program stops, throwing an error.
 */
const shuffleBalls = async (options = Options) => {
  return new Promise (async resolve => {
    
    // Some constants and variables are declared in their loop.
    const { state }     = options;
    let   ballsList     = ALL_BALLS.slice();
    let   cache         = -1;

    for (let pos = 0; pos <= SHUFFLE_ROUNDS; pos++) {
      let numi = Math.floor(Math.random() * ballsList.length);
      let numii = 0;
  
      do {
        numii = Math.floor(Math.random() * ballsList.length);
      } while (numi === numii);
  
      cache             = ballsList[numi];
      ballsList[numi]   = ballsList[numii];
      ballsList[numii]  = cache;
    }
  
    if (ballsList.length !== ALL_BALLS.length)
      throw new Error('Error shuffling Bingo balls. Counting ' + ballsList.length + ' in the list');
    
    state.round.shuffledBalls = ballsList;

    resolve();
  });
    
};

export default shuffleBalls;