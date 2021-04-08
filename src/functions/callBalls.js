/**
 * @module        callBalls
 * @file          callballs.js
 * @fileoverview  contains the functions and subroutines to call the Bingo balls.
 * @description   CAN NOT BE USER FOR NOW SINCE IT UPDATES THE STATE DIRECTLY.
 * 
 * @exports callBalls
 */

// All custom modules are declared at the top.
import { ALL_BALLS, ENDING_STATE } from "../objects/Constants";
import InitialState from "../objects/State";

/**
 * @constant    Options
 * @description used to define callBalls parameters.
 */
const Options = {
  state : InitialState,
};

/**
 * @method      callBalls
 * @description calls the Bingo balls.
 * 
 * @processing displays a count down of 3 seconds, then calls the numbers from
 * the previously shuffled list; delaying the calls depending on the delay
 * settled. The numbers are called in order, from the beginning to the end of
 * the list. The method also updates the list of called balls, and the Bingo
 * card with a hit mark on the number called. The method stops the timer by
 * itslef when all numbers are called. Then and only then the ending way changes
 * for 'ALL BALLS CALLED'.
 * 
 * @todo 3 seconds countdown.
 */
const callBalls = (options = Options) => {

  const M           = options.state;
  
  const Round       = M.round;
  const Interval    = Round.delayCalls * 1000; // The timer uses milliseconds.
  const EndOfList   = ALL_BALLS.length - 1;
  
  return setInterval(() => {
    let pos = M.pauseDetails.pos;
    
    const Num = Round.shuffledBalls[pos];
    Round.ballsCalled.unshift(Num);
    this.updateCard({ State: M, Num: Num });
    
    if (pos === EndOfList) {
      Round.wayEnded = ENDING_STATE.noMoreBalls;
      this.endRound();
    }
    else {
      /* pos++; */
      M.pauseDetails.pos++;
      this.setState({ M });
    }
  }, Interval);
};

export default callBalls;