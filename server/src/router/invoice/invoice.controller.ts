import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Res,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBody, ApiConsumes, ApiOperation, ApiTags } from '@nestjs/swagger';
import { InvoiceService } from './invoice.service';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { LoadMultiplePDF, LoadPDF } from './dto/load.dto';
import { PDFFilter } from 'src/core/filter-pdf.filter';
import { Response } from 'express';

@ApiTags('Invoices')
@Controller('api/v1/invoices')
export class InvoiceController {
  constructor(private readonly invoiceService: InvoiceService) {}

  @Post('load-pdf')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ description: 'Load information PDF invoice' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Arquivo para upload',
    type: LoadPDF,
  })
  @UseInterceptors(
    FileInterceptor('file', {
      fileFilter: PDFFilter,
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          cb(
            null,
            file.fieldname + '-' + uniqueSuffix + extname(file.originalname),
          );
        },
      }),
    }),
  )
  public async getInformationWithPDFInvoice(
    @UploadedFile() file: Express.Multer.File,
  ): Promise<any> {
    return this.invoiceService.extractTextFromPdf(file.path);
  }

  @Post('batch-load-pdf')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ description: 'Load information PDF invoice with batch mode' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Arquivo para upload',
    type: LoadMultiplePDF,
  })
  @UseInterceptors(
    FilesInterceptor('files', 24, {
      fileFilter: PDFFilter,
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          cb(
            null,
            file.fieldname + '-' + uniqueSuffix + extname(file.originalname),
          );
        },
      }),
    }),
  )
  public async getInformationWithPDFInvoiceInBatch(
    @UploadedFiles() files: Array<Express.Multer.File>,
  ): Promise<any> {
    return this.invoiceService.extractTextFromPdfBatch(files);
  }

  @Get('get-pdf/:id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ description: 'Get PDF file' })
  public async getPdf(@Param('id') id: number, @Res() res: Response) {
    const pdfData = await this.invoiceService.getPdfData(id);
    res.setHeader('Content-Type', 'application/pdf');
    res.send(pdfData);
  }
}
