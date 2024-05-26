import { Inject, Injectable } from '@nestjs/common';
import { Invoices } from 'src/models/invoices.entity';
import * as pdfParse from 'pdf-parse';
import * as fs from 'fs';
import { formatCurrencyValue } from 'src/core/functions';
import { promisify } from 'util';
const unlinkAsync = promisify(fs.unlink);

@Injectable()
export class InvoiceService {
  REGEX = {
    monthReference: /Referente a\s+(.+)\s+(.+)/,
    numberClient: /Nº DA INSTALAÇÃO\s+(\d.+)\s+(\d+)/,
    scee: /Energia SCEE ISENTAkWh\s+(\d.+)\s+([\d,.]+)\s+([\d.,-]+)\s+([\d,.]+)/,
    sceeWithoutICMS:
      /Energia SCEE s\/ ICMSkWh\s+(\d.+)\s+([\d,.]+)\s+([\d.,-]+)\s+([\d,.]+)/,
    energy:
      /Energia ElétricakWh\s+(\d.+)\s+([\d,.-]+)\s+([\d,.-]+)\s+([\d,.]+)/,
    compensated:
      /Energia compensada GD IkWh\s+(\d.+)\s+([\d,]+)\s+([\d.,-]+)\s+([\d,.]+)/,
    publicContribution: /Contrib Ilum Publica Municipal\s+([\d,]+)/,
    total: /TOTAL\s+([\d,.]+)/,
  };

  constructor(
    @Inject('INVOICES_REPOSITORY')
    private invoiceRepository: typeof Invoices,
  ) {}

  async extractTextFromPdf(path: string) {
    const dataBuffer = fs.readFileSync(path);
    const pdfData = await pdfParse(dataBuffer);
    const invoice: Invoices = new Invoices();
    const pdfBuffer = fs.readFileSync(path);

    const monthReference = this.REGEX.monthReference.exec(pdfData.text);
    const matchNumberClient = this.REGEX.numberClient.exec(pdfData.text);
    const matchSCEE = this.REGEX.scee.exec(pdfData.text);
    const matchSCEEWithoutICMS = this.REGEX.sceeWithoutICMS.exec(pdfData.text);
    const matchEnergy = this.REGEX.energy.exec(pdfData.text);
    const matchCompensatedEnergy = this.REGEX.compensated.exec(pdfData.text);
    const matchPublicContribution = this.REGEX.publicContribution.exec(
      pdfData.text,
    );
    const matchTotal = this.REGEX.total.exec(pdfData.text);

    if (monthReference) {
      invoice.monthReference = monthReference[2].slice(0, 8);
    }

    if (matchNumberClient) {
      invoice.numberClient = matchNumberClient[1];

      invoice.numberInstalation = matchNumberClient[2];
    }

    if (matchSCEE) {
      invoice.sceeeEnergyQuantity = formatCurrencyValue(matchSCEE[1]);

      invoice.sceeeEnergyValue = formatCurrencyValue(matchSCEE[3]);
    } else if (matchSCEEWithoutICMS) {
      invoice.sceeeEnergyQuantity = formatCurrencyValue(
        matchSCEEWithoutICMS[1],
      );

      invoice.sceeeEnergyValue = formatCurrencyValue(matchSCEEWithoutICMS[3]);
    }

    if (matchEnergy) {
      invoice.electricityQuantity = formatCurrencyValue(matchEnergy[1]);

      invoice.electricityValue = formatCurrencyValue(matchEnergy[3]);
    }

    if (matchCompensatedEnergy) {
      invoice.compensatedEnergyQuantity = formatCurrencyValue(
        matchCompensatedEnergy[1],
      );

      invoice.compensatedEnergyValue = formatCurrencyValue(
        matchCompensatedEnergy[3],
      );
    }

    if (matchPublicContribution) {
      invoice.publicContribution = formatCurrencyValue(
        matchPublicContribution[1],
      );
    }

    if (matchTotal) {
      invoice.totalValue = formatCurrencyValue(matchTotal[1]);
    }

    invoice.pdfData = pdfBuffer;

    await invoice.save();

    await unlinkAsync(path);

    return 'Valores extraidos com sucesso.';
  }

  async extractTextFromPdfBatch(files: Array<Express.Multer.File>) {
    for (const file of files) {
      await this.extractTextFromPdf(file.path);
    }

    return 'Valores extraidos com sucesso.';
  }

  async getPdfData(id: number): Promise<Buffer> {
    const invoice = await this.invoiceRepository.findByPk(id);

    if (!invoice || !invoice.pdfData) {
      throw new Error('PDF data not found');
    }

    return invoice.pdfData;
  }
}
