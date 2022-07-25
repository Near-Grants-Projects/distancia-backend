import express, { Application, Request } from "express";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import C from "./constants";
import { IAppOptions, IDatabaseConnector } from "./interfaces";
import { mw as requestIpMw, Request as RequestIpRequest } from "request-ip";
import { MongoDbConnector } from "./helpers";
import config from "./config"
import mongoose, { Schema } from "mongoose";
import { MongooseUuid } from "./database/types/mongoose-uuid.type";
(Schema.Types as any).UUID = MongooseUuid;
import RouteManager from "./routes";



export type IRequestWithIp = Request & RequestIpRequest;

export default class App {
  readonly engine: Application;
  protected readonly port: number;
  readonly inProduction: boolean;
  protected options: IAppOptions;
  protected connection: any;
  mongoConnector: IDatabaseConnector;

  constructor(engine: Application, port: number, options?: IAppOptions) {
    this.engine = engine;
    this.port = port;
    this.options = options || {};
    this.inProduction = process.env.NODE_ENV === C.Environment.PRODUCTION;
  }

  private installRoutes(): void {
    RouteManager.installRoutes(this.engine);
  }

  private async setupDependencies(): Promise<void> {
    this.mongoConnector = new MongoDbConnector(mongoose);
    await this.mongoConnector.connect(config.MONGODB_URL);
  }

  checkDependencies(): void {
    if (!MongoDbConnector.getClient()) {
      throw new Error("Initialize DB!!!");
    }
  }

  protected configure(): void {
    const {
      urlencodExtended = true,
      requestSizeLimit = "20mb",
      compression: compressionOption,
      cors: corsOption,
    } = this.options;

    this.engine.use(helmet());
    this.engine.use(helmet.hidePoweredBy());
    this.engine.use(cookieParser());
    this.engine.use(requestIpMw());
    this.engine.use(cors(corsOption));
    this.engine.use(compression(compressionOption));
    this.engine.use(express.json({ limit: requestSizeLimit }));
    this.engine.use(
      express.urlencoded({
        limit: requestSizeLimit,
        extended: urlencodExtended,
      })
    );

    // if (!["staging", "production"].includes(<string>process.env.NODE_ENV)) {
    //   this.engine.use(morgan("combined", { stream: LoggerStream }));
    // }

    this.installRoutes();
    // this.engine.use((err: any, _req: Request, _res: Response,next: NextFunction) => {
    //   console.log("err", err)
    //   errorHandlerMiddleware(err,_req,_res,next);
    // })
    //this.engine.use(errorHandlerMiddleware);
  }

  async initialize() {
    await this.setupDependencies();
    this.configure();
  }

  run(): void {
    this.connection = this.engine.listen(this.port, () => {
      console.log(`App now running on port ${this.port}`);
    });
  }

  close() {
    this.connection?.close();
  }
}
