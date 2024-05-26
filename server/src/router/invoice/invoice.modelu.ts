import { Module } from '@nestjs/common';
import { invoicesProviders } from 'src/models/invoices.entity';
import { InvoiceService } from './invoice.service';
import { InvoiceController } from './invoice.controller';

@Module({
  imports: [],
  controllers: [InvoiceController],
  providers: [InvoiceService, ...invoicesProviders],
})
export class InvoiceModule {}
