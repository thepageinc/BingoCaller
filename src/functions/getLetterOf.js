
/**
 * @function    getLetterOf
 * @description returns the letter a Bingo number is attached to
 * .
 * @param {number} number the number.
 * 
 * @returns {string} B, I, N, G or O.
 * 
 * @processing returns B if number is from 1 to 50, I if from 16 to 30,
 * N if from 31 to 45, G if from 46 to 60 and O if from 61 to 75. Throws an
 * error if number passed in is out of range.
 * 
 * @throws 'invalid bingo number!'
 * 
 */

const INVALID_NUMBER = 'invalid bingo number!';

const getLetterOf = (number) => {
  let letter  = '';

  switch (true) {
    case number >=1 && number <=15:
      letter = 'B';
      break;
  
    case number >=16 && number <=30:
      letter  = 'I';
      break;

    case number >=31 && number <=45:
      letter  = 'N';
      break;

    case number >=46 && number <=60:
      letter  = 'G';
      break;

    case number >=61 && number <=75:
      letter  = 'O';
      break;

    default:
      throw new Error(INVALID_NUMBER)
  }

  return letter;
};

export default getLetterOf;