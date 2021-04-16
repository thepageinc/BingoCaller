/**
 * @file          State.js
 * @fileoverview  contains the state data structure and initial values.
 * 
 * @exports InitialState default
 */

import { ACTION, CALLER_DELAY, ROUND_HEADERS } from './Constants';
import getCardObject from '../objects/objBingoCard';

/**
 * @constant    ButtonList
 * @memberof    BingoCaller
 * @summary     used to initiate the state's 'isDisabled' property.
 */
 const ButtonList = {
  cancel      : true,
  dropDelay   : false,
  endRound    : true,
  go          : false,
  pause       : true,
  reset       : true,
  raiseDelay  : false
};

/**
 * @constant    InitialRound
 * @memberof    BingoCaller
 * @summary     used to initiate the state's 'round' property.
 */
const InitialRound = {
  ballsCalled     : [],                     // List of balls called during the round.
  callerPosition  : 0,                     // Store the next ball to call
  dateTimeEnd     : '',                     // Timestamp round ended (text format).
  dateTimeStart   : '',                     // Timestamp round started (text format).
  delayCalls      : CALLER_DELAY.init,      // Interval between calls.
  header          : ROUND_HEADERS.next,     // Header of the Round's details box
  paused          : 0,                      // Amount of time game was paused.
  roundID         : '',                     // Round's unique ID.
  shuffledBalls   : [],                     // Shuffled list of balls.
  timeElapsed     : '0:00',                 // To display the time elapsed
  timestampStart  : 0,                      // Timestamp round started (Date.Now()).
  timestampEnd    : '',                     // Timestamp round ended (Date.Now()).
  totalTime       : 0,                      // Total time of the round (in seconds/mseconds).
  wayEnded        : ''                      // Way the round was ended.
};

/**
 * @constant    InitialState
 * @memberof    BingoCaller
 * @summary     used to initiate BingoCaller's state.
 * @description use this constant to retrieve initial state.
 */
 const InitialState = {
  card          : getCardObject(),
  isDisabled    : ButtonList,
  lastAction    : ACTION.idle,
  muteCaller    : false,
  round         : InitialRound,
};

export default InitialState;
