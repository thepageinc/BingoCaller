/**
 * @module        reinitializeRoundStats
 * @file          reinitializeRoundStats.js
 * @fileoverview  contains the subroutine to reinitialize the round's statistics.
 * @description   module reinitializing the round's stats when round is canceled or it is required by user.
 * 
 * @exports reinitializeRoundStats()
 */

// Constant values from the BingoCaller.js file are required
import { ROUND_HEADERS }  from '../objects/Constants';
import InitialState       from '../objects/State';

/**
 * @constant    Options
 * @description used to define the resetRoundStats() parameters.
 */
const Options = {
  state       : InitialState,
};

/**
 * @function    reinitializeRoundStats
 * @description reset the round's details, the screen and prepare the caller for a new round.
 * 
 * @param {Options} options option={ state: InitialState }.
 * 
 * @returns {Promise<void>} voided Promise object.
 * 
 * @processing reinitializes all round's statistic. but the delay between the
 * calls. This last one is stored temporary to be restored after te reinit.
 */

const reinitializeRoundStats = async (options = Options) => {
  return new Promise(resolve => {

    const { state } = options;
    const Round     = state.round;
  
    // the last delay settled by user has to be kept.
    const delayCalls = Round.delayCalls;
  
    Round.ballsCalled       = [];                     // List of balls called during the round.
    Round.callerPosition    = 0;                      // Store the next ball's position in the calling list.
    Round.dateTimeEnd       = '';                     // Timestamp round ended (text format).
    Round.dateTimeStart     = '';                     // Timestamp round started (text format).
    Round.delayCalls        = delayCalls;             // Interval between calls.
    Round.header            = ROUND_HEADERS.next;     // Header of the Round's details box
    Round.paused            = 0;                      // Amount of time game was paused.
    Round.roundID           = '';                     // Round's unique ID.
    Round.shuffledBalls     = [];                     // Shuffled list of balls.
    Round.timeElapsed       = '0:00';                 // To display the time elapsed
    Round.timestampStart    = 0;                      // Timestamp round started (Date.Now()).
    Round.timestampEnd      = '';                     // Timestamp round ended (Date.Now()).
    Round.totalTime         = 0;                      // Total time of the round (in seconds/mseconds).
    Round.wayEnded          = '';                     // Way the round was ended.

    resolve();
  });
}

export default reinitializeRoundStats;