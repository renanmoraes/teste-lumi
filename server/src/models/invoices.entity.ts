import { Table, Column, Model } from 'sequelize-typescript';

@Table
export class Invoices extends Model<Invoices> {
  @Column
  numberClient: string;

  @Column
  numberInstalation: string;

  @Column
  monthReference: string;

  @Column({
    type: 'FLOAT',
    allowNull: true,
  })
  electricityQuantity: number;

  @Column({
    type: 'FLOAT',
    allowNull: true,
  })
  electricityValue: number;

  @Column({
    type: 'FLOAT',
    allowNull: true,
  })
  sceeeEnergyQuantity: number;

  @Column({
    type: 'FLOAT',
    allowNull: true,
  })
  sceeeEnergyValue: number;

  @Column({
    type: 'FLOAT',
    allowNull: true,
  })
  compensatedEnergyQuantity: number;

  @Column({
    type: 'FLOAT',
    allowNull: true,
  })
  compensatedEnergyValue: number;

  @Column({
    type: 'DECIMAL(10, 2)',
    allowNull: true,
  })
  publicContribution: number;

  @Column({
    type: 'FLOAT',
    allowNull: false,
  })
  totalValue: number;

  @Column({
    type: 'bytea',
    allowNull: true,
  })
  pdfData: Buffer;
}

export const invoicesProviders = [
  {
    provide: 'INVOICES_REPOSITORY',
    useValue: Invoices,
  },
];
