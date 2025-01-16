import { Injectable, NotFoundException } from '@nestjs/common';
import { FilmDTO, ScheduleDTO } from '../films/dto/films.dto';
import films from '../../test/mongodb_initial_stub.json';
import { IFilmsRepository } from './films.repository.interface';

@Injectable()
export default class FilmsMemoryRepository implements IFilmsRepository {
  private films: FilmDTO[] = [];

  constructor() {
    this.films = films;
  }

  async findAll(): Promise<FilmDTO[]> {
    if (this.films.length === 0) {
      throw new NotFoundException(`Films do not found`);
    }

    return this.films;
  }

  async findById(id: string): Promise<FilmDTO> {
    const film = this.films.find((film) => film.id === id);

    if (!film) {
      throw new NotFoundException(`Film does not found`);
    }

    return film;
  }

  async updateFilm(film: FilmDTO, id: string): Promise<FilmDTO> {
    const index = this.films.findIndex((f) => f.id === id);

    if (index === -1) {
      throw new NotFoundException(
        `Film does not update, because it does not found by ${film.id}`,
      );
    }

    this.films[index] = { ...this.films[index], ...film };

    return this.films[index];
  }

  async getFilmSchedule(id: string): Promise<ScheduleDTO[]> {
    const film = await this.findById(id);
    const filmSchedule = film.schedule;

    if (filmSchedule.length === 0) {
      throw new NotFoundException(`Sessions of film by ${id} not found`);
    }

    return filmSchedule;
  }
}
