//TODO описать DTO для запросов к /films

import {
  IsArray,
  IsFQDN,
  IsISO8601,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class ScheduleDTO {
  @IsString()
  id: string;

  @IsISO8601()
  daytime: string;

  @IsNumber()
  hall: number;

  @IsNumber()
  rows: number;

  @IsNumber()
  seats: number;

  @IsNumber()
  price: number;

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  taken?: string[];
}

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
