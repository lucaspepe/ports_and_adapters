import { DependencyContainer, container } from "tsyringe";
import { DependecyInjection } from "./dependency-injection.interface";
import TransactionRepository from "../../domain/repository/TransactionRepository";
import TransactionMemoryRepository from "../../infra/repository/TransactionMemoryRepository";
import TransactionDatabaseRepository from "../../infra/repository/TransactionDatabaseRepository";
import Connection from "../../infra/database/Connection";
import PostgreSQLAdapter from "../../infra/database/PostgreSQLAdapter";

class TsyringeDependencyInjectionAdapter implements DependecyInjection {
  private tsyringe: DependencyContainer;
  constructor() {
    this.tsyringe = container;
    this.registerAll();
  }

  getInstance<T>(token: new (...args: any[]) => T): T {
    return this.tsyringe.resolve(token);
  }

  private registerAll() {
    this.tsyringe.registerSingleton<TransactionRepository>(
      "TransactionRepository",
      TransactionDatabaseRepository
      // TransactionMemoryRepository
    );

    this.tsyringe.registerSingleton<Connection>("Database", PostgreSQLAdapter);
  }
}

export { TsyringeDependencyInjectionAdapter };
