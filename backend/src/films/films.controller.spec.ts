import { Test, TestingModule } from '@nestjs/testing';
import { FilmsController } from './films.controller';
import { FilmsService } from './films.service';
import { NotFoundException } from '@nestjs/common';

describe('FilmsController', () => {
  let filmsController: FilmsController;
  let filmsService: FilmsService;

  const mockFilmsService = {
    findAll: jest.fn(),
    getFilmSchedule: jest.fn(),
  };

  const mockSchedule = {
    id: 'schedule_id',
    daytime: '2025-02-28 15-30-00',
    hall: 5,
    rows: 18,
    seats: 150,
    price: 350,
    taken: ['3:2', '3:3'],
  };

  const mockFilms = [
    {
      id: 'film_id',
      rating: 7.6,
      director: 'Stephen Sommers',
      tags: ['fantasy', 'action', 'triller'],
      image: '../images/posters/van_helsing.png',
      cover: '../images/covers/van_helsing.jpeg',
      title: 'Van Helsing',
      about: 'About vampire hunter',
      description: 'About vampire hunter',
      schedule: mockSchedule,
    },
  ];

  const filmId = 'film_id';

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FilmsController],
      providers: [
        {
          provide: FilmsService,
          useValue: mockFilmsService,
        },
      ],
    }).compile();

    filmsController = module.get<FilmsController>(FilmsController);
    filmsService = module.get<FilmsService>(FilmsService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getAllFilms', () => {
    it('should return an object with total and items', async () => {
      mockFilmsService.findAll.mockResolvedValue(mockFilms);

      const result = await filmsController.getAllFilms();
      expect(result).toEqual({ total: mockFilms.length, items: mockFilms });
      expect(filmsService.findAll).toHaveBeenCalled();
    });

    it('should throw NotFoundException if films do not found', async () => {
      mockFilmsService.findAll.mockRejectedValue(
        new NotFoundException('No films found'),
      );

      await expect(filmsController.getAllFilms()).rejects.toThrow(
        NotFoundException,
      );
      expect(mockFilmsService.findAll).toHaveBeenCalled();
    });
  });

  describe('getFilmSchedule', () => {
    it('should return an object with items', async () => {
      mockFilmsService.getFilmSchedule.mockResolvedValue(mockSchedule);

      const result = await filmsController.getFilmSchedule(filmId);
      expect(result).toEqual({ items: mockSchedule });
      expect(filmsService.getFilmSchedule).toHaveBeenCalledWith(filmId);
    });

    it('should throw NotFoundException if film schedule is not found', async () => {
      mockFilmsService.getFilmSchedule.mockRejectedValue(
        new NotFoundException('Film schedule not found'),
      );

      await expect(filmsController.getFilmSchedule(filmId)).rejects.toThrow(
        NotFoundException,
      );
      expect(mockFilmsService.getFilmSchedule).toHaveBeenCalledWith(filmId);
    });
  });
});
