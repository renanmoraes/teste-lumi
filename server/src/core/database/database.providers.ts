import { ConfigService } from '@nestjs/config';
import { Sequelize } from 'sequelize-typescript';
import { Invoices } from 'src/models/invoices.entity';

export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: async (configService: ConfigService) => {
      const sequelize = new Sequelize({
        dialect: 'postgres',
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USER'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_NAME'),
        logging: configService.get<string>('DB_LOGGING') === 'true',
      });
      sequelize.addModels([Invoices]);
      await sequelize.sync({ alter: true });
      return sequelize;
    },
    inject: [ConfigService],
  },
];
