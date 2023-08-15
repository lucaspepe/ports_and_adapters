import { DependencyContainer, container } from "tsyringe";
import { DependecyInjection } from "./dependency-injection.interface";
import TransactionRepository from "../../domain/repository/TransactionRepository";
import TransactionMemoryRepository from "../../repository/TransactionMemoryRepository";
// import TransactionDatabaseRepository from "../../repository/TransactionDatabaseRepository";
import Connection from "../../database/Connection";
import PostgreSQLAdapter from "../../database/PostgreSQLAdapter";

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
      // TransactionDatabaseRepository
      TransactionMemoryRepository
    );

    this.tsyringe.registerSingleton<Connection>("Database", PostgreSQLAdapter);
  }
}

export { TsyringeDependencyInjectionAdapter };
