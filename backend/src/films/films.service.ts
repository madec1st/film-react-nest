import { Injectable } from '@nestjs/common';
import { IFilmsRepository } from '../repository/films.repository.interface';
import { FilmDTO, ScheduleDTO } from './dto/films.dto';
import FilmsMongoRepository from '../repository/films.mongo.repository';
import FilmsMemoryRepository from '../repository/films.memory.repository';

@Injectable()
export class FilmsService {
  private activeRepository: IFilmsRepository;

  constructor(
    private readonly mongoRepository: FilmsMongoRepository,
    private readonly memoryRepository: FilmsMemoryRepository,
  ) {
    this.activeRepository = this.mongoRepository;
  }

  setRepository(useMemory: boolean) {
    this.activeRepository = useMemory
      ? this.memoryRepository
      : this.mongoRepository;
  }

  async findAll(): Promise<FilmDTO[]> {
    return this.activeRepository.findAll();
  }

  async findById(id: string): Promise<FilmDTO> {
    return this.activeRepository.findById(id);
  }

  async updateFilm(film: FilmDTO, id?: string): Promise<FilmDTO> {
    if (id) {
      return this.activeRepository.updateFilm(film, id);
    } else {
      return this.activeRepository.updateFilm(film);
    }
  }

  async getFilmSchedule(id: string): Promise<ScheduleDTO[]> {
    return this.activeRepository.getFilmSchedule(id);
  }
}
