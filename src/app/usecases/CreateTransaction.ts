import Transaction from "../../domain/entity/Transaction";
import TransactionRepository from "../../domain/repository/TransactionRepository";
import { inject, injectable } from "tsyringe";

@injectable()
export default class CreateTransaction {
  constructor(
    @inject("TransactionRepository")
    readonly transactionRepository: TransactionRepository
  ) {}

  async execute(input: Input): Promise<void> {
    console.log("aqui 12");
    const transaction = new Transaction(
      input.code,
      input.amount,
      input.numberInstallments,
      input.paymentMethod
    );
    transaction.generateInstallments();
    await this.transactionRepository.save(transaction);
  }
}

type Input = {
  code: string;
  amount: number;
  numberInstallments: number;
  paymentMethod: string;
};
