import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { FilmsModule } from '../films/films.module';

@Module({
  imports: [FilmsModule],
  providers: [OrderService],
  exports: [OrderService],
})
export class OrderModule {}
