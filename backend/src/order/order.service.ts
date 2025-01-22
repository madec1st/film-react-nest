import {
  Injectable,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { IFilmsRepository } from '../repository/films.repository.interface';
import { OrderDTO } from './dto/order.dto';
import FilmsMongoRepository from '../repository/films.mongo.repository';

@Injectable()
export class OrderService {
  private filmsRepository: IFilmsRepository;

  constructor(private readonly filmsMongoRepository: FilmsMongoRepository) {
    this.filmsRepository = this.filmsMongoRepository;
  }

  async reserveSeat(orderDTO: OrderDTO) {
    const { tickets } = orderDTO;
    const reservedTickets = [];

    for (const ticket of tickets) {
      const { film, session, row, seat } = ticket;
      const selectedPlace = `${row}:${seat}`;
      const selectedFilm = await this.filmsRepository.findById(film);

      if (!selectedFilm) {
        throw new NotFoundException(`Film with session ${film} not found`);
      }

      const schedule = selectedFilm.schedule.find((s) => s.id === session);

      if (!schedule) {
        throw new NotFoundException(`Film does not have session by ${session}`);
      }

      if (schedule.taken.includes(selectedPlace)) {
        throw new ConflictException(
          `Seat ${selectedPlace} is not available to reserve`,
        );
      }

      reservedTickets.push({
        film,
        session,
        row,
        seat,
      });

      await this.filmsRepository.updateFilm(selectedFilm);

      return reservedTickets;
    }
  }
}
