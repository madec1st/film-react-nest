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
    const films = await this.activeRepository.findAll();
    return films;
  }

  async findById(id: string): Promise<FilmDTO | Film> {
    const film = await this.activeRepository.findById(id);
    return film;
  }

  async updateFilm(film: FilmDTO | Film): Promise<FilmDTO | Film> {
    const filmToUpdate = await this.activeRepository.updateFilm(film);
    return filmToUpdate;
  }

  async getFilmSchedule(id: string): Promise<ScheduleDTO[] | Schedule[]> {
    const schedule = await this.activeRepository.getFilmSchedule(id);
    return schedule;
  }
}
