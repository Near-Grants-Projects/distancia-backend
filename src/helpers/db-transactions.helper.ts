import { IDbSessionAction } from "../interfaces";
import mongoose from "mongoose";

/**
 * @class DbTransactionHelper
 * @author Marv
 */
export default class DbTransactionHelper {
  private static client: mongoose.Mongoose;

  /**
   * @name initialize
   * @param {mongoose.Mongoose} client
   * @returns {void}
   * @memberOf DbTransactionHelper
   */
  static initialize(client: mongoose.Mongoose) {
    DbTransactionHelper.client = client;
  }

  /**
   * @name execute
   * @param {IDbSessionAction} action
   * @returns {*}
   * @memberOf DbTransactionHelper
   */
  static async execute(action: IDbSessionAction): Promise<any> {
    if (!DbTransactionHelper.client) {
      throw new Error(
        "Client not set. Please call initialize method to set client!"
      );
    }

    const session: mongoose.ClientSession =
      await DbTransactionHelper.client.startSession();

    try {
      const result = await session.withTransaction(() => {
        return action(session);
      });
      return result;
    } catch (e: any) {
      const error: any = e.originalError || e;
      if (
        error.codeName === "IllegalOperation" &&
        /replica set/i.test(error.errmsg)
      ) {
        console.warn("Transactions not supported, using no transactions");
        return action();
      }
      throw error;
    } finally {
      session.endSession();
    }
  }
}
