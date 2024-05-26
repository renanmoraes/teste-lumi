import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './core/database/database.module';
import { InvoiceModule } from './router/invoice/invoice.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DatabaseModule,
    InvoiceModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
