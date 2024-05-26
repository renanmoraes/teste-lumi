import { Module } from '@nestjs/common';
import { invoicesProviders } from 'src/models/invoices.entity';
import { DashboardService } from './dashboard.service';
import { DashboardController } from './dashboard.controller';

@Module({
  imports: [],
  controllers: [DashboardController],
  providers: [DashboardService, ...invoicesProviders],
})
export class DashboardModule {}
