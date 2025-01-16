import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Film, FilmSchema } from './film.schema';
import FilmsMongoRepository from '../repository/films.mongo.repository';
import FilmsMemoryRepository from '../repository/films.memory.repository';
import { FilmsService } from './films.service';
import { FilmsController } from './films.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Film.name, schema: FilmSchema }]),
  ],
  controllers: [FilmsController],
  providers: [FilmsService, FilmsMongoRepository, FilmsMemoryRepository],
  exports: [FilmsService, FilmsMongoRepository, FilmsMemoryRepository],
})
export class FilmsModule {}
