import Purify from 'dompurify';

/**
 * @function    CardTemplate
 * @description Empty bingo card template.
 * 
 * @param {any} porps JSX props object.
 * 
 * @returns {JSX.Element} a Bingo Card as JSX element.
 * 
 * @processing generates the bingo caller card and marks numbers drawn if
 * applies. For this to happen, the card is generated from the state's 'card'
 * property, updated previously by the updateCard() method located in the
 * BingoCaller class. 
 */
const CardTemplate = (props) => {
  // All scope's constants and variables are declared at the top, BUT
  // constants and variables used with for..next loops.
  const Card      = props.bingoCard;
  let   HTMLCard  = '';

  for (const number of Card) {
    if (number.num <= 15) {
      if (number.num === 1) HTMLCard += '<div id="Col"><div id="ColTitle">B</div>';

      if (!number.hit) 
        HTMLCard += '<div id="HitBox">' + number.num + '</div>';
      else
        HTMLCard += '<div id="HitBox"><div id="HitMark">' + number.num + '</div></div>';

      if (number.num === 15) {HTMLCard += '</div>';}

    } else if (number.num <= 30) {
      if (number.num === 16) HTMLCard += '<div id="Col"><div id="ColTitle">I</div>';

      if (!number.hit) 
        HTMLCard += '<div id="HitBox">' + number.num + '</div>';
      else
        HTMLCard += '<div id="HitBox"><div id="HitMark">' + number.num + '</div></div>';

      if (number.num === 30) HTMLCard += '</div>';

    } else if (number.num <= 45) {
      if (number.num === 31) HTMLCard += '<div id="Col"><div id="ColTitle">N</div>';

      if (!number.hit) 
        HTMLCard += '<div id="HitBox">' + number.num + '</div>';
      else
        HTMLCard += '<div id="HitBox"><div id="HitMark">' + number.num + '</div></div>';

      if (number.num === 45) HTMLCard += '</div>';
    } else if (number.num <= 60) {
      if (number.num === 46) HTMLCard += '<div id="Col"><div id="ColTitle">G</div>';

      if (!number.hit) 
        HTMLCard += '<div id="HitBox">' + number.num + '</div>';
      else
        HTMLCard += '<div id="HitBox"><div id="HitMark">' + number.num + '</div></div>';

      if (number.num === 60) HTMLCard += '</div>';

    } else if (number.num <= 75) {
      if (number.num === 61) HTMLCard += '<div id="Col"><div id="ColTitle">O</div>';

      if (!number.hit) 
        HTMLCard += '<div id="HitBox">' + number.num + '</div>';
      else
        HTMLCard += '<div id="HitBox"><div id="HitMark">' + number.num + '</div></div>';

      if (number.num === 75) HTMLCard += '</div>';

    }

  }
  Purify.sanitize(HTMLCard);
  
  return (
    <div className="BingoCard">
      <div dangerouslySetInnerHTML={ { __html: HTMLCard } }></div>
    </div>
  );
    
}

export default CardTemplate;