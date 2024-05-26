import { Inject, Injectable } from '@nestjs/common';
import { Invoices } from 'src/models/invoices.entity';

@Injectable()
export class DashboardService {
  constructor(
    @Inject('INVOICES_REPOSITORY')
    private invoiceRepository: typeof Invoices,
  ) {}

  public async khwPerCliet() {
    const invoices = await this.invoiceRepository.findAll({
      attributes: [
        'numberClient',
        'monthReference',
        'electricityQuantity',
        'sceeeEnergyQuantity',
        'compensatedEnergyQuantity',
      ],
    });

    const dataFormatted = [];

    for (const invoice of invoices) {
      invoice.electricityQuantity = invoice.electricityQuantity || 0;
      invoice.sceeeEnergyQuantity = invoice.sceeeEnergyQuantity || 0;
      invoice.compensatedEnergyQuantity =
        invoice.compensatedEnergyQuantity || 0;

      const client = dataFormatted.find(
        (item) => item.numberClient === invoice.numberClient,
      );

      if (client) {
        client.data.electricPowerConsumption +=
          invoice.electricityQuantity + invoice.sceeeEnergyQuantity;
        client.data.compensatedEnergy += invoice.compensatedEnergyQuantity;
      } else {
        dataFormatted.push({
          numberClient: invoice.numberClient,
          data: {
            electricPowerConsumption:
              invoice.electricityQuantity + invoice.sceeeEnergyQuantity,
            compensatedEnergy: invoice.compensatedEnergyQuantity,
          },
        });
      }
    }
    return dataFormatted;
  }

  public async valuePerCliet() {
    const invoices = await this.invoiceRepository.findAll({
      attributes: [
        'numberClient',
        'monthReference',
        'electricityValue',
        'sceeeEnergyValue',
        'compensatedEnergyValue',
        'publicContribution',
      ],
    });

    const dataFormatted = [];

    for (const invoice of invoices) {
      invoice.electricityValue = invoice.electricityValue || 0;
      invoice.sceeeEnergyValue = invoice.sceeeEnergyValue || 0;
      invoice.compensatedEnergyValue = invoice.compensatedEnergyValue || 0;
      invoice.publicContribution = invoice.publicContribution || 0;

      const client = dataFormatted.find(
        (item) => item.numberClient === invoice.numberClient,
      );

      if (client) {
        client.data.valueTotal +=
          invoice.electricityValue +
          invoice.sceeeEnergyValue +
          invoice.publicContribution;
        client.data.economy += invoice.compensatedEnergyValue;
      } else {
        dataFormatted.push({
          numberClient: invoice.numberClient,
          data: {
            valueTotal:
              invoice.electricityValue +
              invoice.sceeeEnergyValue +
              invoice.publicContribution,
            economy: invoice.compensatedEnergyValue,
          },
        });
      }
    }
    return dataFormatted;
  }
}
