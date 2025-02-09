import { Inject, Injectable } from '@nestjs/common';
import { IFilmsRepository } from '../repository/films.repository.interface';
import { FilmDTO } from './dto/films.dto';
import { ScheduleDTO } from './dto/schedule.dto';
import { Film } from './entities/films.entity';
import { Schedule } from './entities/schedule.entity';

@Injectable()
export class FilmsService {
  private activeRepository: IFilmsRepository;

  constructor(
    @Inject('FilmsRepository')
    private readonly filmsRepository: IFilmsRepository,
  ) {
    this.activeRepository = this.filmsRepository;
  }

  async findAll(): Promise<FilmDTO[] | Film[]> {
    return await this.activeRepository.findAll();
  }

  async findById(id: string): Promise<FilmDTO | Film> {
    return await this.activeRepository.findById(id);
  }

  async updateFilm(film: FilmDTO | Film): Promise<FilmDTO | Film> {
    return await this.activeRepository.updateFilm(film);
  }

  async getFilmSchedule(id: string): Promise<ScheduleDTO[] | Schedule[]> {
    return await this.activeRepository.getFilmSchedule(id);
  }
}
