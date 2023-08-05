import { container } from "tsyringe";
import TransactionRepository from "../../domain/repository/TransactionRepository";
import TransactionMemoryRepository from "../../infra/repository/TransactionMemoryRepository";

container.registerSingleton<TransactionRepository>(
  "TransactionRepository",
  TransactionMemoryRepository
);
