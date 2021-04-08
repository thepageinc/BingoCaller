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
 * @method      shuffleBalls
 * @description shuffles the 75 Bingo balls.
 * 
 * @param state state.
 * 
 * @returns {void}
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
 * 
 * @throws  'Error shuffling balls' + number counted in shuffled list.
 */
const shuffleBalls = (options = Options) => {
    
  // Some constants and variables are declared in their loop.
  const { state }     = options;
  let   ballsList     = ALL_BALLS.slice();
  let   shuffledBalls = [];

  while(ballsList.length > 0) {
    const Num = Math.floor(Math.random() * ballsList.length);
    shuffledBalls.push(ballsList.splice(Num, 1)[0]);
  }

  if (shuffledBalls.length !== ALL_BALLS.length)
    throw new Error('Error shuffling balls. Counting ' + shuffledBalls.length + ' in the list');
  
  state.round.shuffledBalls = shuffledBalls;
};

export default shuffleBalls;