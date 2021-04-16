import React, { Fragment } from 'react';

import getLetterOf from '../functions/getLetterOf';

import './Ball.css';

const Ball = (props) => {
  const { number, id } = props;

  let bgcolor = '';
  let letter  = getLetterOf(number);

  switch (true) {
    case number >=1 && number <=15:
      bgcolor = '#FF4800'; 
      break;
  
    case number >=16 && number <=30:
      bgcolor = '#F00';
      break;

    case number >=31 && number <=45:
      bgcolor = '#000099';
      break;

    case number >=46 && number <=60:
      bgcolor = '#FF0';
      break;

    case number >=61 && number <=75:
      bgcolor = '#0FF';
      break;

    default:
      throw new Error('invalid ball number!')
  }
  
  return (
    <Fragment>

    <div className="Ball" key={id} style={{ backgroundColor: bgcolor }}>
      <div className="BallCenter">
        <p>
          <small>{letter}</small>
        </p>
        <p>
        {number}
        </p>
      </div>
    </div>
    </Fragment>
  );
}

export default Ball;