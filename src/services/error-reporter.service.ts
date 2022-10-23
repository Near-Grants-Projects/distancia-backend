import C from "../constants";
import { ErrorReporterFactory } from "error-handler";

const { SENTRY_DSN, NODE_ENV } = process.env;

const getErrorReporter = () => {
  if (!SENTRY_DSN || NODE_ENV === C.Environment.DEVELOPMENT) {
    return;
  }

  // Configuring reporter for sentry
  return ErrorReporterFactory.createSentryReporter({
    dsn: SENTRY_DSN,
    // beforeReport: (event) => {
    //   // do something
    // },
    // filterBreadcrumbs: (breadcrumb) => {
    //   // remove breadcrumb
    // },
    // see other options in: https://github.com/getsentry/sentry-javascript/blob/master/packages/node/src/types.ts
    // and https://docs.sentry.io/platforms/node/ for more configuration option
  });
};

export const ErrorReporter = getErrorReporter();
