import { Injectable, NotFoundException } from '@nestjs/common';
import { IFilmsRepository } from './films.repository.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { Film } from '../films/entities/films.entity';
import { Repository } from 'typeorm';
import { Schedule } from '../films/entities/schedule.entity';

@Injectable()
export default class FilmsPostgresRepository implements IFilmsRepository {
  constructor(
    @InjectRepository(Film) private readonly filmRepository: Repository<Film>,
  ) {}

  async findAll(): Promise<Film[]> {
    const films = await this.filmRepository.find();

    if (films.length === 0) {
      throw new NotFoundException(`Films do not found`);
    }

    return films;
  }

  async findById(id: string, relations: string[] = []): Promise<Film> {
    const film = await this.filmRepository.findOne({
      where: { id },
      relations,
    });

    if (!film) {
      throw new NotFoundException(`Film does not found`);
    }

    return film;
  }

  async updateFilm(film: Film): Promise<Film> {
    const result = await this.filmRepository.save(film);

    if (!result) {
      throw new NotFoundException(`Film with id ${film.id} not found`);
    }

    if (film.schedule && film.schedule.length > 0) {
      for (const schedule of film.schedule) {
        schedule.filmId = film.id;

        const scheduleResult = await this.filmRepository.save(film);

        if (!scheduleResult) {
          throw new NotFoundException(
            `Schedule with id ${schedule.id} not found`,
          );
        }
      }
    }

    return this.findById(film.id, ['schedule']);
  }

  async getFilmSchedule(id: string): Promise<Schedule[]> {
    const film = await this.findById(id, ['schedule']);
    const filmSchedule = film.schedule;

    if (filmSchedule.length === 0) {
      throw new NotFoundException(`Sessions of film by ${id} not found`);
    }

    return filmSchedule;
  }
}
