import { Film } from '../films/entities/films.entity';
import { FilmDTO } from '../films/dto/films.dto';
import { ScheduleDTO } from '../films/dto/schedule.dto';
import { Schedule } from '../films/entities/schedule.entity';

export interface IFilmsRepository {
  findAll(): Promise<FilmDTO[] | Film[]>;
  findById(id: string, relations?: string[]): Promise<FilmDTO | Film>;
  updateFilm(film: FilmDTO | Film): Promise<FilmDTO | Film>;
  getFilmSchedule(id: string): Promise<ScheduleDTO[] | Schedule[]>;
}
