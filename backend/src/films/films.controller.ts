import { Controller, Get, Param, Post, Body } from '@nestjs/common';
import { FilmsService } from './films.service';

@Controller('api/afisha/films')
export class FilmsController {
  constructor(private readonly filmsService: FilmsService) {}

  @Get()
  async getAllFilms() {
    return this.filmsService.findAll();
  }

  @Get(':id/schedule')
  async getFilmSchedule(@Param('id') id: string) {
    return this.filmsService.getFilmSchedule(id);
  }

  @Post('set-repository')
  async setRepository(@Body('useMemory') useMemory: boolean) {
    this.filmsService.setRepository(useMemory);
    return {
      message: `Repository switched to ${useMemory ? 'Memory' : 'MongoDB'}`,
    };
  }
}
