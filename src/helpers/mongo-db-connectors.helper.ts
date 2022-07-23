import { Mongoose } from "mongoose";
import { IDatabaseConnector } from "../interfaces";
import DbTransactionHelper from "./db-transactions.helper";

/**
 * @class MongoDbConnector
 * @author Marv
 */
export default class MongoDbConnector implements IDatabaseConnector {
  protected static client: any;
  private readonly mongoose: Mongoose;

  constructor(mongoose: Mongoose) {
    this.mongoose = mongoose;
  }

  /**
   * @name getClient
   * @static
   * @memberof MongoDbConnector
   * @returns {*}
   */
  static getClient() {
    return this.client;
  }

  /**
   * @instance
   * @name connect
   * @param url
   * @memberof MongoDbConnector
   * @desc connects to mongodb database
   */
  async connect(url: string) {
    MongoDbConnector.client = await this.mongoose.connect(url);
    DbTransactionHelper.initialize(this.mongoose);
  }

  /**
   * @instance
   * @name disconnect
   * @memberof MongoDbConnector
   * @desc disconnects from mongodb database
   */
  async disconnect() {
    await MongoDbConnector.client?.disconnect();
  }
}
