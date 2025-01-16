import { FilmDTO, ScheduleDTO } from '../films/dto/films.dto';

export interface IFilmsRepository {
  findAll(): Promise<FilmDTO[]>;
  findById(id: string): Promise<FilmDTO>;
  updateFilm(film: FilmDTO, id?: string): Promise<FilmDTO>;
  getFilmSchedule(id: string): Promise<ScheduleDTO[]>;
}
