import {
  Injectable,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { IFilmsRepository } from '../repository/films.repository.interface';
import { OrderDTO } from './dto/order.dto';
import FilmsMongoRepository from '../repository/films.mongo.repository';
import FilmsMemoryRepository from 'src/repository/films.memory.repository';

@Injectable()
export class OrderService {
  private filmsRepository: IFilmsRepository;

  constructor(
    private readonly filmsMongoRepository: FilmsMongoRepository,
    private readonly filmsMemoryRepository: FilmsMemoryRepository,
  ) {
    this.filmsRepository = this.filmsMongoRepository;
  }

  setRepository(repository: IFilmsRepository) {
    this.filmsRepository = repository;
  }

  async reserveSeat(orderDTO: OrderDTO): Promise<boolean> {
    const { scheduleId, row, seat } = orderDTO;
    const film = await this.filmsRepository.findById(scheduleId);
    const ticket = `${row}:${seat}`;

    if (!film) {
      throw new NotFoundException(`Film with session ${scheduleId} not found`);
    }

    const schedule = film.schedule.find((s) => s.id === scheduleId);

    if (!schedule) {
      throw new NotFoundException(
        `Film does not have session by ${scheduleId}`,
      );
    }

    if (schedule.taken.includes(ticket)) {
      throw new ConflictException(`Seat ${ticket} is not available to reserve`);
    }

    schedule.taken.push(ticket);
    await this.filmsRepository.updateFilm(film);
    return true;
  }
}
