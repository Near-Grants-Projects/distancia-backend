import { injectable } from 'tsyringe';
import * as nearAPI from 'near-api-js';
const { connect, Account } = nearAPI;

@injectable()
export class NearService {
  public connectionConfig = {
    networkId: 'testnet',
    nodeUrl: 'https://rpc.testnet.near.org',
    walletUrl: 'https://wallet.testnet.near.org',
    helperUrl: 'https://helper.testnet.near.org',
    explorerUrl: 'https://explorer.testnet.near.org',

    constructor() {},
  };
  private getConnections = async () => {
    return await connect(this.connectionConfig);
  };
  private getContract = async (accountId) => {
    const contract = new nearAPI.Contract(accountId, 'token.distancia.testnet', {
      viewMethods: ['ft_balance_of'],
      changeMethods: [],
    });

    return contract;
  };
  public getBalance = async (accountId) => {
    console.log('accountId', accountId);
    const { connection } = await this.getConnections();
    const wallet = new Account(connection, accountId);
    const contract: any = await this.getContract(wallet);
    const balance = await contract.ft_balance_of({ account_id: accountId });
    return { balance };
  };
}
