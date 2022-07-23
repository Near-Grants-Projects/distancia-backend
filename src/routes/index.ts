import root from "./root.route";
import { Application } from "express";
import path from "path";
import { apiRequestValidator } from "../middlewares/api-request-validator.middleware";
import onboard from "./onboard.route"

const API_SPEC_PATH: string = path.resolve(__dirname, "../../spec/api-spec.yaml");

/**
 * @class RouteManager
 * @classdesc
 */
export default class RouteManager {
  /**
   * @method installRoutes
   * @static
   * @param {Application} app
   */
  static installRoutes(app: Application) {
    app.use(root);
    app.use(apiRequestValidator(API_SPEC_PATH));
    app.use("/onboard", onboard)
    app.use((err: any, _req: any, _res: any,next: any) => {
      if(err.response){
        console.log(err.response.data)
      }else if(err.message){
        console.log(err.message)
      }
    })
  }
}
