import CreateTransaction from "../../app/usecases/CreateTransaction";
import GetTransaction from "../../app/usecases/GetTransaction";
import TransactionRepository from "../../domain/repository/TransactionRepository";
import { DependecyInjection } from "../../shared/injection-container/dependency-injection.interface";
import PostgreSQLAdapter from "../database/PostgreSQLAdapter";
import TransactionDatabaseRepository from "../repository/TransactionDatabaseRepository";
import HttpServer from "./HttpServer";

export default class Router {
  constructor(
    readonly httpServer: HttpServer,
    readonly dependencyInjection: DependecyInjection
  ) {}

  async init() {
    this.httpServer.on(
      "post",
      "/transactions",
      async (params: any, body: any) => {
        const createTransaction =
          this.dependencyInjection.resolve(CreateTransaction);
        await createTransaction.execute(body);
      }
    );

    this.httpServer.on(
      "get",
      "/transactions/:code",
      async (params: any, body: any) => {
        // const getTransaction = new GetTransaction(this.transactionRepository);
        // const transaction = await getTransaction.execute(params.code);
        // return transaction;
      }
    );
  }
}
