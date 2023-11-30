import {
  serial,
  int,
  mysqlTable,
  varchar,
  timestamp,
  bigint,
} from 'drizzle-orm/mysql-core';
import { relations } from 'drizzle-orm';

export const employees = mysqlTable('employees', {
  id: serial('id').primaryKey(),
  display_name: varchar('display_name', { length: 255 }).notNull(),
  email: varchar('email', { length: 255 }),
  employee_workload: int('employee_workload').notNull(),
  vacation_days: int('vacation_days').notNull().default(30),
  jira_id: varchar('jira_id', { length: 255 }).notNull(),
  created_at: timestamp('created_at').defaultNow(),
  updated_at: timestamp('updated_at').onUpdateNow(),
});

export const projects = mysqlTable('projects', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  status: varchar('status', {
    length: 255,
    enum: ['active', 'inactive'],
  }).default('active'),
  jira_id: varchar('jira_id', { length: 255 }).notNull(),
  customer_id: bigint('customer_id', {
    mode: 'number',
    unsigned: true,
  }).references(() => customers.id),
  created_at: timestamp('created_at').defaultNow(),
  updated_at: timestamp('updated_at').onUpdateNow(),
});

export const customers = mysqlTable('customers', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  status: varchar('status', { length: 255 }),
  sp_per_month: int('sp_per_month'),
  created_at: timestamp('created_at').defaultNow(),
  updated_at: timestamp('updated_at').onUpdateNow(),
});

export const customersRelations = relations(customers, ({ many }) => ({
  projects: many(projects),
}));

export const projectsRelations = relations(projects, ({ one }) => ({
  customer: one(customers),
}));
