import { Injectable } from '@nestjs/common';
import { TransactionHost } from '@nestjs-cls/transactional';
import { TransactionalAdapterMongoose } from '@nestjs-cls/transactional-adapter-mongoose';
import { ITransactionManager } from '../../application/ports/transaction-manager.port';

@Injectable()
export class ClsTransactionAdapter implements ITransactionManager {
  constructor(
    private readonly txHost: TransactionHost<TransactionalAdapterMongoose>,
  ) {}

  async executeInTransaction<T>(work: () => Promise<T>): Promise<T> {
    return this.txHost.withTransaction(async () => {
      return await work();
    });
  }
}