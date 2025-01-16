//TODO реализовать DTO для /orders

import { IsString, IsNumber } from 'class-validator';

export class OrderDTO {
  @IsString()
  scheduleId: string;

  @IsNumber()
  row: number;

  @IsNumber()
  seat: number;
}
