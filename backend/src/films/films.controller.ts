import { Controller, Get, Param } from '@nestjs/common';
import { FilmsService } from './films.service';

@Controller('films')
export class FilmsController {
  constructor(private readonly filmsService: FilmsService) {}

  @Get()
  async getAllFilms() {
    const films = await this.filmsService.findAll();
    return { total: films.length, items: films };
  }

  @Get(':id/schedule')
  async getFilmSchedule(@Param('id') id: string) {
    const filmSessions = await this.filmsService.getFilmSchedule(id);
    return { items: filmSessions };
  }
}
