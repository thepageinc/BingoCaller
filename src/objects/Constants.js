/**
 * @module        Constants
 * @file          Constants.js
 * @fileoverview  contains all constants of the program BUT the state.
 * 
 * @exports ACTION
 * @exports ALL_BALLS
 * @exports CALLER_DELAY
 * @exports ENDING_STATE
 * @exports ROUND_HEADERS
 */

const ACTION = {
  ballCalled  : 'BALL CALLED',
  cancel      : 'CANCEL',
  end         : 'END',
  go          : 'GO',
  idle        : 'IDLE',
  pause       : 'PAUSE',
  reset       : 'RESET',
};

/**
 * @constant    ALL_BALLS
 * @description contains the entire list of Bingo numbers, without the letters.
 * 
 */
 const ALL_BALLS = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15,
  16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30,
  31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45,
  46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60,
  61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75
];

/**
 * @constant    CALLER_DELAY
 * @summary     Caller delay's range of action.
 * 
 */
const CALLER_DELAY = {
  init  : 4,
  max   : 8,
  min   : 3,
  skip  : 0.5
};

/**
 * @constant    ENDING_STATE
 * @description used to determine the end of a round.
 */
const ENDING_STATE = {
  byUser      : 'ENDED BY USER',
  canceled    : 'CALCELED BY USER',
  noMoreBalls : 'ALL BALLS CALLED'

};

/**
 * @constant    ROUND_HEADERS
 * @description used to set the round's details box title.
 */
const ROUND_HEADERS = {
  last        : 'LAST ROUND PLAYED',
  next        : 'AWAITING NEXT ROUND',
  nowPlaying  : 'NOW PLAYING',
  paused      : 'PAUSED'
};

export {
  ACTION, ALL_BALLS,
  CALLER_DELAY,
  ENDING_STATE,
  ROUND_HEADERS
}