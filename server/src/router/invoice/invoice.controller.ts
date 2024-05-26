import {
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBody, ApiConsumes, ApiOperation, ApiTags } from '@nestjs/swagger';
import { InvoiceService } from './invoice.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { LoadPDF } from './dto/load.dto';
import { PDFFilter } from 'src/core/filter-pdf.filter';

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
}
