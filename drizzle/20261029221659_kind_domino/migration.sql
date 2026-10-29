CREATE TABLE "account" (
	"id" text PRIMARY KEY,
	"account_id" text NOT NULL,
	"provider_id" text NOT NULL,
	"user_id" text NOT NULL,
	"access_token" text,
	"refresh_token" text,
	"id_token" text,
	"access_token_expires_at" timestamp,
	"refresh_token_expires_at" timestamp,
	"scope" text,
	"password" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "admins" (
	"id" text PRIMARY KEY,
	"email" text NOT NULL UNIQUE,
	"password_hash" text NOT NULL,
	"name" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "cta_banner" (
	"id" text PRIMARY KEY DEFAULT 'default',
	"headline" text NOT NULL,
	"subtext" text,
	"button_text" text NOT NULL,
	"button_href" text NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "footer_links" (
	"id" text PRIMARY KEY,
	"label" text NOT NULL,
	"href" text NOT NULL,
	"order" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE "footer_section" (
	"id" text PRIMARY KEY DEFAULT 'default',
	"contact_address" text NOT NULL,
	"contact_phone" text NOT NULL,
	"contact_email" text NOT NULL,
	"newsletter_title" text NOT NULL,
	"newsletter_description" text NOT NULL,
	"newsletter_placeholder" text NOT NULL,
	"copyright" text NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "footer_social_media" (
	"id" text PRIMARY KEY,
	"platform" text NOT NULL,
	"href" text NOT NULL,
	"icon" text NOT NULL,
	"order" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE "hero_buttons" (
	"id" text PRIMARY KEY,
	"text" text NOT NULL,
	"href" text NOT NULL,
	"variant" text NOT NULL,
	"order" integer NOT NULL,
	"hero_id" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "hero_section" (
	"id" text PRIMARY KEY DEFAULT 'default',
	"headline" text NOT NULL,
	"subtext" text NOT NULL,
	"background_video" text,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "knowledge_items" (
	"id" text PRIMARY KEY,
	"section" text NOT NULL,
	"title" text NOT NULL,
	"slug" text NOT NULL UNIQUE,
	"summary" text NOT NULL,
	"content" text,
	"cover_image" text NOT NULL,
	"attachment_url" text,
	"attachment_name" text,
	"attachment_size" integer,
	"published_at" timestamp NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "news" (
	"id" text PRIMARY KEY,
	"title" text NOT NULL,
	"excerpt" text NOT NULL,
	"content" text,
	"thumbnail" text NOT NULL,
	"category" text NOT NULL,
	"slug" text NOT NULL UNIQUE,
	"read_time" text,
	"featured" boolean DEFAULT false NOT NULL,
	"published_at" timestamp NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "opportunities" (
	"id" text PRIMARY KEY,
	"title" text NOT NULL,
	"slug" text NOT NULL UNIQUE,
	"type" text NOT NULL,
	"reference_number" text,
	"summary" text NOT NULL,
	"description" text,
	"department" text,
	"location" text,
	"work_mode" text,
	"employment_type" text,
	"requirements" text,
	"qualifications" text,
	"responsibilities" text,
	"application_email" text,
	"application_link" text,
	"application_instructions" text,
	"deadline" timestamp,
	"issued_date" timestamp,
	"is_active" boolean DEFAULT true NOT NULL,
	"is_featured" boolean DEFAULT false NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "opportunity_attachments" (
	"id" text PRIMARY KEY,
	"opportunity_id" text NOT NULL,
	"file_name" text NOT NULL,
	"file_url" text NOT NULL,
	"file_type" text,
	"file_size" integer,
	"order" integer DEFAULT 0 NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "partners" (
	"id" text PRIMARY KEY,
	"name" text NOT NULL,
	"logo" text NOT NULL,
	"website" text,
	"order" integer NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "programme_sponsors" (
	"id" text PRIMARY KEY,
	"programme_id" text NOT NULL,
	"name" text NOT NULL,
	"logo" text NOT NULL,
	"order" integer NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "programmes" (
	"id" text PRIMARY KEY,
	"title" text NOT NULL,
	"slug" text NOT NULL UNIQUE,
	"description" text NOT NULL,
	"image" text NOT NULL,
	"header_image" text,
	"color" text NOT NULL,
	"order" integer NOT NULL,
	"is_active" boolean DEFAULT false NOT NULL,
	"category" text DEFAULT 'flagship' NOT NULL,
	"application_link" text,
	"introduction" text,
	"application_process" text,
	"criteria" text,
	"eligibility" text,
	"application_selection" text,
	"technical_support" text,
	"definitions" text,
	"terms" text,
	"scoring_system" text,
	"fraud_policy" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "session" (
	"id" text PRIMARY KEY,
	"expires_at" timestamp NOT NULL,
	"token" text NOT NULL UNIQUE,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"ip_address" text,
	"user_agent" text,
	"user_id" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "statistics" (
	"id" text PRIMARY KEY,
	"label" text NOT NULL,
	"value" integer NOT NULL,
	"suffix" text,
	"icon" text NOT NULL,
	"order" integer NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "team_members" (
	"id" text PRIMARY KEY,
	"name" text NOT NULL,
	"role" text NOT NULL,
	"category" text DEFAULT 'Other' NOT NULL,
	"bio" text,
	"photo" text NOT NULL,
	"email" text,
	"linkedin" text,
	"twitter" text,
	"order" integer NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "user" (
	"id" text PRIMARY KEY,
	"name" text NOT NULL,
	"email" text NOT NULL UNIQUE,
	"email_verified" boolean DEFAULT false NOT NULL,
	"image" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "verification" (
	"id" text PRIMARY KEY,
	"identifier" text NOT NULL,
	"value" text NOT NULL,
	"expires_at" timestamp NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "whistleblower_reports" (
	"id" text PRIMARY KEY,
	"reference_number" text NOT NULL UNIQUE,
	"category" text NOT NULL,
	"subject" text NOT NULL,
	"description" text NOT NULL,
	"incident_date" timestamp,
	"department" text,
	"involved_parties" text,
	"evidence" text,
	"contact_email" text,
	"is_anonymous" boolean DEFAULT true NOT NULL,
	"status" text DEFAULT 'new' NOT NULL,
	"admin_notes" text,
	"reviewed_by" text,
	"reviewed_at" timestamp,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE INDEX "footer_links_order_idx" ON "footer_links" ("order");--> statement-breakpoint
CREATE INDEX "footer_social_media_order_idx" ON "footer_social_media" ("order");--> statement-breakpoint
CREATE INDEX "hero_buttons_order_idx" ON "hero_buttons" ("order");--> statement-breakpoint
CREATE INDEX "knowledge_items_section_idx" ON "knowledge_items" ("section");--> statement-breakpoint
CREATE INDEX "knowledge_items_published_at_idx" ON "knowledge_items" ("published_at");--> statement-breakpoint
CREATE INDEX "news_slug_idx" ON "news" ("slug");--> statement-breakpoint
CREATE INDEX "news_published_at_idx" ON "news" ("published_at");--> statement-breakpoint
CREATE INDEX "opportunities_slug_idx" ON "opportunities" ("slug");--> statement-breakpoint
CREATE INDEX "opportunities_type_idx" ON "opportunities" ("type");--> statement-breakpoint
CREATE INDEX "opportunities_active_idx" ON "opportunities" ("is_active");--> statement-breakpoint
CREATE INDEX "opportunity_attachments_opportunity_idx" ON "opportunity_attachments" ("opportunity_id");--> statement-breakpoint
CREATE INDEX "opportunity_attachments_order_idx" ON "opportunity_attachments" ("order");--> statement-breakpoint
CREATE INDEX "partners_order_idx" ON "partners" ("order");--> statement-breakpoint
CREATE INDEX "programme_sponsors_programme_idx" ON "programme_sponsors" ("programme_id");--> statement-breakpoint
CREATE INDEX "programme_sponsors_order_idx" ON "programme_sponsors" ("order");--> statement-breakpoint
CREATE INDEX "programmes_order_idx" ON "programmes" ("order");--> statement-breakpoint
CREATE INDEX "programmes_slug_idx" ON "programmes" ("slug");--> statement-breakpoint
CREATE INDEX "statistics_order_idx" ON "statistics" ("order");--> statement-breakpoint
CREATE INDEX "team_members_order_idx" ON "team_members" ("order");--> statement-breakpoint
CREATE INDEX "team_members_category_idx" ON "team_members" ("category");--> statement-breakpoint
CREATE INDEX "whistleblower_status_idx" ON "whistleblower_reports" ("status");--> statement-breakpoint
CREATE INDEX "whistleblower_category_idx" ON "whistleblower_reports" ("category");--> statement-breakpoint
CREATE INDEX "whistleblower_created_at_idx" ON "whistleblower_reports" ("created_at");--> statement-breakpoint
ALTER TABLE "account" ADD CONSTRAINT "account_user_id_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE;--> statement-breakpoint
ALTER TABLE "hero_buttons" ADD CONSTRAINT "hero_buttons_hero_id_hero_section_id_fkey" FOREIGN KEY ("hero_id") REFERENCES "hero_section"("id") ON DELETE CASCADE;--> statement-breakpoint
ALTER TABLE "opportunity_attachments" ADD CONSTRAINT "opportunity_attachments_opportunity_id_opportunities_id_fkey" FOREIGN KEY ("opportunity_id") REFERENCES "opportunities"("id") ON DELETE CASCADE;--> statement-breakpoint
ALTER TABLE "programme_sponsors" ADD CONSTRAINT "programme_sponsors_programme_id_programmes_id_fkey" FOREIGN KEY ("programme_id") REFERENCES "programmes"("id") ON DELETE CASCADE;--> statement-breakpoint
ALTER TABLE "session" ADD CONSTRAINT "session_user_id_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE;