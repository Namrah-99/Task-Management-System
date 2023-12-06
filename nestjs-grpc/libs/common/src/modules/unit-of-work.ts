import { Injectable, Scope } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager, Repository, ObjectType } from 'typeorm';

@Injectable({ scope: Scope.REQUEST })
export class UnitOfWork {
  constructor(
    @InjectEntityManager()
    private readonly entityManager: EntityManager,
  ) {}

  getManager(): EntityManager {
    return this.entityManager;
  }

  getRepository<T>(entityClass: ObjectType<T>): Repository<T> {
    return this.entityManager.getRepository(entityClass);
  }

  async transactionalOperation<T, R>(
    entityClass: ObjectType<T>,
    operation: (repository: Repository<T>) => Promise<R>,
  ): Promise<R> {
    return this.entityManager.transaction(async (entityManager) => {
      const repository = entityManager.getRepository(entityClass);
      return operation(repository);
    });
  }
}