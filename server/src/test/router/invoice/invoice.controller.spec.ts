import { Test, TestingModule } from '@nestjs/testing';
import { InvoiceController } from '../../../router/invoice/invoice.controller';
import { InvoiceService } from '../../../router/invoice/invoice.service';
import { Response } from 'express';

const mockInvoiceService = {
  extractTextFromPdf: jest.fn(),
  extractTextFromPdfBatch: jest.fn(),
  getPdfData: jest.fn(),
};

describe('InvoiceController', () => {
  let controller: InvoiceController;
  let service: InvoiceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [InvoiceController],
      providers: [
        {
          provide: InvoiceService,
          useValue: mockInvoiceService,
        },
      ],
    }).compile();

    controller = module.get<InvoiceController>(InvoiceController);
    service = module.get<InvoiceService>(InvoiceService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getInformationWithPDFInvoice', () => {
    it('should extract text from a single PDF', async () => {
      const mockFile = { path: 'some/path/file.pdf' } as Express.Multer.File;
      mockInvoiceService.extractTextFromPdf.mockResolvedValue('mocked text');

      const result = await controller.getInformationWithPDFInvoice(mockFile);

      expect(result).toBe('mocked text');
      expect(service.extractTextFromPdf).toHaveBeenCalledWith(mockFile.path);
    });
  });

  describe('getInformationWithPDFInvoiceInBatch', () => {
    it('should extract text from multiple PDFs', async () => {
      const mockFiles = [
        { path: 'some/path/file1.pdf' },
        { path: 'some/path/file2.pdf' },
      ] as Array<Express.Multer.File>;
      mockInvoiceService.extractTextFromPdfBatch.mockResolvedValue(
        'mocked batch text',
      );

      const result =
        await controller.getInformationWithPDFInvoiceInBatch(mockFiles);

      expect(result).toBe('mocked batch text');
      expect(service.extractTextFromPdfBatch).toHaveBeenCalledWith(mockFiles);
    });
  });

  describe('getPdf', () => {
    it('should get PDF data and set response headers', async () => {
      const mockResponse = {
        setHeader: jest.fn(),
        send: jest.fn(),
      } as any as Response;
      mockInvoiceService.getPdfData.mockResolvedValue('mocked pdf data');

      await controller.getPdf(1, mockResponse);

      expect(service.getPdfData).toHaveBeenCalledWith(1);
      expect(mockResponse.setHeader).toHaveBeenCalledWith(
        'Content-Type',
        'application/pdf',
      );
      expect(mockResponse.send).toHaveBeenCalledWith('mocked pdf data');
    });
  });
});
