import _Regex from "./regex.const";
import _Environment from "./environment.const";
import _AuthTokenType from "./auth-token-type.const";

/* eslint-disable */
/**
 * @description
 * @namespace Constants
 * @property {Environment} Environment
 * @property {Regex} Regex
 * @property {string} NUBIAN_AUD
 * @property {AuthTokenType} AuthTokenType
 * @Author Marv
 */


export const StatusCodes = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  METHOD_NOT_ALLOWED: 405,
  INTERNAL_SERVER_ERROR: 500,
  BAD_GATEWAY: 502,
  UNPROCESSABLE_ENTITY: 422,
};

namespace Constants {
    export import Environment = _Environment;
    export const Regex = _Regex;
    export import AuthTokenType = _AuthTokenType;
}

export default Constants;