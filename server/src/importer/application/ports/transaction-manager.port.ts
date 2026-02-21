export abstract class ITransactionManager {
  abstract executeInTransaction<T>(work: () => Promise<T>): Promise<T>;
}
