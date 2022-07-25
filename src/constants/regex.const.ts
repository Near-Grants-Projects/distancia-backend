/**
 * @const Regex
 * @description Common regular expressions
 * @property {RegExp} NUMBER
 * @property {RegExp} POSITIVE_NUMBER
 * @property {RegExp} POSITIVE_NUMBER_DECIMAL_POINT
 * @property {RegExp} EMAIL
 * @property {RegExp} PHONE_NUMBER
 * @property {RegExp} ALPHA_NUMERIC
 * @property {RegExp} ALPHA_NUMERIC_COMMA_DOT
 * @property {RegExp} ALPHA_NUMERIC_PLANE
 * @property {RegExp} PASSWORD
 * @property {RegExp} URL
 * @property {RegExp} UUID
 * @property {RegExp} SORT
 * @property {RegExp} WALLET_ADDRESS
 * @memberOf Constants
 */
 const Regex = {
    NUMBER: /^$|^[-]?[1-9][\\d]*$|^[0]$/,
    POSITIVE_NUMBER: /^$|^[1-9][\\d]*$|^[0]$/,
    POSITIVE_NUMBER_DECIMAL_POINT: /^$|^([1-9][\\d]*|[0])(([.][\\d]+)?)$/,
    EMAIL: /^[a-zA-Z0-9._%+-]+@[a-z][a-z0-9.-]+[.][a-z]{2,5}$/,
    PHONE_NUMBER:
      /^$|^(([+][0-9]{1,3}[- ]?[0-9]{3})|([0-9]{4}))[- ]?[0-9]{3}[- ]?[0-9]{4,}$/,
    ALPHA_NUMERIC: /^$|^[a-zA-Z0-9][a-zA-Z0-9_\- ]*$/,
    ALPHA_NUMERIC_COMMA_DOT: /^$|^[a-zA-Z0-9][a-zA-Z0-9_,. '\\-]*$/,
    ALPHA_NUMERIC_PLANE: /^[a-zA-Z0-9 ]*$/,
    PASSWORD: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,30})/,
    URL: RegExp(
      "^(https?:\\/\\/)?" + // protocol
        "((([a-z\\d]([a-z\\d-]*[a-z\\d])+)\\.)+[a-z]{2,})" + // domain name
        "(\\:\\d+)?(\\/[-a-z\\d%_.&~+=]*)*" + // port and path
        "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
        "(\\#[-a-z\\d_]*)?$",
      "i"
    ),
    UUID: /^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/i,
    SORT: /^([a-zA-Z]{2,}(:asc|:desc)?)+(?:(,([a-zA-Z]{2,}(:asc|:desc)?))*)$/,
  };
  
  export default Regex;
  