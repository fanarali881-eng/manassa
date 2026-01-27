ALTER TABLE `bookings` ADD `bookingReference` varchar(50) NOT NULL;--> statement-breakpoint
ALTER TABLE `bookings` ADD `confirmed` boolean DEFAULT false NOT NULL;--> statement-breakpoint
ALTER TABLE `bookings` ADD `confirmationToken` varchar(100);--> statement-breakpoint
ALTER TABLE `bookings` ADD CONSTRAINT `bookings_bookingReference_unique` UNIQUE(`bookingReference`);