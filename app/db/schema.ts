import { pgTable, text, serial, integer } from "drizzle-orm/pg-core";

export const sellers = pgTable("sellers", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  bio: text("bio"),
});

export const products = pgTable("products", {
  id: serial("id").primaryKey(),
  sellerId: integer("seller_id").references(() => sellers.id),
  name: text("name").notNull(),
  description: text("description"),
  price: integer("price").notNull(),
});