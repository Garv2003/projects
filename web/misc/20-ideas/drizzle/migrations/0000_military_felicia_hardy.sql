CREATE TABLE `ideas` (
	`id` text PRIMARY KEY NOT NULL,
	`username` text NOT NULL,
	`description` text NOT NULL,
	`votes` integer NOT NULL,
	`created_at` text NOT NULL,
	`updated_at` text NOT NULL
);
