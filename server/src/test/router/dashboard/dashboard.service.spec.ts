import { Test, TestingModule } from '@nestjs/testing';
import { DashboardService } from '../../../router/dashboard/dashboard.service';

const mockInvoiceRepository = {
  findAll: jest.fn(),
};

describe('DashboardService', () => {
  let service: DashboardService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DashboardService,
        {
          provide: 'INVOICES_REPOSITORY',
          useValue: mockInvoiceRepository,
        },
      ],
    }).compile();

    service = module.get<DashboardService>(DashboardService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('khwPerCliet', () => {
    it('should return formatted data from kwh per client', async () => {
      const mockInvoices = [
        {
          numberClient: 1,
          monthReference: 'JAN/2023',
          electricityQuantity: 100,
          sceeeEnergyQuantity: 50,
          compensatedEnergyQuantity: 20,
        },
        {
          numberClient: 1,
          monthReference: 'FEV/2023',
          electricityQuantity: 150,
          sceeeEnergyQuantity: 50,
          compensatedEnergyQuantity: 30,
        },
      ];

      mockInvoiceRepository.findAll.mockResolvedValue(mockInvoices);

      const result = await service.khwPerCliet();

      expect(result).toEqual([
        {
          numberClient: 1,
          data: {
            electricPowerConsumption: 350, // 100 + 50 + 150 + 50
            compensatedEnergy: 50, // 20 + 30
          },
        },
      ]);

      expect(mockInvoiceRepository.findAll).toHaveBeenCalledWith({
        attributes: [
          'numberClient',
          'monthReference',
          'electricityQuantity',
          'sceeeEnergyQuantity',
          'compensatedEnergyQuantity',
        ],
      });
    });
  });

  describe('valuePerCliet', () => {
    it('should return formatted data from value per client', async () => {
      const mockInvoices = [
        {
          numberClient: 1,
          monthReference: 'JAN/2023',
          electricityValue: 100,
          sceeeEnergyValue: 50,
          compensatedEnergyValue: 20,
          publicContribution: 10,
        },
        {
          numberClient: 1,
          monthReference: 'FEV/2023',
          electricityValue: 150,
          sceeeEnergyValue: 50,
          compensatedEnergyValue: 30,
          publicContribution: 20,
        },
      ];

      mockInvoiceRepository.findAll.mockResolvedValue(mockInvoices);

      const result = await service.valuePerCliet();

      expect(result).toEqual([
        {
          numberClient: 1,
          data: {
            valueTotal: 380, // 100 + 50 + 10 + 150 + 50 + 20
            economy: 50, // 20 + 30
          },
        },
      ]);

      expect(mockInvoiceRepository.findAll).toHaveBeenCalledWith({
        attributes: [
          'numberClient',
          'monthReference',
          'electricityValue',
          'sceeeEnergyValue',
          'compensatedEnergyValue',
          'publicContribution',
        ],
      });
    });
  });
});
