import { int, mysqlEnum, mysqlTable, text, timestamp, varchar, boolean } from "drizzle-orm/mysql-core";

/**
 * Core user table backing auth flow.
 * Extend this file with additional tables as your product grows.
 * Columns use camelCase to match both database fields and generated types.
 */
export const users = mysqlTable("users", {
  /**
   * Surrogate primary key. Auto-incremented numeric value managed by the database.
   * Use this for relations between tables.
   */
  id: int("id").autoincrement().primaryKey(),
  /** Manus OAuth identifier (openId) returned from the OAuth callback. Unique per user. */
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

/**
 * Email verification codes table
 * Stores temporary verification codes sent to users
 */
export const emailVerifications = mysqlTable("email_verifications", {
  id: int("id").autoincrement().primaryKey(),
  email: varchar("email", { length: 320 }).notNull(),
  code: varchar("code", { length: 6 }).notNull(),
  expiresAt: timestamp("expiresAt").notNull(),
  verified: boolean("verified").default(false).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type EmailVerification = typeof emailVerifications.$inferSelect;
export type InsertEmailVerification = typeof emailVerifications.$inferInsert;

/**
 * Bookings table
 * Stores all inspection booking requests
 */
export const bookings = mysqlTable("bookings", {
  id: int("id").autoincrement().primaryKey(),
  
  // Booking reference number (e.g., SAL-2024-001234)
  bookingReference: varchar("bookingReference", { length: 50 }).notNull().unique(),
  
  // Service type
  serviceType: mysqlEnum("serviceType", [
    "periodic", // فحص دوري
    "pre_purchase", // فحص قبل الشراء
    "roadside", // فحص على الطريق
    "roadside_assistance", // المساعدة على الطريق
    "vehicle_towing", // نقل المركبات المعطلة
    "on_site_repair", // تصليح ميداني
    "garage_repair", // تصليح في الكراجات
    "technical_inspection", // فحص فني شامل
  ]).notNull(),
  
  // Customer information
  customerName: varchar("customerName", { length: 255 }).notNull(),
  customerEmail: varchar("customerEmail", { length: 320 }).notNull(),
  customerPhone: varchar("customerPhone", { length: 20 }).notNull(),
  
  // Vehicle information
  vehicleMake: varchar("vehicleMake", { length: 100 }).notNull(),
  vehicleModel: varchar("vehicleModel", { length: 100 }).notNull(),
  vehicleYear: int("vehicleYear").notNull(),
  vehiclePlateNumber: varchar("vehiclePlateNumber", { length: 50 }),
  vehicleVIN: varchar("vehicleVIN", { length: 50 }),
  
  // Booking details
  preferredDate: timestamp("preferredDate").notNull(),
  preferredTime: varchar("preferredTime", { length: 20 }).notNull(),
  location: text("location"),
  notes: text("notes"),
  
  // Status
  status: mysqlEnum("status", [
    "pending", // في الانتظار
    "confirmed", // مؤكد
    "completed", // مكتمل
    "cancelled", // ملغي
  ]).default("pending").notNull(),
  
  // Email verified
  emailVerified: boolean("emailVerified").default(false).notNull(),
  
  // Confirmation
  confirmed: boolean("confirmed").default(false).notNull(),
  confirmationToken: varchar("confirmationToken", { length: 100 }),
  
  // Timestamps
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Booking = typeof bookings.$inferSelect;
export type InsertBooking = typeof bookings.$inferInsert;