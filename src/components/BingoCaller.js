/**
 * @module        BingoCaller
 * @file          BingoCaller.js
 * @fileoverview  Bingo caller's main screen component.
 * @description   by calling the BingoCaller component, the entire Bingo caller app starts.
 * 
 * @exports BingoCaller
 * 
 * @todo Text-to-Speech (in progress, need more voices options).
 * @todo URGENT - the page's styling.. the Bingo Card's page's styling, not mine.. *sigh*
 * @todo 3 seconds countdown before starting the round.
 * @todo a BETTER pop-up confirmation to end/cancel a round.
 * @todo #B4D001 - review called ball display.
 * @todo #B4D002 - rescript so changeDelay() uses setDelayButtons() from setButtons.js module.
 * @todo #B4D003 - better way I'm sure!
 * @todo #B4D004 - could be better... using an event which will trigger after change in this box to set the drop and raise buttons.
 * @todo #B4D005 - Switch to use classes instead of ids.
 * @todo #B4D006 - same as #B4D003
 * @todo #B4D007 - in BingoCaller.css
 * @todo #B4D008 - in container.css
 * @todo separate methods/functions from component, keeps only updating state's functions in component's class.
 * @todo logging (very last).
 */

// All custom objects and constants are imported at the top.
import {  ACTION, ALL_BALLS, 
          ENDING_STATE, 
          ROUND_HEADERS } from '../objects/Constants';

import InitialState   from '../objects/State';

import { Component }  from 'react';
import uuid           from 'react-uuid';
import spoken         from 'spoken/build/spoken';

// All components are loaded at the top of the module.
import Ball           from './Ball';
import CardTemplate   from './CardTemplate';

// All custom modules are loaded at the top of the module.
import GetDate        from '../modules/DateTime';

// All custom functions are loaded at the top of the module.
import changeDelay            from '../functions/changeDelay';
import getLetterOf            from '../functions/getLetterOf';
import reinitializeCard       from '../functions/reinitializeCard';
import reinitializeRoundStats from '../functions/reinitializeRoundStats';
import setButtons             from '../functions/setButtons';
import shuffleBalls           from '../functions/shuffleBalls';
import updateCard             from '../functions/updateCard';

import './BingoCaller.css';

let CallerTimer   = undefined;

/** @description used also as key to validate if a round is active.  */
let ElapsedTimer  = undefined;


/**
 * @class     BingoCaller
 * @classdesc Bingo main screen.
 * 
 * @description by calling this component, you call the Bingo Caller App.
 */
class BingoCaller extends Component {
  state                   = InitialState
  changeDelay             = changeDelay;
  reinitializeRoundStats  = reinitializeRoundStats;
  reinitializeCard        = reinitializeCard;
  setButtons              = setButtons;
  shuffleBalls            = shuffleBalls;
  updateCard              = updateCard;

  /**
   * @async
   * @event       cancelRound
   * @summary     handles the CANCEL button.
   * @description cancel an active round.
   * 
   * @return {Promise<void>} voided Promise object.
   * 
   * @processing sets the state's last action to 'CANCEL', terminates the round
   * and resets the round's statistics; making the app ready for a new round.
   * 
   */
  butCancel = async () => {
    return new Promise(async resolve => {
      const sState = { ...this.state };

      // confirmation popup only if a round is active.
      if (this.isRoundActive())
        if (!window.confirm('Are you sur you want to cancel?'))
          return resolve();
  
      sState.lastAction = ACTION.cancel;
  
      await this.terminateRound({ state: sState });
      await this.resetRound({ state: sState });
  
      this.setState(sState);

      resolve();
    });
  }

  /**
   * @async
   * @event       butEndRound
   * @summary     handles the END ROUND button.
   * @description ends a round after confirmation.
   * 
   * @returns {Promise<void>} voided Promise object.
   * 
   * @processing starts by displaying a confirmation pop-up. If ending the round
   * is confirmed : the last action property is set to 'END', the round's ending
   * way is set to 'END BY USER', and the round is terminated, waiting for
   * another action from the user.
   * 
   * @todo pop-up for confirmation.
   * 
   */
  butEndRound = async () => {
    return new Promise (async resolve => {
      const sState  = { ...this.state };
      const Round   = sState.round;
      
      sState.lastAction = ACTION.end;
      Round.wayEnded    = ENDING_STATE.byUser;
      
      await this.terminateRound({ state: sState });
  
      this.setState(sState);

      resolve();
    });
  }

  /**
   * @async
   * @event       butGo
   * @summary     handles the GO button.
   * @description starts a new round or continues an exisitng round.
   * 
   * @returns {Promise<void>} voided Promise object.
   * 
   * @processing the first step will be to find out if it's a new round or a
   * paused round to continue. In case of a new round, numbers are shuffled, the
   * timestamps are retrieved, a unique id is assigned to the round, the header
   * of the round's details box is changed to 'NOW PLAYING', the round's status
   * is changed for 'NOW PLAYING', caller and round's timer are started.
   * 
   */
  butGo = () => {
    return new Promise(async resolve => {
      const sState  = { ...this.state };
      const Round   = sState.round;
      
      // Same button is used to start and restart.
      if (!this.isRoundActive()) {
        console.log('GO');
        await this.shuffleBalls({ state: sState });
        Round.dateTimeStart    = GetDate.getShort()
        Round.roundID          = uuid();
        Round.timestampStart   = Date.now();
      }
      
      sState.lastAction = ACTION.go;
      Round.header      = ROUND_HEADERS.nowPlaying;
      
      await this.setButtons({ state: sState });
      
      this.setState(sState);
  
      this.startTimers();

      resolve();
    });
  }

  /**
   * @async
   * @event       butPause
   * @description handles the PAUSE button.
   * 
   * @returns {Promise<void>} voided Promise object.
   * 
   * @processing sets the last action to 'PAUSE', stops the Bingo caller's timer
   * only and increments the pause counter of 1. Also, changes the status of the
   * round and the round's details box header for 'PAUSED' then enables/disables 
   * buttons.
   */
  butPause = async () => {
    return new Promise (async resolve => {
      const sState  = { ...this.state };
      const Round   = sState.round;
      
      sState.lastAction  = ACTION.pause;
      
      await this.stopTimers(sState.lastAction);

      Round.header  = ROUND_HEADERS.paused;
      Round.paused++;
  
      await this.setButtons({ state: sState });
      this.setState(sState);

      resolve();
    });  

  }

  /**
   * @async
   * @event       butReset
   * @description handles the RESET button.
   * 
   * @param {Event} ev triggered event.
   * 
   * @returns {Promise<void>} voided Promise object.
   * 
   * @processing sets the last action to 'RESET' then reset the round to
   * its initial state.
   * 
   */
  butReset = async () => {
    const sState = { ...this.state };

    sState.lastAction  = ACTION.reset;

    await this.resetRound({ state: sState });
    this.setState(sState)
  }
  
  /**
   * @event       butChangeDelay
   * @summary     handles the RAISE DELAY and DROP DELAY buttons.
   * @description raises or drop the delay between calls.
   * 
   * @param {Event} ev event triggered
   * 
   * @processing changes the delay and update the screen.
   */
  butChangeDelay = async ev => {
    return new Promise(async resolve => {
      const sState = { ...this.state };

      await this.changeDelay({ state: sState, target: ev.target });

      this.setState(sState);

      resolve();
    });
  }

  /**
   * @event       callerVolume
   * @description handles the caller's voice mute check box.
   * 
   * @returns {void}
   * 
   * @processing changes (reverses) the caller's voice volume configuration
   * settings to TRUE or FALSE, depending on its actual value.
   */
  callerVolume = () => this.setState(({ muteCaller }) => ({ muteCaller: !muteCaller }));

  /**
   * @method      isRoundActive
   * @description validate if a round is active.
   * 
   * @returns undefined if no active round.
   * 
   * @processing returns FALSE if the round's timer is not running.
   */
  isRoundActive = () => ElapsedTimer;

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
   * @async
   * @method      resetRound
   * @description reset the round's stats, card and buttons status to initial state.
   * 
   * @param {*} options options = { state: this.state }
   * 
   * @returns {Promise<void>} voided promise object.
   * 
   * @processing reinitializes the round's statistics, the Bingo caller's card
   * and enables/disables buttons.
   * 
   */
  resetRound = async (options = { state: this.state }) => {
    return new Promise(async resolve => {
      const sState = options.state;
  
      await this.reinitializeRoundStats({ state: sState });
      await this.reinitializeCard({ state: sState });
      await this.setButtons({ state: sState });

      resolve();

    });
  }

  /**
   * @async
   * @method      startTimers
   * @description starts the Bingo caller's timer and the round's timer.
   * 
   * @returns {Promise<void>} voided Promise object.
   * 
   * @processing displays a count down of 3 seconds, then starts 2 timers : one
   * used to call the numbers and another one to calculate the round's total
   * time. 
   * 
   * THE CALLER'S TIMER
   * ******************
   * This timer is used to call the numbers. The numbers called are the one from
   * the previously shuffled list. They are called in order, from the beginning
   * to the end of the list. The delay between the calls is the one settled by
   * the user. This timer also updates the list of called balls and the Bingo
   * card. It is important the numbers called are added from the top of the
   * called balls list. Timer stops automatically when all the numbers are
   * called. In this last case, the reason 'ALL BALLS CALLED' is assigned as the
   * reason the round ended. In case the round is paused, this timer is stopped.
   * A voice also calls the number.
   * 
   * THE ROUND'S TIMER
   * *****************
   * This timer is to calculate and display the total time elapsed during the
   * round, including pauses, in the 'm:ss' format.
   * 
   * FORMULAS
   * ********
   * Time elapsed = Timestamp now - Timestamp start / 1000.
   * minutes = floor Time elapsed / 60
   * seconds = floor Time elapsed - (minutes * 60)
   * 
   * @todo 3 seconds countdown.
   */
  startTimers = async () => {

    const EndOfList = ALL_BALLS.length - 1;
    const Interval  = this.state.round.delayCalls * 1000; // The timer uses milliseconds.
    
    if (!ElapsedTimer) {
      ElapsedTimer = setInterval(() => {

        const sState = { ...this.state };

        let   minutes = 0;
        let   seconds = 0;
        let   tE      = 0;

        // Time is converted from miliseconds to seconds upon retrieval..
        tE = (Math.floor(Date.now() - this.state.round.timestampStart) / 1000);

        // Displayed in 'm:ss' format
        minutes = Math.floor(tE / 60);
        seconds = Math.floor(tE - (minutes * 60));
       
        sState.round.timeElapsed = String(minutes) + ':' + String(seconds).padStart(2, '0');
        this.setState(sState);

      }, 1000);
    }

    CallerTimer = setInterval(async () => {
      const sState  = { ...this.state };
      
      const Round   = sState.round;
      const Muted   = sState.muteCaller;
      let   pos     = Round.callerPosition;

      
      const Num = Round.shuffledBalls[pos];

      Round.ballsCalled.push(Num);

      if (!Muted)
        spoken.say(getLetterOf(Num) + '-' + String(Num), 'Google UK English Male');

      await this.updateCard({ State: sState, Num: Num });

      if (pos === EndOfList) {
        sState.lastAction = ACTION.end;
        Round.wayEnded    = ENDING_STATE.noMoreBalls;
        await this.terminateRound({ state: sState });
        
      } else {
        Round.callerPosition++;
      }
      
      this.setState(sState);

    }, Interval);
    
  }

  /**
   * @async
   * @method      stopTimers
   * @description stops the timers.
   * 
   * @param {ACTION} why reason why the timers need to be stopped (use ACTION const);
   * 
   * @returns {Promise<boolean>} resolve true if goes trought; throw in case of error.
   * 
   * @throws 'Error in stopTimers()' + error's stack.
   * 
   * @processing kills the Bingo caller's timer. Then, if the reason to stop the
   * timers is not that the game is paused, the round's timer is also stopped.
   * 
   */
  stopTimers = async (why = ACTION.end) => {
    return new Promise(resolve => {
      try {
        clearInterval(CallerTimer);
        CallerTimer = undefined;
    
        if (why !== ACTION.pause) {
          clearInterval(ElapsedTimer);
          ElapsedTimer = undefined;
        }
    
        resolve(true);

      } catch(error) {
        throw new Error('ERROR in stopTimers()', error.stack);
      }
    });
  }

  /**
   * @async
   * @method      terminateRound
   * @description terminate a round.
   * 
   * @param options options={ state: this.state }.
   * 
   * @returns {Promise<void>}
   * 
   * @processing terminating a round means : stopping all timers, retrieving
   * datas to compile the statistics of the round, compiling round's statistics,
   * changing the header of the Round's details box to 'LAST ROUND PLAYED',
   * changing the round's status for 'END' and set the disabled property of the
   * buttons.
   * 
   * Datas to retrieve : numeric timestamp, short text timestamp.
   * 
   * Stats to compile : total round time.
   * 
   * formula : total round time = timestamp end - timestamp start.
   * 
   * CAN NOT BE MOVED TO A SEPRATE MODULE (using 'this').
   * 
   */
  terminateRound = async (options = { state: this.state }) => {
    return new Promise(async resolve => {
      const sState  = options.state;
      const Round   = sState.round;
  
      // All timers need to be stopped before continuing.
      await this.stopTimers()
      
      Round.header        = ROUND_HEADERS.last;
      Round.dateTimeEnd   = GetDate.getShort();
      Round.timestampEnd  = Date.now();
      Round.totalTime     = (Round.timestampEnd - Round.timestampStart)
      
      await this.setButtons({ state: sState });
      resolve();
    });
  }

  delayChanged = ev => {
    console.log('DELAY CHANGED!');
  }

  render() {
    const sState          = this.state;
    const Round           = sState.round;
    const isDisabled      = sState.isDisabled;

    const BallsCalled     = Round.ballsCalled;
    const cancelDisabled  = isDisabled.cancel;
    const DelayCalls      = Round.delayCalls;
    const DropDisabled    = isDisabled.dropDelay;
    const GoDisabled      = isDisabled.go;
    const MuteCaller      = sState.muteCaller;
    const Paused          = Round.paused;
    const RaiseDisabled   = isDisabled.raiseDelay;
    const RoundID         = Round.roundID;
    const RoundHeader     = Round.header;
    const TimeStarted     = Round.dateTimeStart;
    const TimeElapsed     = Round.timeElapsed;
    const TimeEnded       = Round.dateTimeEnd;
    const TotalBalls      = ALL_BALLS.length;
    const TotalBallCalled = BallsCalled.length;
    
    // The amount of balls left to call is computed with :
    // total amount of balls to call - total amount of balls called.
    const BallsLeft   = TotalBalls - TotalBallCalled;
    
    const RoundTime   = Math.floor(TotalBalls * DelayCalls);
    let   ballsCalled = [];
    let   lastBall    = '';
    let   lastNumber  = 0;

    //////////////////////////////////////////////
    // #B4D001 (good results, but not happy)
    //////////////////////////////////////////////
    if (TotalBallCalled > 0) {
      lastNumber  = BallsCalled[BallsCalled.length-1];
      lastBall    = getLetterOf(lastNumber) + String(lastNumber);
    }
    
    BallsCalled.forEach(item => ballsCalled.unshift(<Ball key={item} number={item} />));
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
              <p>Time paused      : {Paused}</p>
              <p>Ball left        : {BallsLeft}/{TotalBalls}</p>
              <p>Last ball drawn  : {lastBall}</p>
            </div>

            <div id="RoundOptions">
              <h5>options</h5>
              <p>Delay between calls (in seconds)</p>
              <button 
                id        = "raiseDelay"
                className = "DelayButton"
                onClick   = {this.butChangeDelay}
                disabled  = {RaiseDisabled}
                >
                  &#9650;
              </button>
                  
              <input
                type      = "text"
                className = "DelayBox"
                value     = {DelayCalls}
                /* on???    = {this.delayChanged} #B4D004 */
                readOnly  = {true} />

              <button 
                id        = "dropDelay"
                className = "DelayButton"
                onClick   = {this.butChangeDelay}
                disabled  = {DropDisabled}
                >&#9660;
              </button>

              <p>Eastimated round time : ~{RoundTime} seconds.</p>

              <button 
                id        = "cmdGO"
                className = "ActionButton"
                disabled  = {GoDisabled}
                onClick   = {this.butGo}
                >
                  GO
              </button>

              <button 
                id        = "cmdPAUSE"
                className = "ActionButton"
                disabled  = {isDisabled.pause}
                onClick   = {this.butPause}
                >
                  PAUSE
              </button>

              <button 
                id        = "cmdSTOP"
                className = "CancelButton"
                disabled  = {isDisabled.endRound}
                onClick   = {this.butEndRound}
                >
                  END ROUND
              </button>
              <br /> {/* #B4D003 */}
              <button 
                id        = "cmdRESET"
                className = "ActionButton"
                disabled  = {isDisabled.reset}
                onClick   = {this.butReset}
                >
                  RESET
              </button>

              <button 
                id        = "cmdCANCEL"
                className = "CancelButton"
                disabled  = {cancelDisabled}
                onClick   = {this.butCancel}
                >
                  CANCEL
              </button>
              <br /> {/* #B4D006 */}
              <small>
                <label
                  htmlFor="voiceList"
                  >
                    voices
                </label>
                <select id="voiceList">
                  <option defaultChecked={true} disabled={true}>To come..</option>
                </select>

                <label 
                  htmlFor  = "muteBox"
                  style={{ marginLeft: "5px" }}
                  >
                    <small>mute caller</small>
                </label>

                <input 
                  type            = "checkbox"
                  id              = "muteBox"
                  defaultChecked  = {MuteCaller}
                  defaultValue    = "Mute"
                  onChange        = {this.callerVolume}
                  >
                </input>
              </small>
            </div>

            <div id="DrawnNumbers">
              {ballsCalled}
            </div>

            <CardTemplate bingoCard={sState.card} />
                
          </div>
        </div>
      </div>
    );
  }
}

export default BingoCaller;