
/**
 * @file        datetime.js
 * @description contains a static class to handle date and time in various ways.
 * 
 * @todo end getDate() method
 * @todo about() method
 */
////////////////////////////////////////////////////////////////////////////////
// Initializing strict mode                                                   //
// Loading configurations and settings                                        //
// Loading custom modules                                                     //
////////////////////////////////////////////////////////////////////////////////

const { 
  DATETIME_LANGUAGE,
  LOGTIMESTAMP_BRACES, LOGTIMESTAMP_SEPARATOR,
  TWELVEHOURS_FORMAT_DEFAULT, ZULU_FORMAT_DEFAULT } = require('./config');
  
// Some error handling require a custom error type.
const trapError = require('./CustomError');

//////////////////////////////////////////////////////////////////
// DATA STRUCTURE                                               //
// --------------                                               //
// The following variables are used to settle data structure of //
// class's properties.                                          //
//////////////////////////////////////////////////////////////////

const Project_Details = {
  author        : 'Cryptaryan',
  dateCreated   : '2018-11-03',
  lastUpdate    : '2021-03-02',
  collaborators : 'Jones R, caLLowCreation, coding; ',
  message       : 'Thank you for using DateTime',
  projectName   : 'DateTime',
  releaseDate   : '2021-03-DD',
  version       : '1.0.0',
  website       : ''
};

const logTimestampOptions = {
  braces  : LOGTIMESTAMP_BRACES,
  zulu    : ZULU_FORMAT_DEFAULT
};

const getTxtDateOptions = {
  type        : '',
  twelveHours : TWELVEHOURS_FORMAT_DEFAULT
};

//////////////////////////////////////////////////////
// VALIDATION                                       //
// --------------                                   //
// The following variables are used for validation. //
//////////////////////////////////////////////////////
const Date_Format_Type = 'string';

////////////////////////////////////////////////////
// ERRORS                                         //
// --------                                       //
// All errors threw by the class are listed here. //
////////////////////////////////////////////////////
const ERROR_DATE_FORMAT_INVALID_TYPE  = 'typeof format is not ' + typeof Date_Format_Type;
const ERROR_DATE_FORMAT_IS_EMPTY      = 'function requires a valid date format';
const ERROR_SCRIPT_HALTED             = 'ERROR : DateTime script halted.'
const INVALID_INPUT                   = 'IIERROR Invalid input'

const ERROR_TWELVEHOURS_INVALID_TYPE  = 'typeof twelveHours is not boolean';

/**
 * @class     DateTime
 * @classdesc handles date and time management.
 * 
 * @returns {DateTime} a ready to use DateTime class object.
 */
class DateTime {
  static timestampSeparator = LOGTIMESTAMP_SEPARATOR;
  static twelveHours        = TWELVEHOURS_FORMAT_DEFAULT;

  /**
   * @readonly
   * @static
   * @method      about()
   * @summary     returns the About DateTime informations.
   * @example     DateTime.about();
   * 
   * @returns {string} a string with the about DateTime informations..
   * 
   * @todo  Full about
   */
  static about() {
    const About = Project_Details;

    return (
      About.projectName + ' by ' + About.author + '; version ' + About.version
    );
  }

  /**
   * @readonly
   * @static
   * @method      getDate()
   * @summary     returns the date from a format provided.
   * @description validates parameters; splits year and/or month and/or and/or day establishing the order they are requested. ; compute the format requested
   * 
   * @param {string} format a string containing the date format.
   * 
   * @returns {string} a string with the date.
   * 
   * @example // Considering it's February 22nd 2021..
   * myDate = getDate('YYYY');            // returns 2021
   * myDate = getDate('DMM');             // returns 2202
   * myDate = getDate('D/M/YY');          // returns 22/2/21
   * myDate = getDate('yY/m/d');          // returns 21/2/22
   * 
   * YYYY : Year 4 digits format  (ex : 2021)
   * YYY  : Year 3 digits format  (ex : 021)
   * YY   : Year 2 digits format  (ex : 21)
   * MM   : Month 2 digits format (ex : 02)
   * M    : Month 1 or 2 digits   (ex : 2)
   * DD   : Day 2 digits format
   * D    : Day 1 or 2 digits
   * 
   * To come..
   * MMMM : Month long text format
   * MMM  : Month short text format
   * 
   */
  static getDate(format = '') {
    return this.getDateTime(format);
  }

  /**
   * @method      getTime
   * @summary     returns the time as per format provided.
   * @description ...
   * 
   * @param {string} format a srting containing the time format.
   * 
   * @returns {string} a string containing the time.
   * 
   * @example Considering it is 7:45:01 PM
   * 
   * myTime = getTime('HH:mm:ss');     // returns 
   * myTime = getTime('H:mm:s');       // returns 
   * 
   * HH   : Hour 2 digits format
   * H    : Hour 1 or 2 digits format
   * mm   : Minutes 2 digits format
   * m    : Minutes 1 or 2 digits format
   * ss   : seconds 2 digits format
   * s    : seconds 1 or 2 digits format
   * ms   : milliseconds 1, 2 or 3 digits format
   * 
   * To come..
   * mss  : milliseconds 3 digits format
   * MMMM : Month long text format
   * MMM  : Month short text format
   */
  static getTime(format = '') {
    return this.getDateTime(format);
  }

  /**
   * @readonly
   * @static
   * @method      getDateTime()
   * @summary     returns the date and time from a format provided.
   * @description validates parameters; splits year and/or month and/or and/or day establishing the order they are requested. ; compute the format requested
   * 
   * @param {string} format a string containing the date format.
   * 
   * @returns {string} a string with the date.
   * 
   * @throws ERROR_DATE_FORMAT_IS_EMPTY
   * @throws ERROR_DATE_FORMAT_IS_INVALID
   * @throws ERROR_DATE_FORMAT_INVALID_TYPE
   * 
   * @example // Considering it's February 22nd 2021..
   * myTime = getTime('Y');            // returns 
   * myTime = getTime('');             // returns 
   * myTime = getTime('/YY');          // returns 
   * myTime = getTime('m/d');          // returns 
   * 
   * HH   : Hour 2 digits format
   * H    : Hour 1 or 2 digits format
   * mm   : Minutes 2 digits format
   * m    : Minutes 1 or 2 digits format
   * ss   : seconds 2 digits format
   * s    : seconds 1 or 2 digits format
   * 
   * Also..
   * 
   * YYYY : Year 4 digits format  (ex : 2021)
   * YYY  : Year 3 digits format  (ex : 021)
   * YY   : Year 2 digits format  (ex : 21)
   * MM   : Month 2 digits format (ex : 02)
   * M    : Month 1 or 2 digits   (ex : 2)
   * DD   : Day 2 digits format
   * D    : Day 1 or 2 digits
   * 
   * To come..
   * ms   : milliseconds 1, 2 or 3 digits format
   * mss  : milliseconds 3 digits format
   * MMMM : Month long text format
   * MMM  : Month short text format
   * 
   * @todo  continue rethinking the pseudocode and rescript the method.
   */
  static getDateTime(format = '') {
    // All local variables are declared at the top of the method.
    //const twelveHours = this.twelveHours // Eventually a parameter..
    let   retDate     = new Date();

    //////////////////////////////////////////
    // PARAMETER VALIDATION                 //
    // Function requires a valid parameter. //
    //////////////////////////////////////////
  
    // format
    //  can only be a typeof Date_Format_Type ; throw IIERROR
    //  can not begin/end with empty spaces   ; removed in processing
    //  can not be empty                      ; throw IIERROR
    //  at least 1 char and max 10 char       ; throw IIERROR

    try {

      if (typeof format !== typeof Date_Format_Type) // Yes! My typeof validation :P
        throw new trapError(INVALID_INPUT, ERROR_DATE_FORMAT_INVALID_TYPE + ' in getDateTime() method.');
      
      format = format.trim();
  
      if (!format.length)
        throw new trapError(INVALID_INPUT, ERROR_DATE_FORMAT_IS_EMPTY + ' in getDateTime() method.');
  
    } catch(error) {
      console.error(error.name, error.message);
      console.error(error.stack);
    }

    return  format.replace('YYYY',  retDate.getFullYear().toString())
                  .replace('YYY',   retDate.getFullYear().toString().substr(1))
                  .replace('YY',    retDate.getFullYear().toString().substr(2))
                  .replace('MM',    (retDate.getMonth() + 1).toString().padStart('2', '0'))
                  .replace('M',     (retDate.getMonth() + 1).toString())
                  .replace('DD',    retDate.getDate().toString().padStart(2, '0'))
                  .replace('D',     retDate.getDate().toString())
                  .replace('HH',    retDate.getHours().toString().padStart(2, '0'))
                  .replace('H',     retDate.getDate().toString())
                  .replace('mm',    retDate.getMinutes().toString().padStart(2, '0'))
                  .replace('ms',    retDate.getMilliseconds().toString().padEnd(3, '0'))
                  .replace('m',     retDate.getMinutes().toString())
                  .replace('ss',    retDate.getSeconds().toString().padStart(2, '0'))
                  .replace('s',     retDate.getSeconds().toString());

                  // These can not be used in March.. the M of March changes for a 3
                  //.replace('MMMM',  retDate.toLocaleString(DATETIME_LANGUAGE, { month: 'long', timeZone: 'UTC' }))
                  //.replace('MMM',   retDate.toLocaleString(DATETIME_LANGUAGE, { month: 'short', timeZone: 'UTC' }))
  }

  /**
   * @static
   * @method      getLogTimestamp
   * @summary     returns a text Timestamp.
   * @description Retrieves the date and time and make them a timestamp in text format; Timestamp is in UTC to avoid conflicts.
   * 
   * @param {boolean} [zulu]    true = Zulu format; false = standard text (default : false)
   * @param {string}  [barces]  a 2 characters string used as barces for the timestamp.
   * 
   * @returns {string} a string containing a UTC timestamp.
   * 
   * @example getLogTimestamp(); getLogTimestamp(true); getLogTimestamp(false, '[]');
   * 
   * @throws ERROR_SCRIPT_HALTED
   * 
   */
  static getLogTimestamp(options = logTimestampOptions) {
   
    const { braces, zulu } = options;
    
    // All local variables are declared at the top of the method.
    let timeOptions = {};
    let separator   = this.timestampSeparator;
    let tmpDate     = [];
    

    //let braces  = options.braces
    //let zulu    = options.zulu;

    if (zulu) {
      tmpDate = new Date().toISOString();

    if (braces && braces.length === 2)
      return (braces[0] + tmpDate + braces[1]);
    else
      return (tmpDate);
    }

    // The date and time options are sent in an object.
    timeOptions = {
      year          : 'numeric',
      month         : '2-digit',
      day           : '2-digit',
      hour          : '2-digit',
      minute        : '2-digit',
      second        : '2-digit',
      timeZone      : 'UTC',
    };

    try {
      tmpDate = new Date().toLocaleString(DATETIME_LANGUAGE, timeOptions)
      .replace(/,/gi , "")
      .split(/ +/);

    } catch(error) {
      console.error(error.stack);
      throw new Error(ERROR_SCRIPT_HALTED);
    }
    if (braces && braces.length === 2)
      return (braces[0] + tmpDate[0] + separator + tmpDate[1] + braces[1]);
    else
      return (tmpDate[0] + separator + tmpDate[1]);

  }

  /**
   * @readonly
   * @static
   * @method      getLong
   * @summary     retrieves and returns the date and time, long text format.
   * @description this method validates the parameter received, and returns the date and time, long text format, in a 12 or 24 hours format.
   * 
   * @param {boolean} [twelveHours=this.twelveHours] 12 hours format true or false (default : false, 24h).
   * 
   * @returns {string}  a string containing the date and time long format; undefined on error.
   * @example // Sunday, February 21st 2021, 17:21:20 - Sunday, February 21st 2021, 05:21:20PM
   * 
   * @throws ERROR_TWELVEHOURS_INVALID_TYPE
   * @throws ERROR_SCRIPT_HALTED
   */
  static getLong(twelveHours = this.twelveHours) {
    try {
      if (!validateTwelveHours(twelveHours))
        throw new TypeError(ERROR_TWELVEHOURS_INVALID_TYPE + ' in getLong() method');
    } catch(error) {
      console.error(error.stack);
      throw new Error(ERROR_SCRIPT_HALTED);
    }
    
    return getTxtDate({ type: 'long', twelveHours: twelveHours });
  }

  /**
   * @readonly
   * @static
   * @method      getShort
   * @summary     retrieves and returns date and time, short text format.
   * @description this method validates the parameter received and returns the date and time, short text format, in a 12 or 24 hours format, retrieved from getTxtDate() local function.
   * 
   * @param {boolean} [twelveHours=this.twelveHours] 12 hours format true or false (default : false, 24h).
   * 
   * @returns {string}  a string containing the date and time short format; undefined on error.
   * @example // Sun., Feb. 21st 2021, 17:21:20 - Sun., Feb. 21st 2021, 05:21:20PM
   * 
   * @throws ERROR_TWELVEHOURS_INVALID_TYPE
   * @throws ERROR_SCRIPT_HALTED
   */
  static getShort(twelveHours = this.twelveHours) {
    try {
      if (!validateTwelveHours(twelveHours))
        throw new TypeError(ERROR_TWELVEHOURS_INVALID_TYPE + ' in getLong() method');
    } catch(error) {
      console.error(error.stack);
      throw new Error(ERROR_SCRIPT_HALTED);
    }
    
    return getTxtDate({ type: 'short', twelveHours: twelveHours });
  }

}

/**
 * @function    getTxtDate
 * @memberof    DateTime EXCLUSIVE
 * @summary     retrieves and returns the local date and time.
 * @description retrieves 12 or 24 hours format date and time; split time from date; complete abreviations; add suffix 'st', 'nd', 'rd' or 'th' to date; computes date and time to return; returns date and time of long or short text format.
 * 
 * @param {string}  type          long, short.
 * @param {boolean} twelveHours   true = 12 hours; false = 24 hours.
 * 
 * @returns {string} a string with the date or an error message.
 * 
 */
function getTxtDate (options = getTxtDateOptions) {
//function getTxtDate (type, twelveHours = DateTime.twelveHours) {
  const { type, twelveHours } = options;

  // No parameters validation required since they were before the function was called.
  // All local variables are declared on top of function.
  let dateOptions   = {};
  let tmpDate       = [];
  let tmpTime       = [];
  let ret_response  = '';
  
  dateOptions = {
    weekday       : type,
    year          : 'numeric',
    month         : type,
    day           : 'numeric',
    hour          : '2-digit',
    minute        : '2-digit',
    second        : '2-digit',
    hour12        : twelveHours
  };
  
  tmpDate = new Date().toLocaleString(DATETIME_LANGUAGE, dateOptions)
                      .replace(/,/gi , "")
                      .split(/ +/);

  // tmpDate does not have the same data structure depending on the 12-24 hours format.
  if (twelveHours)
    tmpTime = tmpDate.splice(4,3);
  else
    tmpTime = tmpDate.splice(4, 2);
    
  ////////////////////////////////////////////////////////////////////////////
  // *Completing the month with the suffix . if short type of date          //
  // Completing the day of the month with the proper suffix                 //
  // Computing final output                                                 //
  // Returning response                                                     //
  ////////////////////////////////////////////////////////////////////////////

  // In case of a short type, a . is added at the end of the day of the week
  // and the month to end the abreviation.
  if (type === 'short') {
    //tmpDate[0] += '.';
    tmpDate[1] += '.';
  }
    
  // 1, 21 and 31 have to end by the suffix 'st'
  // 2 and 22 have to end by the suffix 'nd'
  // 3 and 23 have to end by the suffix 'rd'
  // All other days end by the suffix 'th'
  switch(tmpDate[2].trim()) {
    case '1':
    case '21':
    case '31':
      tmpDate[2] += 'st';
      break;

    case '2':
    case '22':
      tmpDate[2] += 'nd';
      break;
      
    case '3':
    case '23':
      tmpDate[2] += 'rd';
      break;

    default:
      tmpDate[2] += 'th';
  }

  ret_response  = tmpDate[0] + ', ' + tmpDate[1] + ' ' + tmpDate[2] + ' ' +
                  tmpDate[3] + ', ' + tmpTime[0];
    
  // tmpDate does not have the same data structure depending if it is 12 or 24
  // hours format.
  if (twelveHours)  {
    ret_response  += ' ' + tmpTime[1];
  }

  return ret_response; 

};

/**
 * @readonly
 * @function    validateTwelveHours
 * @memberof    DateTime EXCLUSIVE
 * @description Validate typeof variable 'twelveHours', which specify the 12 of 24 hours format and returns results.
 * 
 * @param {boolean} twelveHoursVar variable to check.
 * 
 * @returns {boolean} true if variable is typeof boolean, false if is not.
 */
function validateTwelveHours(twelveHoursVar) {
  return (typeof twelveHoursVar === typeof DateTime.twelveHours);
}

module.exports = DateTime;