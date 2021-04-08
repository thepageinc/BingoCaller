/**
 * @file        config.js
 * @summary     contains configurations and settings for the DateTime class
 * @description this file contains all the configurations for the DateTime
 *              class; If you know what you are doing, go ahead and have fun!
 * 
 */
const DATETIME_LANGUAGE           = 'EN-en';
const LOGTIMESTAMP_BRACES         = '[]';       // 0 opening; 1 closing
const LOGTIMESTAMP_SEPARATOR      = ' | ';
const TWELVEHOURS_FORMAT_DEFAULT  = false;
const ZULU_FORMAT_DEFAULT         = false;

module.exports  = {
  DATETIME_LANGUAGE,
  LOGTIMESTAMP_BRACES,
  LOGTIMESTAMP_SEPARATOR,
  TWELVEHOURS_FORMAT_DEFAULT,
  ZULU_FORMAT_DEFAULT
};
