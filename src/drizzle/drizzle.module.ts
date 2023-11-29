import { Module } from '@nestjs/common';
import { drizzle } from 'drizzle-orm/mysql2';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as schema from './schema';
import { createConnection } from 'mysql2/promise';

import drizzleConfig from './drizzle.config';
import { EnvironmentVariables } from './drizzle.interface';

export const DB_CONNECTION = 'DB_DEV_LOCAL';

@Module({
  providers: [
    {
      provide: DB_CONNECTION,
      inject: [ConfigService],
      useFactory: async (
        configService: ConfigService<EnvironmentVariables>,
      ) => {
        const connection = await createConnection({
          host: configService.get('host'),
          port: configService.get('port'),
          user: configService.get('user'),
          password: configService.get('password'),
          database: configService.get('database'),
        });

        return drizzle(connection, { mode: 'default', schema });
      },
    },
  ],
  imports: [
    ConfigModule.forRoot({
      load: [drizzleConfig],
    }),
  ],

  exports: [DB_CONNECTION],
})
export class DrizzleModule {}
