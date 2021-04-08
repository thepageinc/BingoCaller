/**
 * @module        Constants
 * @file          Constants.js
 * @fileoverview  contains all constants of the program.
 * 
 * @exports ALL_BALLS
 * @exports CALLER_DELAY
 * @exports ENDING_STATE
 * @exports ERROR
 * @exports ROUND_HEADERS
 * @exports ROUND_STATUS
 */

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
  init  : 0.1,
  max   : 8,
  min   : 1,
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
 * @constant ERROR
 * @description contains all error threw during the program execution.
 */
const ERROR = {
  startCallerDoesNotReturnTrue : 'PROGRAMMING ERROR startCaller() failed in goContinue().',
  programHalted : 'PROGRAM HALTED',

};

/**
 * @constant    ROUND_HEADERS
 * @description used to set the round's details box title.
 */
const ROUND_HEADERS = {
  next        : 'AWAITING NEXT ROUND',
  last        : 'LAST ROUND PLAYED',
  nowPlaying  : 'NOW PLAYING'
};

/**
 * @constant    ROUND_STATUS
 * @description used to set and validate the status of the round.
 */
 const ROUND_STATUS = {
  active    : 1,
  noRound   : 0,
  paused    : 2
};

export {
  ALL_BALLS,
  CALLER_DELAY,
  ENDING_STATE, ERROR,
  ROUND_HEADERS, ROUND_STATUS
}