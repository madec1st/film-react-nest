import { Inject, Injectable } from '@nestjs/common';
import FilmsMongoRepository from './films.mongo.repository';
import FilmsMemoryRepository from './films.memory.repository';

@Injectable()
export class FilmsRepositoryFactory {
  constructor(
    @Inject('FilmsMongoRepository')
    private readonly mongoRepository: FilmsMongoRepository,
    @Inject('FilmsMemoryRepository')
    private readonly memoryRepository: FilmsMemoryRepository,
  ) {}

  create(useMemory: boolean) {
    return useMemory ? this.memoryRepository : this.mongoRepository;
  }
}
