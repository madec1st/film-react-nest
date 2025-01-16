import { Injectable, NotFoundException } from '@nestjs/common';
import { Film } from '../films/film.schema';
import { Model } from 'mongoose';
import { FilmDTO, ScheduleDTO } from '../films/dto/films.dto';
import { IFilmsRepository } from './films.repository.interface';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export default class FilmsMongoRepository implements IFilmsRepository {
  constructor(
    @InjectModel(Film.name) private readonly filmModel: Model<Film>,
  ) {}

  async findAll(): Promise<FilmDTO[]> {
    const films = await this.filmModel.find().exec();

    if (films.length === 0) {
      throw new NotFoundException(`Films do not found`);
    }

    return films;
  }

  async findById(id: string): Promise<FilmDTO> {
    const film = await this.filmModel.findById(id).exec();

    if (!film) {
      throw new NotFoundException(`Film does not found`);
    }

    return film;
  }

  async updateFilm(film: FilmDTO): Promise<FilmDTO> {
    const updatedFilm = await this.filmModel
      .findByIdAndUpdate(film.id, film, { new: true })
      .exec();

    if (!updatedFilm) {
      throw new NotFoundException(
        `Film does not update, because it does not found by ${film.id}`,
      );
    }

    return updatedFilm;
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
