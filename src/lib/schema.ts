import { pgTable, text, timestamp } from "drizzle-orm/pg-core";

export const projects = pgTable("projects", {
  id: text("id").primaryKey(),
  title: text("title").notNull(),
  client: text("client"),
  tags: text("tags"), // Comma separated
  problem: text("problem"),
  strategy: text("strategy"),
  execution: text("execution"),
  result: text("result"),
  description: text("description"), // Keeping for backward compatibility or extra context
  createdAt: timestamp("created_at").defaultNow(),
});

export const services = pgTable("services", {
  id: text("id").primaryKey(),
  title: text("title").notNull(),
  icon: text("icon").notNull(), // Lucide icon name
  problem: text("problem"),
  solution: text("solution"),
  outcome: text("outcome"),
  link: text("link"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const experiences = pgTable("experiences", {
  id: text("id").primaryKey(),
  role: text("role").notNull(),
  company: text("company").notNull(),
  period: text("period"),
  location: text("location"),
  description: text("description"), // Split by newlines or JSON
  createdAt: timestamp("created_at").defaultNow(),
});

export const blogPosts = pgTable("blog_posts", {
  id: text("id").primaryKey(),
  title: text("title").notNull(),
  slug: text("slug").notNull().unique(),
  date: text("date"), // Keeping for backward compatibility
  publishedAt: timestamp("published_at").defaultNow(),
  category: text("category"),
  excerpt: text("excerpt"),
  content: text("content"),
  author: text("author").default("Shibil S"),
  readingTime: text("reading_time"),
  imageUrl: text("image_url"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const certificates = pgTable("certificates", {
  id: text("id").primaryKey(),
  title: text("title").notNull(),
  issuer: text("issuer").notNull(),
  date: text("date"),
  link: text("link"),
  icon: text("icon"), // Lucide icon name
  createdAt: timestamp("created_at").defaultNow(),
});

export const skills = pgTable("skills", {
  id: text("id").primaryKey(),
  category: text("category").notNull(),
  skillsList: text("skills_list").notNull(), // Comma separated
  createdAt: timestamp("created_at").defaultNow(),
});

export const profile = pgTable("profile", {
  id: text("id").primaryKey(), // We'll use a constant ID like 'me'
  name: text("name").notNull(),
  role: text("role").notNull(),
  headline: text("headline"),
  subHeadline: text("sub_headline"),
  bio: text("bio"),
  location: text("location"),
  education: text("education"),
  email: text("email"),
  phone: text("phone"),
  linkedin: text("linkedin"),
  github: text("github"),
  resumeUrl: text("resume_url"),
  profileImageUrl: text("profile_image_url"),
  updatedAt: timestamp("updated_at").defaultNow(),
});
