CREATE TABLE `bookings` (
	`id` int AUTO_INCREMENT NOT NULL,
	`serviceType` enum('periodic','pre_purchase','roadside') NOT NULL,
	`customerName` varchar(255) NOT NULL,
	`customerEmail` varchar(320) NOT NULL,
	`customerPhone` varchar(20) NOT NULL,
	`vehicleMake` varchar(100) NOT NULL,
	`vehicleModel` varchar(100) NOT NULL,
	`vehicleYear` int NOT NULL,
	`vehiclePlateNumber` varchar(50),
	`vehicleVIN` varchar(50),
	`preferredDate` timestamp NOT NULL,
	`preferredTime` varchar(20) NOT NULL,
	`location` text,
	`notes` text,
	`status` enum('pending','confirmed','completed','cancelled') NOT NULL DEFAULT 'pending',
	`emailVerified` boolean NOT NULL DEFAULT false,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `bookings_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `email_verifications` (
	`id` int AUTO_INCREMENT NOT NULL,
	`email` varchar(320) NOT NULL,
	`code` varchar(6) NOT NULL,
	`expiresAt` timestamp NOT NULL,
	`verified` boolean NOT NULL DEFAULT false,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `email_verifications_id` PRIMARY KEY(`id`)
);
