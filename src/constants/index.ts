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
namespace Constants {
    export import Environment = _Environment;
    export const Regex = _Regex;
    export import AuthTokenType = _AuthTokenType;
}

export default Constants;