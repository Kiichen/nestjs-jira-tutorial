import { Inject, Injectable } from '@nestjs/common';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { DB_CONNECTION } from 'src/drizzle/drizzle.module';
import { MySql2Database } from 'drizzle-orm/mysql2';
import * as schema from '../drizzle/schema';

@Injectable()
export class CustomersService {
  constructor(
    @Inject(DB_CONNECTION) private db: MySql2Database<typeof schema>,
  ) {}

  async create(createCustomerDto: CreateCustomerDto) {
    const customer = await this.db
      .insert(schema.customers)
      .values(createCustomerDto)
      .execute();
    return customer[0].insertId;
  }

  async findAll() {
    return await this.db.query.customers.findMany({ columns: { name: false } });
    // return this.db.select().from(schema.customers).execute();
  }

  findOne(id: number) {
    return `This action returns a #${id} customer`;
  }

  update(id: number, updateCustomerDto: UpdateCustomerDto) {
    return `This action updates a #${id} customer`;
  }

  remove(id: number) {
    return `This action removes a #${id} customer`;
  }
}
