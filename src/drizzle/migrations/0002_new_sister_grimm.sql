CREATE TABLE `employee_project` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`employee_id` bigint unsigned,
	`project_id` bigint unsigned,
	`created_at` timestamp DEFAULT (now()),
	`updated_at` timestamp ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `employee_project_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `employee_project` ADD CONSTRAINT `employee_project_employee_id_employees_id_fk` FOREIGN KEY (`employee_id`) REFERENCES `employees`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `employee_project` ADD CONSTRAINT `employee_project_project_id_projects_id_fk` FOREIGN KEY (`project_id`) REFERENCES `projects`(`id`) ON DELETE no action ON UPDATE no action;