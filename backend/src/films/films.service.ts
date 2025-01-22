import { Injectable } from '@nestjs/common';
import { IFilmsRepository } from '../repository/films.repository.interface';
import { FilmDTO, ScheduleDTO } from './dto/films.dto';
import FilmsMongoRepository from '../repository/films.mongo.repository';

@Injectable()
export class FilmsService {
  private activeRepository: IFilmsRepository;

  constructor(private readonly mongoRepository: FilmsMongoRepository) {
    this.activeRepository = this.mongoRepository;
  }

  async findAll(): Promise<FilmDTO[]> {
    const films = await this.activeRepository.findAll();
    return films;
  }

  async findById(id: string): Promise<FilmDTO> {
    const film = await this.activeRepository.findById(id);
    return film;
  }

  async updateFilm(film: FilmDTO): Promise<FilmDTO> {
    const filmToUpdate = await this.activeRepository.updateFilm(film);
    return filmToUpdate;
  }

  async getFilmSchedule(id: string): Promise<ScheduleDTO[]> {
    const schedule = await this.activeRepository.getFilmSchedule(id);
    return schedule;
  }
}
