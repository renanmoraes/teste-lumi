import { Test, TestingModule } from '@nestjs/testing';
import { DashboardController } from '../../../router/dashboard/dashboard.controller';
import { DashboardService } from '../../../router/dashboard/dashboard.service';

describe('DashboardController', () => {
  let dashboardController: DashboardController;
  let dashboardService: DashboardService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DashboardController],
      providers: [
        {
          provide: DashboardService,
          useValue: {
            khwPerCliet: jest.fn().mockResolvedValue('mocked kwh data'),
            valuePerCliet: jest.fn().mockResolvedValue('mocked value data'),
          },
        },
      ],
    }).compile();

    dashboardController = module.get<DashboardController>(DashboardController);
    dashboardService = module.get<DashboardService>(DashboardService);
  });

  it('should be defined', () => {
    expect(dashboardController).toBeDefined();
  });

  describe('khwPerCliet', () => {
    it('should return data from kwh per client', async () => {
      const result = await dashboardController.khwPerCliet();
      expect(result).toBe('mocked kwh data');
      expect(dashboardService.khwPerCliet).toHaveBeenCalled();
    });

    it('should return status OK', async () => {
      const response = await dashboardController.khwPerCliet();
      expect(response).toBe('mocked kwh data');
    });
  });

  describe('valuePerCliet', () => {
    it('should return data from value per client', async () => {
      const result = await dashboardController.valuePerCliet();
      expect(result).toBe('mocked value data');
      expect(dashboardService.valuePerCliet).toHaveBeenCalled();
    });

    it('should return status OK', async () => {
      const response = await dashboardController.valuePerCliet();
      expect(response).toBe('mocked value data');
    });
  });
});
