//TODO описать DTO для запросов к /films

import {
  IsArray,
  IsFQDN,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';
import { ScheduleDTO } from './schedule.dto';

export class FilmDTO {
  @IsString()
  id: string;

  @IsNumber()
  rating: number;

  @IsString()
  director: string;

  @IsArray()
  tags: string[];

  @IsFQDN()
  image: string;

  @IsFQDN()
  cover: string;

  @IsString()
  title: string;

  @IsString()
  about: string;

  @IsString()
  description: string;

  @IsArray()
  @IsNotEmpty()
  schedule: ScheduleDTO[];
}
