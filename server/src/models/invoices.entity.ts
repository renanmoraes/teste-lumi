import { Table, Column, Model } from 'sequelize-typescript';

@Table
export class Invoices extends Model {
  @Column
  numberClient: string;

  @Column
  monthReference: string;

  @Column({
    type: 'DECIMAL(10, 3)',
    allowNull: false,
  })
  electricityQuantity: number;

  @Column({
    type: 'DECIMAL(10, 8)',
    allowNull: false,
  })
  electricityValue: number;

  @Column({
    type: 'DECIMAL(10, 3)',
    allowNull: false,
  })
  sceeeEnergyQuantity: number;

  @Column({
    type: 'DECIMAL(10, 8)',
    allowNull: false,
  })
  sceeeEnergyValue: number;

  @Column({
    type: 'DECIMAL(10, 3)',
    allowNull: false,
  })
  compensatedEnergyQuantity: number;

  @Column({
    type: 'DECIMAL(10, 8)',
    allowNull: false,
  })
  compensatedEnergyValue: number;

  @Column({
    type: 'DECIMAL(10, 2)',
    allowNull: false,
  })
  publicContribution: number;

  @Column({
    type: 'DECIMAL(10, 8)',
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
