import { inject, injectable } from 'tsyringe';
import Transaction from "../../domain/entity/Transaction";
import TransactionRepository from "../../domain/repository/TransactionRepository";
import Installment from "../../domain/entity/Installment";
import Connection from "../database/Connection";

@injectable()
export default class TransactionDatabaseRepository
  implements TransactionRepository
{
  constructor(@inject('Database') readonly connection: Connection) {}

  async save(transaction: Transaction): Promise<void> {
    await this.connection.query(
      "insert into lucas.transaction (code, amount, number_installments, payment_method) values ($1, $2, $3, $4)",
      [
        transaction.code,
        transaction.amount,
        transaction.numberInstallments,
        transaction.paymentMethod,
      ]
    );
    for (const installment of transaction.installments) {
      await this.connection.query(
        "insert into lucas.installment (code, number, amount) values ($1, $2, $3)",
        [transaction.code, installment.number, installment.amount]
      );
    }
  }

  async get(code: string): Promise<Transaction> {
    const transactionData = await this.connection.one(
      "select * from lucas.transaction where code = $1",
      [code]
    );
    const transaction = new Transaction(
      transactionData.code,
      parseFloat(transactionData.amount),
      transactionData.number_installments,
      transactionData.payment_method
    );
    const installmentsData = await this.connection.query(
      "select * from lucas.installment where code = $1",
      [code]
    );
    for (const installmentData of installmentsData) {
      const installment = new Installment(
        installmentData.number,
        parseFloat(installmentData.amount)
      );
      transaction.installments.push(installment);
    }
    return transaction;
  }
}
