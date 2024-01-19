import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UsePipes,
} from '@nestjs/common';
import { CustomersService } from './customers.service';
import {
  CreateCustomerDto,
  createCustomerSchema,
} from './dto/create-customer.dto';
import {
  UpdateCustomerDto,
  updateCustomerSchema,
} from './dto/update-customer.dto';
import { ZodValidationPipe } from './validation.pipe';
import { ApiBody, ApiOkResponse } from '@nestjs/swagger';
import { zodToOpenAPI } from 'nestjs-zod';
import { listCustomerSchema } from './dto/list-customer.dto';

@Controller('customers')
export class CustomersController {
  constructor(private readonly customersService: CustomersService) {}

  @Post()
  @UsePipes(new ZodValidationPipe(createCustomerSchema))
  @ApiBody({ schema: zodToOpenAPI(createCustomerSchema) })
  @ApiOkResponse({
    type: Number,
  })
  create(@Body() createCustomerDto: CreateCustomerDto) {
    return this.customersService.create(createCustomerDto);
  }

  @Get()
  // @UsePipes(new ZodValidationPipe(listCustomerSchema))
  @ApiOkResponse({
    schema: zodToOpenAPI(listCustomerSchema),
  })
  findAll() {
    return this.customersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.customersService.findOne(+id);
  }

  @Patch(':id')
  @UsePipes(new ZodValidationPipe(updateCustomerSchema))
  update(
    @Param('id') id: string,
    @Body() updateCustomerDto: UpdateCustomerDto,
  ) {
    return this.customersService.update(+id, updateCustomerDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.customersService.remove(+id);
  }
}
