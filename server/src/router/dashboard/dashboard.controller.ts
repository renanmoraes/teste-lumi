import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { DashboardService } from './dashboard.service';

@ApiTags('Dashboard')
@Controller('api/v1/dashboard')
export class DashboardController {
  constructor(private readonly invoiceService: DashboardService) {}

  @Get('khw/per-client')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ description: 'Get data from kwh per client' })
  public async khwPerCliet() {
    return await this.invoiceService.khwPerCliet();
  }

  @Get('value/per-client')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ description: 'Get data from value per client' })
  public async valuePerCliet() {
    return await this.invoiceService.valuePerCliet();
  }
}
