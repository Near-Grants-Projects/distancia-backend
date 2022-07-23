import fs from "fs";
import C from "../constants";
import * as OpenApiValidator from "express-openapi-validator";

/**
 * @name apiRequestValidator
 * @description
 * This middleware validates Api requests input data
 * ```
 *
 * @param {string} specPath
 * @returns {Function}
 */
export const apiRequestValidator = (specPath: string) => {
  if (!specPath || !fs.existsSync(specPath)) {
    throw new Error("API spec path is not valid");
  }

  return OpenApiValidator.middleware({
    apiSpec: specPath,
    validateRequests: true, // (default)
    validateResponses: false,
    validateSecurity: false,
    ignoreUndocumented: true,
    formats: [
      {
        name: "bytes",
        type: "string",
        validate: (value: any) => {
          return Buffer.from(value, "base64").length > 0;
        },
      },
      {
        name: "uuid",
        type: "string",
        validate: (value: any) => {
          return C.Regex.UUID.test(value);
        },
      },
    ],
    unknownFormats: ["string", "jwt", "password", "email"],
  });
};
