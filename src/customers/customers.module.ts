import { Module } from '@nestjs/common';
import { CustomersService } from './customers.service';
import { CustomersController } from './customers.controller';
import { DrizzleModule } from 'src/drizzle/drizzle.module';

@Module({
  controllers: [CustomersController],
  providers: [CustomersService],
  imports: [DrizzleModule],
})
export class CustomersModule {}
