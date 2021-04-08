/**
 * CANCEL     : Ends the round and reinitializes the screen, logs the round with
 *              status canceled (not compiled in the user's official stats).
 * END ROUND  : Ends the round, displays stats of the round and logsthe round as
 *              ENDED BY USER (compiled in user's official stats).
 * GO         : starts a new round.
 * PAUSE      : Pauses the round.
 * RESET      : Reinitialize the playground for a new round.
 * 
 * @todo  use startCaller.js file for the Bingo caller.
 * 
 */

// All custom objects are imported at the top.
import {  ALL_BALLS, 
          CALLER_DELAY, 
          ERROR, ENDING_STATE, 
          ROUND_HEADERS, ROUND_STATUS } from '../objects/Constants';

import InitialState   from '../objects/State';

import { Component }  from 'react';
import uuid           from 'react-uuid';


// All components are loaded at the top of the module.
import Ball           from './Ball';
import CardTemplate   from './CardTemplate';

// All custom modules are loaded at the top of the module.
import GetDate        from '../modules/DateTime';

// All custom functions are loaded at the top of the module.
import getLetterOf            from '../functions/getLetterOf';
import reinitializeCard       from '../functions/reinitializeCard';
import reinitializeRoundStats from '../functions/reinitializeRoundStats';
import setButtons             from '../functions/setButtons';
import shuffleBalls           from '../functions/shuffleBalls';

import './BingoCaller.css';

let CallerTimer = null;

const updateCardOptions = {
  num   : 0,
  state : InitialState
};

/**
 * @class     BingoCaller
 * @classdesc Bingo main screen.
 * 
 * @description by calling this component, you call the Bingo Caller App.
 */
class BingoCaller extends Component {
  state                   = InitialState
  reinitializeRoundStats  = reinitializeRoundStats;
  reinitializeCard        = reinitializeCard;
  setButtons              = setButtons;
  shuffleBalls            = shuffleBalls;

  /**
   * @event       cancelRound
   * @description cancel an active round.
   * 
   * @processing kills the game time and caller's delay timers. also
   * reinitializes all datas, preparing the process to settle a new round.
   * 
   */
  cancelRound = () => {
    this.stopCaller();
    this.resetRound();
  }

  /**
   * @method      endRound
   * @description ends a round.
   * 
   * @param {Event} [ev] used when triggered by component's event.
   * 
   * @processing starts by displaying a confirmation splash window and pausing
   * all round's elements until confirmation. If ending round is not confirmed
   * the round continues as it should. Otherwise, timer is stopped, round's
   * stats are compiled and logged. The RESET, DROP DELAY and RAISE DELAY
   * buttons are enabled, the PAUSE, END ROUND and CANCEL buttons are all 
   * disabled. The way of ending the round is set to 'BY USER', the header of
   * the round's details box changes for 'LAST ROUND'. The round status is 
   * switched to 'NO ROUND IN PLAY' For the logging, a text and numeric 
   * timestamps are retrieved and stored into the round's details.
   * 
   * Compute : total time of the round : timestamp ended - timstamp started. The
   * result is in milliseconds.
   * 
   * @todo update code to use with `setButtons();`
   * @todo logging.
   */
  endRound = ev => {

    const M = { ...this.state };
    const R = M.round;

    M.isDisabled.dropDelay   = false;
    M.isDisabled.endRound    = true;
    M.isDisabled.pause       = true;
    M.isDisabled.raiseDelay  = false;
    M.isDisabled.reset       = false;

    R.header        = ROUND_HEADERS.last;
    R.dateTimeEnd   = GetDate.getShort();
    R.status        = ROUND_STATUS.noRound;
    R.timestampEnd  = Date.now();
    R.totalTime     = (R.timestampEnd - R.timestampStart)
    
    if (ev) 
      R.wayEnded      = ENDING_STATE.byUser;

    this.stopCaller();

    this.setState({ M });
    // add logging here //
  }

  /**
   * @event       goContinue
   * @description prepares a new bingo round OR continues a paused game.
   * 
   * @returns {void}
   * 
   * @processing two roles : first, prepares and starts a new round and second,
   * continue a paused round. When new round, it retrieves a unique id to assign
   * it to the round, retrieves the shuffled list of numbers and tmporary stores
   * all details of the round. Finally, the Bingo caller is started.
   * 
   * To log : round number, timestamp, round time, shuffled balls list, balls called,
   * 
   * @todo Continue paused round.
   * @todo Round's storing and logging.
   * 
   */
  goContinue = () => {
    const M           = { ...this.state };
    const Round       = M.round;
    
    
    if (Round.status !== ROUND_STATUS.paused) {
      this.shuffleBalls({ state: M });
      Round.dateTimeStart    = GetDate.getShort()
      Round.roundID          = uuid();
      Round.timestampStart   = Date.now();
    }
    
    Round.header = ROUND_HEADERS.nowPlaying;
    Round.status = ROUND_STATUS.active;
    
    this.setButtons({ state: M });

    if (!this.startCaller())
      throw new Error(ERROR.startCallerDoesNotReturnTrue);

    this.setState({ M });
  }

  /**
   * @method      log
   * @description logs the round's stats in a ?.
   * 
   * @returns 0 if success, throw in case of error.
   * 
   * @processing ...
   * 
   * @todo everything!
   */
  log = () => {

  }

  /**
   * @event       pauseRound
   * @description pause the active round.
   * 
   * @processing stop the Bingo caller's timer and increment the pause counter
   * of 1.  Also, changes the status of the round for PAUSED, disables the PAUSE
   * button and enables the GO button.
   */
  pauseRound = () => {
    const M = { ...this.state };

    this.stopCaller();
    M.round.paused++;
    M.round.status = ROUND_STATUS.paused
    this.setButtons({ state: M });

    this.setState({ M });
  }

  /**
   * 
   * @param {Event} ev event triggered
   * 
   * @processing starts by computing the new delay. When delay goes out of range
   * the update is canceled. When reaching minimum delay allowed the drop delay
   * button is disabled. When reaching the maximum the raise delay button is
   * disabled. In all cases of raise, the drop delay button is enabled and in
   * all cases of drop, the raise delay button is enabled.
   */
  raiseDropDelay = ev => {
    const ModState    = { ...this.state };
    const ActualDelay = ModState.round.delayCalls;
    let   newDelay    = 0;

    switch(ev.target.id) {
      case 'dropDelay':
        newDelay = ActualDelay - CALLER_DELAY.skip;

        if (newDelay <= CALLER_DELAY.min) {
          ModState.isDisabled.dropDelay = true;
        }
        
        ModState.isDisabled.raiseDelay = false;
        ModState.round.delayCalls = newDelay;
        
        break;

      default:
        // By default we raise the time
        newDelay = ActualDelay + CALLER_DELAY.skip;

        if (newDelay >= CALLER_DELAY.max) {
          ModState.isDisabled.raiseDelay = true;
        }

        ModState.isDisabled.dropDelay  = false;
        ModState.round.delayCalls   = newDelay;
        break;
    }
    this.setState({ ModState });
  }

  /**
   * @method      resetRound
   * @summary     resets the round.
   * @description called by the RESET and the CANCEL buttons.
   * 
   * @param {Event} ev triggered event.
   * 
   * @processing Enables the GO button and disables the RESET button. Then,
   * reinitializes all round property's properties and
   * reinitializes the caller's Bingo card to its initial state. Bydoing so the screen updates automatically.
   * 
   */
  resetRound = () => {
    const M = { ...this.state };

    this.reinitializeRoundStats({ state: M });
    this.reinitializeCard({ state: M });
    this.setButtons({ state: M });
    this.setState({ M })
  }
  
  /**
   * @method      startCaller
   * @description starts the Bingo caller.
   * 
   * @returns {boolean} true if the Bingo caller starts with success.
   * 
   * @processing displays a count down of 3 seconds, then calls the numbers from
   * the previously shuffled list; delaying the calls as per delay settled by
   * user. The numbers are called in order, from the beginning to the end of the
   * list. The method also updates the list of called balls, the Bingo card
   * with a hit mark on the number called and the time elapsed. The method stops
   * by itslef when all numbers are called. In this last case, the status
   * 'ALL BALLS CALLED' is assigned as the reason the round ended.
   * 
   * @todo 3 seconds countdown.
   */
  startCaller = () => {
    const M         = { ...this.state };
    const Round     = M.round;
    const Interval  = Round.delayCalls * 1000; // The timer uses milliseconds.
    const EndOfList = ALL_BALLS.length - 1;
    let   pos       = -1;

    
    CallerTimer = setInterval(() => {
      pos       = Round.callerPosition;
      const Num = Round.shuffledBalls[pos];

      Round.ballsCalled.push(Num);
      this.updateCard({ State: M, Num: Num });
      
      if (pos === EndOfList) {
        Round.wayEnded = ENDING_STATE.noMoreBalls;
        this.endRound();
      }
      else {
        Round.callerPosition++;
        this.setState({ M });
      }
    }, Interval);

    return true;
  }

  /**
   * @method      stopCaller
   * @description stops the Bingo caller.
   * 
   * @returns {void}
   * 
   * @processing kills the Bingo caller's timer.
   */
  stopCaller = () => {
    clearInterval(CallerTimer);
    CallerTimer = null;
  }

  /**
   * @method      updateCard
   * @description updates the bingo card with mark on the number called.
   * 
   * @processing finds the number called in the list and adds a hit mark to it.
   * 
   * @returns {void}
   */
  updateCard = (options = updateCardOptions) => {
    const { State, Num } = options
    
    let Card = State.card;
    let pos = Card.findIndex(number => number.num === Num);

    Card[pos].hit = true;
  }

  render() {
    const State           = { ...this.state };
    const BallsCalled     = State.round.ballsCalled;
    const cancelDisabled  = State.isDisabled.cancel;
    const DelayCalls      = State.round.delayCalls;
    const DropDisabled    = State.isDisabled.dropDelay;
    const GoDisabled      = State.isDisabled.go;
    const RaiseDisabled   = State.isDisabled.raiseDelay;
    const RoundID         = State.round.roundID;
    const RoundHeader     = State.round.header;
    const TimeStarted     = State.round.dateTimeStart;
    const TimeElapsed     = State.round.timeElapsed;
    const TimeEnded       = State.round.dateTimeEnd;
    const TotalBalls      = ALL_BALLS.length;
    const TotalBallCalled = BallsCalled.length;
    
    // The amount of balls left to call is computed with :
    // total amount of balls to call - total amount of balls called.
    const BallsLeft   = TotalBalls - TotalBallCalled;
    
    const RoundTime   = TotalBalls * DelayCalls;
    let   ballsCalled = [];
    let   lastBall    = '';
    let   lastNumber  = 0;

    //////////////////////////////////////////////
    // TO REVIEW
    //////////////////////////////////////////////
    if (TotalBallCalled > 0) {
      lastNumber  = BallsCalled[BallsCalled.length-1];
      lastBall    = getLetterOf(lastNumber) + String(lastNumber);
    }
    
    BallsCalled.forEach(item => ballsCalled.push(<Ball key={item} number={item} />));
    //////////////////////////////////////////////
    //////////////////////////////////////////////

    return (
      <div className='Container'>
        <div className='Content'>
          <h3>BINGO CALLER</h3>
              
          <div id="BingoPlayground">
            <div id="RoundDetails">
              <h5>{RoundHeader}</h5>
              <p>Round id         : {RoundID} </p>
              <p>Time started     : {TimeStarted}</p>
              <p>Time ended       : {TimeEnded}</p>
              <p>Time elapsed     : {TimeElapsed}</p>
              <p>Ball left        : {BallsLeft}/{TotalBalls}</p>
              <p>Last ball drawn  : {lastBall}</p>
            </div>

            <div id="RoundOptions">
              <h5>options</h5>
              <p>Delay between calls (in seconds)</p>
              <button 
                id        = "raiseDelay"
                className = "DelayButton"
                onClick   = {this.raiseDropDelay}
                disabled  = {RaiseDisabled}
                >
                  &#9650;
              </button>
                  
              <input
                type      = "text"
                className = "DelayBox"
                value     = {DelayCalls}
                readOnly={true} />

              <button 
                id        = "dropDelay"
                className = "DelayButton"
                onClick   = {this.raiseDropDelay}
                disabled  = {DropDisabled}
                >&#9660;
              </button>

              <p>Eastimated round time : ~{RoundTime} seconds.</p>

              <button 
                id        = "cmdGO"
                className = "ActionButton"
                disabled  = {GoDisabled}
                onClick   = {this.goContinue}
                >
                  GO
              </button>
              <button 
                id        = "cmdRESET"
                className = "ActionButton"
                disabled  = {State.isDisabled.reset}
                onClick   = {this.resetRound}
                >
                  RESET
              </button>
              <button 
                id        ="cmdPAUSE"
                className = "CancelButton"
                disabled  = {State.isDisabled.pause}
                onClick   = {this.pauseRound}
                >
                  PAUSE
              </button>
              <button 
                id        = "cmdSTOP"
                className = "CancelButton"
                disabled  = {State.isDisabled.endRound}
                onClick   = {this.endRound}
                >
                  END ROUND
              </button>
              
              <button 
                id        = "cmdCANCEL"
                className = "CancelButton"
                disabled  = {cancelDisabled}
                onClick   = {this.cancelRound}
                >
                  CANCEL
              </button>
            </div>

            <div id="DrawnNumbers">
              {ballsCalled}
            </div>

            <CardTemplate bingoCard={State.card} />
                
          </div>
        </div>
      </div>
    );
  }
}

export {
  BingoCaller as default,
  CALLER_DELAY,
  InitialState, 
  ROUND_HEADERS, ROUND_STATUS
}