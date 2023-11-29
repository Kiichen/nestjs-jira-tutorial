CREATE TABLE `employees` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`display_name` varchar(255) NOT NULL,
	`email` varchar(255),
	`employee_workload` int NOT NULL,
	`vacation_days` int NOT NULL DEFAULT 30,
	`jira_id` varchar(255) NOT NULL,
	`created_at` timestamp DEFAULT (now()),
	`updated_at` timestamp ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `employees_id` PRIMARY KEY(`id`)
);
