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
    allowNull: false,
  })
  electricityQuantity: number;

  @Column({
    type: 'FLOAT',
    allowNull: false,
  })
  electricityValue: number;

  @Column({
    type: 'FLOAT',
    allowNull: false,
  })
  sceeeEnergyQuantity: number;

  @Column({
    type: 'FLOAT',
    allowNull: false,
  })
  sceeeEnergyValue: number;

  @Column({
    type: 'FLOAT',
    allowNull: false,
  })
  compensatedEnergyQuantity: number;

  @Column({
    type: 'FLOAT',
    allowNull: false,
  })
  compensatedEnergyValue: number;

  @Column({
    type: 'DECIMAL(10, 2)',
    allowNull: false,
  })
  publicContribution: number;

  @Column({
    type: 'FLOAT',
    allowNull: false,
  })
  totalValue: number;
}

export const invoicesProviders = [
  {
    provide: 'INVOICES_REPOSITORY',
    useValue: Invoices,
  },
];
