import { Test, TestingModule } from '@nestjs/testing';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { OrderDTO } from './dto/order.dto';
import { NotFoundException } from '@nestjs/common';

describe('OrderController', () => {
  let orderController: OrderController;
  let orderService: OrderService;

  const mockOrderService = {
    reserveSeat: jest.fn(),
  };

  const mockOrderDTO: OrderDTO = {
    email: 'drakula@gmail.com',
    phone: '+79876543210',
    tickets: [
      {
        film: 'film_id',
        session: 'session_id',
        row: 3,
        seat: 3,
      },
      {
        film: 'film_id',
        session: 'session_id',
        row: 3,
        seat: 4,
      },
    ],
  };

  const mockOrderData = [
    {
      film: 'film_id',
      session: 'session_id',
      row: 3,
      seat: 3,
    },
    {
      film: 'film_id',
      session: 'session_id',
      row: 3,
      seat: 4,
    },
  ];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrderController],
      providers: [
        {
          provide: OrderService,
          useValue: mockOrderService,
        },
      ],
    }).compile();

    orderController = module.get<OrderController>(OrderController);
    orderService = module.get<OrderService>(OrderService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should create an order and return order data', async () => {
    mockOrderService.reserveSeat.mockResolvedValue(mockOrderData);

    const result = await orderController.createOrder(mockOrderDTO);

    expect(orderService.reserveSeat).toHaveBeenCalledWith(mockOrderDTO);
    expect(result).toEqual({ items: mockOrderData });
  });

  it('should throw NotFoundException if film does not found', async () => {
    mockOrderService.reserveSeat.mockRejectedValue(
      new NotFoundException('Film not found'),
    );

    await expect(orderController.createOrder(mockOrderDTO)).rejects.toThrow(
      NotFoundException,
    );
  });
});
