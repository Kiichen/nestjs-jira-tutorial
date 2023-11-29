import {
  serial,
  int,
  mysqlTable,
  varchar,
  timestamp,
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
