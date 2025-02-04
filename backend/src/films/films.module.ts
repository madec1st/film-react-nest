import { Module } from '@nestjs/common';
import { FilmsService } from './films.service';
import { FilmsController } from './films.controller';
import { ConfigModule } from '@nestjs/config';
import FilmsMongoRepository from '../repository/films.mongo.repository';
import FilmsPostgresRepository from '../repository/films.postgres.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { Film, FilmSchema } from './film.schema';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Film as FilmEntity } from './entities/films.entity';
import { Schedule as ScheduleEntity } from './entities/schedule.entity';

@Module({
  imports: [
    ConfigModule.forRoot(),
    process.env.DATABASE_DRIVER === 'mongodb'
      ? MongooseModule.forFeature([{ name: Film.name, schema: FilmSchema }])
      : TypeOrmModule.forFeature([FilmEntity, ScheduleEntity]),
  ],
  controllers: [FilmsController],
  providers: [
    FilmsService,
    {
      provide: 'FilmsRepository',
      useClass:
        process.env.DATABASE_DRIVER === 'mongodb'
          ? FilmsMongoRepository
          : FilmsPostgresRepository,
    },
  ],
  exports: [FilmsService, 'FilmsRepository'],
})
export class FilmsModule {}
