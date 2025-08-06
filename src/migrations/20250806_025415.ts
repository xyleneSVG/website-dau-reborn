import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."subType" AS ENUM('text', 'email', 'number');
  CREATE TYPE "public"."enum_pages_blocks_contact_section_fields_form_field_layout" AS ENUM('single', 'double');
  CREATE TYPE "public"."enum_pages_blocks_contact_section_fields_form_field_type_single" AS ENUM('text', 'number', 'email', 'textarea', 'radio');
  CREATE TYPE "public"."enum_pages_blocks_contact_section_fields_form_field_type_double" AS ENUM('text', 'email', 'number');
  CREATE TABLE "pages_blocks_hero_section_greetings" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"has_include_image" boolean DEFAULT false,
  	"image_greeting_id" integer
  );
  
  CREATE TABLE "pages_blocks_hero_section_greetings_locales" (
  	"text_greeting" varchar DEFAULT '' NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_hero_section" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"greeting_illustration_left_id" integer NOT NULL,
  	"greeting_illustration_right_id" integer NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_zig_zag_list_section_content_lists" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"content_list_icon_id" integer NOT NULL,
  	"content_reference_page_id" integer
  );
  
  CREATE TABLE "pages_blocks_zig_zag_list_section_content_lists_locales" (
  	"content_list_title" varchar DEFAULT '' NOT NULL,
  	"content_list_description" varchar DEFAULT '' NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_zig_zag_list_section" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_zig_zag_list_section_locales" (
  	"section_title" varchar DEFAULT '' NOT NULL,
  	"section_subtitle" varchar DEFAULT '' NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_image_with_carousel_section_carousel_image" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"item_image_id" integer NOT NULL
  );
  
  CREATE TABLE "pages_blocks_image_with_carousel_section" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"section_illustration_id" integer NOT NULL,
  	"background_color" varchar NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_image_with_carousel_section_locales" (
  	"section_title" varchar DEFAULT '' NOT NULL,
  	"section_description" varchar DEFAULT '' NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_quad_grid_section_grid_lists" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"item_image_id" integer NOT NULL
  );
  
  CREATE TABLE "pages_blocks_quad_grid_section" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_quad_grid_section_locales" (
  	"section_title" varchar DEFAULT '' NOT NULL,
  	"section_subtitle" varchar DEFAULT '' NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_image_grid_carousel_section_grid_lists" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"item_image_id" integer NOT NULL
  );
  
  CREATE TABLE "pages_blocks_image_grid_carousel_section" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_image_grid_carousel_section_locales" (
  	"section_title" varchar DEFAULT '' NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_contact_section_fields_form_field_radio_options" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"option_radio_value" varchar,
  	"option_radio_label" varchar DEFAULT ''
  );
  
  CREATE TABLE "pages_blocks_contact_section_fields_form_sub_fields" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"sub_field_id" varchar,
  	"sub_field_type" "subType",
  	"sub_field_required" boolean DEFAULT false
  );
  
  CREATE TABLE "pages_blocks_contact_section_fields_form_sub_fields_locales" (
  	"sub_field_label" varchar DEFAULT '',
  	"sub_field_placeholder" varchar DEFAULT '',
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_contact_section_fields_form" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"field_layout" "enum_pages_blocks_contact_section_fields_form_field_layout" NOT NULL,
  	"field_id" varchar NOT NULL,
  	"field_type_single" "enum_pages_blocks_contact_section_fields_form_field_type_single",
  	"field_type_double" "enum_pages_blocks_contact_section_fields_form_field_type_double",
  	"field_required" boolean DEFAULT false
  );
  
  CREATE TABLE "pages_blocks_contact_section_fields_form_locales" (
  	"field_label" varchar DEFAULT '' NOT NULL,
  	"field_placeholder" varchar DEFAULT '',
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_contact_section" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"section_illustration_id" integer NOT NULL,
  	"button_section_color" varchar DEFAULT '#00DB05',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_contact_section_locales" (
  	"section_label" varchar DEFAULT '' NOT NULL,
  	"section_headline" varchar DEFAULT '' NOT NULL,
  	"section_description" varchar DEFAULT '' NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_layered_text_on_image_section" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"section_background_id" integer NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_layered_text_on_image_section_locales" (
  	"section_title" varchar DEFAULT '' NOT NULL,
  	"section_subtitle" varchar DEFAULT '' NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "illustrationTextCarousel_carousel_lists" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"carousel_image_id" integer NOT NULL,
  	"carousel_title" varchar DEFAULT '' NOT NULL,
  	"carousel_description" varchar DEFAULT '' NOT NULL
  );
  
  CREATE TABLE "illustrationTextCarousel" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "illustrationTextCarousel_locales" (
  	"section_title" varchar DEFAULT '' NOT NULL,
  	"section_description" varchar DEFAULT '' NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_image_header_paragraph_section" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"section_image_id" integer NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_image_header_paragraph_section_locales" (
  	"section_title" varchar DEFAULT '' NOT NULL,
  	"section_paragraph" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_image_header_three_column_section_grid_lists" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"item_title" varchar DEFAULT '' NOT NULL,
  	"item_description" varchar DEFAULT '' NOT NULL
  );
  
  CREATE TABLE "pages_blocks_image_header_three_column_section" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"section_header_image_id" integer NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_image_header_three_column_section_locales" (
  	"section_title" varchar DEFAULT '' NOT NULL,
  	"section_subtitle" varchar DEFAULT '' NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_circle_image_grid_section_grid_lists" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"item_image_id" integer NOT NULL,
  	"item_name" varchar DEFAULT '' NOT NULL,
  	"item_description" varchar DEFAULT '' NOT NULL
  );
  
  CREATE TABLE "pages_blocks_circle_image_grid_section" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_circle_image_grid_section_locales" (
  	"section_title" varchar DEFAULT '' NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_text_with_image_cluster_section_image_lists" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"item_image_id" integer NOT NULL
  );
  
  CREATE TABLE "pages_blocks_text_with_image_cluster_section" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"has_button" boolean DEFAULT false,
  	"button_icon" varchar,
  	"button_link_id" integer,
  	"button_color" varchar,
  	"reverse_content" boolean DEFAULT false,
  	"has_background" boolean DEFAULT false,
  	"background_color" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_text_with_image_cluster_section_locales" (
  	"section_headline" varchar DEFAULT '',
  	"section_title" varchar DEFAULT '' NOT NULL,
  	"section_description" jsonb,
  	"button_text" varchar DEFAULT '',
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_looping_carousel_section_carousel_lists" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"item_image_id" integer NOT NULL
  );
  
  CREATE TABLE "pages_blocks_looping_carousel_section" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_looping_carousel_section_locales" (
  	"section_title" varchar DEFAULT '' NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_list_with_icon_section_content_lists" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"content_icon" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_list_with_icon_section_content_lists_locales" (
  	"content_name" varchar DEFAULT '' NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_list_with_icon_section" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"background_page_color" varchar,
  	"icon_color" varchar,
  	"background_icon_color" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_list_with_icon_section_locales" (
  	"section_title" varchar DEFAULT '' NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_text_align_center_section" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_text_align_center_section_locales" (
  	"section_title" varchar DEFAULT '' NOT NULL,
  	"section_description" varchar DEFAULT '' NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_list_with_icon_description_section_content_lists" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"content_icon" varchar NOT NULL,
  	"content_name" varchar NOT NULL,
  	"content_description" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_list_with_icon_description_section" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"background_page_color" varchar,
  	"icon_color" varchar,
  	"background_icon_color" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_list_with_icon_description_section_locales" (
  	"section_title" varchar DEFAULT '' NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "left_list_arr" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"left_side_list_content" varchar NOT NULL
  );
  
  CREATE TABLE "right_list_arr" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"right_side_list_content" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_two_list_with_illustration_section" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"section_illustration_id" integer NOT NULL,
  	"left_side_list_title_color" varchar NOT NULL,
  	"left_side_list_color" varchar NOT NULL,
  	"right_side_list_title_color" varchar NOT NULL,
  	"right_side_list_color" varchar NOT NULL,
  	"has_button" boolean DEFAULT false,
  	"button_icon" varchar,
  	"button_link_id" integer,
  	"button_color" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_two_list_with_illustration_section_locales" (
  	"section_title" varchar DEFAULT '' NOT NULL,
  	"section_description" varchar DEFAULT '' NOT NULL,
  	"left_side_list_title" varchar DEFAULT '' NOT NULL,
  	"right_side_list_title" varchar DEFAULT '' NOT NULL,
  	"button_text" varchar DEFAULT '',
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_text_grid_section_grid_array" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"item_title" varchar NOT NULL,
  	"item_description" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_text_grid_section" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"header_color" varchar NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_text_grid_section_locales" (
  	"section_title" varchar DEFAULT '' NOT NULL,
  	"section_description" varchar DEFAULT '' NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "illustrationArray" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"section_illustration_id" integer NOT NULL
  );
  
  CREATE TABLE "pages_blocks_content_item" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"item_image_id" integer NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_content_item_locales" (
  	"item_title" varchar DEFAULT '' NOT NULL,
  	"item_description" varchar DEFAULT '' NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_icon_list_with_side_images_section" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_icon_list_with_side_images_section_locales" (
  	"section_title" varchar DEFAULT '' NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_card_with_image_section_card_array" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"item_thumbnail_id" integer NOT NULL
  );
  
  CREATE TABLE "pages_blocks_card_with_image_section_card_array_locales" (
  	"item_title" varchar DEFAULT '' NOT NULL,
  	"item_description" varchar DEFAULT '' NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_card_with_image_section" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"header_color" varchar NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_card_with_image_section_locales" (
  	"section_title" varchar DEFAULT '' NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_icon_text_item" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"item_icon" varchar NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_icon_text_item_locales" (
  	"item_title" varchar DEFAULT '' NOT NULL,
  	"item_description" varchar DEFAULT '' NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_icon_text_list_with_image_section" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"section_illustration_id" integer NOT NULL,
  	"icon_color" varchar,
  	"background_icon_color" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_icon_text_list_with_image_section_locales" (
  	"section_title" varchar DEFAULT '' NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_carousel_item" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"item_icon_id" integer NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_carousel_item_locales" (
  	"item_title" varchar DEFAULT '' NOT NULL,
  	"item_description" varchar DEFAULT '' NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_three_dimension_carousel_section" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_three_dimension_carousel_section_locales" (
  	"section_title" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_grid_image_section_grid_image" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer NOT NULL
  );
  
  CREATE TABLE "pages_blocks_grid_image_section_grid_image_locales" (
  	"image_description" varchar DEFAULT '' NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_grid_image_section" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_grid_image_section_locales" (
  	"section_title" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"page_name" varchar NOT NULL,
  	"page_default" boolean DEFAULT false,
  	"page_key" varchar DEFAULT 'Save first to get the key of this page',
  	"page_group_id" integer,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "navbar_navbar_item_array_navbar_dropdown" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"item_dropdown_icon" varchar,
  	"item_dropdown_reference_id" integer
  );
  
  CREATE TABLE "navbar_navbar_item_array_navbar_dropdown_locales" (
  	"item_dropdown_title" varchar DEFAULT '',
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "navbar_navbar_item_array" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"navbar_item_reference_id" integer,
  	"has_dropdown" boolean DEFAULT false
  );
  
  CREATE TABLE "navbar_navbar_item_array_locales" (
  	"navbar_item_name" varchar DEFAULT '' NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "navbar" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"active" boolean DEFAULT false,
  	"layout_navbar" varchar,
  	"navbar_logo_id" integer NOT NULL,
  	"accent_color" varchar,
  	"has_button_contact" boolean DEFAULT false,
  	"button_contact_reference_id" integer,
  	"button_contact_color" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "footer_footer_navigation_navigation_group_item" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"navigation_page_reference_id" integer NOT NULL
  );
  
  CREATE TABLE "footer_footer_navigation_navigation_group_item_locales" (
  	"navigation_page_name" varchar DEFAULT '' NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "footer_footer_navigation" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "footer_footer_navigation_locales" (
  	"navigation_group_title" varchar DEFAULT '' NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "footer" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"active" boolean DEFAULT false,
  	"layout_footer" varchar,
  	"footer_logo_id" integer NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "footer_locales" (
  	"footer_title" varchar DEFAULT '' NOT NULL,
  	"footer_description" varchar DEFAULT '' NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "recive_message" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"recived_data" jsonb,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "group_page" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"group_name" varchar NOT NULL,
  	"group_key" varchar DEFAULT 'Save first to get the key of this group',
  	"sub_group_from_id" integer,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "pages_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "navbar_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "footer_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "recive_message_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "group_page_id" integer;
  ALTER TABLE "pages_blocks_hero_section_greetings" ADD CONSTRAINT "pages_blocks_hero_section_greetings_image_greeting_id_media_id_fk" FOREIGN KEY ("image_greeting_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_hero_section_greetings" ADD CONSTRAINT "pages_blocks_hero_section_greetings_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_hero_section"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_hero_section_greetings_locales" ADD CONSTRAINT "pages_blocks_hero_section_greetings_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_hero_section_greetings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_hero_section" ADD CONSTRAINT "pages_blocks_hero_section_greeting_illustration_left_id_media_id_fk" FOREIGN KEY ("greeting_illustration_left_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_hero_section" ADD CONSTRAINT "pages_blocks_hero_section_greeting_illustration_right_id_media_id_fk" FOREIGN KEY ("greeting_illustration_right_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_hero_section" ADD CONSTRAINT "pages_blocks_hero_section_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_zig_zag_list_section_content_lists" ADD CONSTRAINT "pages_blocks_zig_zag_list_section_content_lists_content_list_icon_id_media_id_fk" FOREIGN KEY ("content_list_icon_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_zig_zag_list_section_content_lists" ADD CONSTRAINT "pages_blocks_zig_zag_list_section_content_lists_content_reference_page_id_pages_id_fk" FOREIGN KEY ("content_reference_page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_zig_zag_list_section_content_lists" ADD CONSTRAINT "pages_blocks_zig_zag_list_section_content_lists_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_zig_zag_list_section"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_zig_zag_list_section_content_lists_locales" ADD CONSTRAINT "pages_blocks_zig_zag_list_section_content_lists_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_zig_zag_list_section_content_lists"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_zig_zag_list_section" ADD CONSTRAINT "pages_blocks_zig_zag_list_section_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_zig_zag_list_section_locales" ADD CONSTRAINT "pages_blocks_zig_zag_list_section_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_zig_zag_list_section"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_image_with_carousel_section_carousel_image" ADD CONSTRAINT "pages_blocks_image_with_carousel_section_carousel_image_item_image_id_media_id_fk" FOREIGN KEY ("item_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_image_with_carousel_section_carousel_image" ADD CONSTRAINT "pages_blocks_image_with_carousel_section_carousel_image_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_image_with_carousel_section"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_image_with_carousel_section" ADD CONSTRAINT "pages_blocks_image_with_carousel_section_section_illustration_id_media_id_fk" FOREIGN KEY ("section_illustration_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_image_with_carousel_section" ADD CONSTRAINT "pages_blocks_image_with_carousel_section_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_image_with_carousel_section_locales" ADD CONSTRAINT "pages_blocks_image_with_carousel_section_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_image_with_carousel_section"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_quad_grid_section_grid_lists" ADD CONSTRAINT "pages_blocks_quad_grid_section_grid_lists_item_image_id_media_id_fk" FOREIGN KEY ("item_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_quad_grid_section_grid_lists" ADD CONSTRAINT "pages_blocks_quad_grid_section_grid_lists_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_quad_grid_section"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_quad_grid_section" ADD CONSTRAINT "pages_blocks_quad_grid_section_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_quad_grid_section_locales" ADD CONSTRAINT "pages_blocks_quad_grid_section_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_quad_grid_section"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_image_grid_carousel_section_grid_lists" ADD CONSTRAINT "pages_blocks_image_grid_carousel_section_grid_lists_item_image_id_media_id_fk" FOREIGN KEY ("item_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_image_grid_carousel_section_grid_lists" ADD CONSTRAINT "pages_blocks_image_grid_carousel_section_grid_lists_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_image_grid_carousel_section"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_image_grid_carousel_section" ADD CONSTRAINT "pages_blocks_image_grid_carousel_section_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_image_grid_carousel_section_locales" ADD CONSTRAINT "pages_blocks_image_grid_carousel_section_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_image_grid_carousel_section"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_contact_section_fields_form_field_radio_options" ADD CONSTRAINT "pages_blocks_contact_section_fields_form_field_radio_options_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_contact_section_fields_form"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_contact_section_fields_form_sub_fields" ADD CONSTRAINT "pages_blocks_contact_section_fields_form_sub_fields_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_contact_section_fields_form"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_contact_section_fields_form_sub_fields_locales" ADD CONSTRAINT "pages_blocks_contact_section_fields_form_sub_fields_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_contact_section_fields_form_sub_fields"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_contact_section_fields_form" ADD CONSTRAINT "pages_blocks_contact_section_fields_form_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_contact_section"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_contact_section_fields_form_locales" ADD CONSTRAINT "pages_blocks_contact_section_fields_form_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_contact_section_fields_form"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_contact_section" ADD CONSTRAINT "pages_blocks_contact_section_section_illustration_id_media_id_fk" FOREIGN KEY ("section_illustration_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_contact_section" ADD CONSTRAINT "pages_blocks_contact_section_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_contact_section_locales" ADD CONSTRAINT "pages_blocks_contact_section_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_contact_section"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_layered_text_on_image_section" ADD CONSTRAINT "pages_blocks_layered_text_on_image_section_section_background_id_media_id_fk" FOREIGN KEY ("section_background_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_layered_text_on_image_section" ADD CONSTRAINT "pages_blocks_layered_text_on_image_section_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_layered_text_on_image_section_locales" ADD CONSTRAINT "pages_blocks_layered_text_on_image_section_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_layered_text_on_image_section"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "illustrationTextCarousel_carousel_lists" ADD CONSTRAINT "illustrationTextCarousel_carousel_lists_carousel_image_id_media_id_fk" FOREIGN KEY ("carousel_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "illustrationTextCarousel_carousel_lists" ADD CONSTRAINT "illustrationTextCarousel_carousel_lists_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."illustrationTextCarousel"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "illustrationTextCarousel" ADD CONSTRAINT "illustrationTextCarousel_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "illustrationTextCarousel_locales" ADD CONSTRAINT "illustrationTextCarousel_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."illustrationTextCarousel"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_image_header_paragraph_section" ADD CONSTRAINT "pages_blocks_image_header_paragraph_section_section_image_id_media_id_fk" FOREIGN KEY ("section_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_image_header_paragraph_section" ADD CONSTRAINT "pages_blocks_image_header_paragraph_section_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_image_header_paragraph_section_locales" ADD CONSTRAINT "pages_blocks_image_header_paragraph_section_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_image_header_paragraph_section"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_image_header_three_column_section_grid_lists" ADD CONSTRAINT "pages_blocks_image_header_three_column_section_grid_lists_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_image_header_three_column_section"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_image_header_three_column_section" ADD CONSTRAINT "pages_blocks_image_header_three_column_section_section_header_image_id_media_id_fk" FOREIGN KEY ("section_header_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_image_header_three_column_section" ADD CONSTRAINT "pages_blocks_image_header_three_column_section_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_image_header_three_column_section_locales" ADD CONSTRAINT "pages_blocks_image_header_three_column_section_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_image_header_three_column_section"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_circle_image_grid_section_grid_lists" ADD CONSTRAINT "pages_blocks_circle_image_grid_section_grid_lists_item_image_id_media_id_fk" FOREIGN KEY ("item_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_circle_image_grid_section_grid_lists" ADD CONSTRAINT "pages_blocks_circle_image_grid_section_grid_lists_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_circle_image_grid_section"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_circle_image_grid_section" ADD CONSTRAINT "pages_blocks_circle_image_grid_section_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_circle_image_grid_section_locales" ADD CONSTRAINT "pages_blocks_circle_image_grid_section_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_circle_image_grid_section"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_text_with_image_cluster_section_image_lists" ADD CONSTRAINT "pages_blocks_text_with_image_cluster_section_image_lists_item_image_id_media_id_fk" FOREIGN KEY ("item_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_text_with_image_cluster_section_image_lists" ADD CONSTRAINT "pages_blocks_text_with_image_cluster_section_image_lists_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_text_with_image_cluster_section"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_text_with_image_cluster_section" ADD CONSTRAINT "pages_blocks_text_with_image_cluster_section_button_link_id_pages_id_fk" FOREIGN KEY ("button_link_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_text_with_image_cluster_section" ADD CONSTRAINT "pages_blocks_text_with_image_cluster_section_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_text_with_image_cluster_section_locales" ADD CONSTRAINT "pages_blocks_text_with_image_cluster_section_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_text_with_image_cluster_section"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_looping_carousel_section_carousel_lists" ADD CONSTRAINT "pages_blocks_looping_carousel_section_carousel_lists_item_image_id_media_id_fk" FOREIGN KEY ("item_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_looping_carousel_section_carousel_lists" ADD CONSTRAINT "pages_blocks_looping_carousel_section_carousel_lists_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_looping_carousel_section"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_looping_carousel_section" ADD CONSTRAINT "pages_blocks_looping_carousel_section_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_looping_carousel_section_locales" ADD CONSTRAINT "pages_blocks_looping_carousel_section_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_looping_carousel_section"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_list_with_icon_section_content_lists" ADD CONSTRAINT "pages_blocks_list_with_icon_section_content_lists_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_list_with_icon_section"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_list_with_icon_section_content_lists_locales" ADD CONSTRAINT "pages_blocks_list_with_icon_section_content_lists_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_list_with_icon_section_content_lists"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_list_with_icon_section" ADD CONSTRAINT "pages_blocks_list_with_icon_section_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_list_with_icon_section_locales" ADD CONSTRAINT "pages_blocks_list_with_icon_section_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_list_with_icon_section"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_text_align_center_section" ADD CONSTRAINT "pages_blocks_text_align_center_section_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_text_align_center_section_locales" ADD CONSTRAINT "pages_blocks_text_align_center_section_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_text_align_center_section"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_list_with_icon_description_section_content_lists" ADD CONSTRAINT "pages_blocks_list_with_icon_description_section_content_lists_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_list_with_icon_description_section"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_list_with_icon_description_section" ADD CONSTRAINT "pages_blocks_list_with_icon_description_section_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_list_with_icon_description_section_locales" ADD CONSTRAINT "pages_blocks_list_with_icon_description_section_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_list_with_icon_description_section"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "left_list_arr" ADD CONSTRAINT "left_list_arr_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_two_list_with_illustration_section"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "right_list_arr" ADD CONSTRAINT "right_list_arr_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_two_list_with_illustration_section"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_two_list_with_illustration_section" ADD CONSTRAINT "pages_blocks_two_list_with_illustration_section_section_illustration_id_media_id_fk" FOREIGN KEY ("section_illustration_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_two_list_with_illustration_section" ADD CONSTRAINT "pages_blocks_two_list_with_illustration_section_button_link_id_pages_id_fk" FOREIGN KEY ("button_link_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_two_list_with_illustration_section" ADD CONSTRAINT "pages_blocks_two_list_with_illustration_section_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_two_list_with_illustration_section_locales" ADD CONSTRAINT "pages_blocks_two_list_with_illustration_section_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_two_list_with_illustration_section"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_text_grid_section_grid_array" ADD CONSTRAINT "pages_blocks_text_grid_section_grid_array_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_text_grid_section"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_text_grid_section" ADD CONSTRAINT "pages_blocks_text_grid_section_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_text_grid_section_locales" ADD CONSTRAINT "pages_blocks_text_grid_section_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_text_grid_section"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "illustrationArray" ADD CONSTRAINT "illustrationArray_section_illustration_id_media_id_fk" FOREIGN KEY ("section_illustration_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "illustrationArray" ADD CONSTRAINT "illustrationArray_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_icon_list_with_side_images_section"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_content_item" ADD CONSTRAINT "pages_blocks_content_item_item_image_id_media_id_fk" FOREIGN KEY ("item_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_content_item" ADD CONSTRAINT "pages_blocks_content_item_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_content_item_locales" ADD CONSTRAINT "pages_blocks_content_item_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_content_item"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_icon_list_with_side_images_section" ADD CONSTRAINT "pages_blocks_icon_list_with_side_images_section_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_icon_list_with_side_images_section_locales" ADD CONSTRAINT "pages_blocks_icon_list_with_side_images_section_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_icon_list_with_side_images_section"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_card_with_image_section_card_array" ADD CONSTRAINT "pages_blocks_card_with_image_section_card_array_item_thumbnail_id_media_id_fk" FOREIGN KEY ("item_thumbnail_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_card_with_image_section_card_array" ADD CONSTRAINT "pages_blocks_card_with_image_section_card_array_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_card_with_image_section"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_card_with_image_section_card_array_locales" ADD CONSTRAINT "pages_blocks_card_with_image_section_card_array_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_card_with_image_section_card_array"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_card_with_image_section" ADD CONSTRAINT "pages_blocks_card_with_image_section_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_card_with_image_section_locales" ADD CONSTRAINT "pages_blocks_card_with_image_section_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_card_with_image_section"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_icon_text_item" ADD CONSTRAINT "pages_blocks_icon_text_item_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_icon_text_item_locales" ADD CONSTRAINT "pages_blocks_icon_text_item_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_icon_text_item"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_icon_text_list_with_image_section" ADD CONSTRAINT "pages_blocks_icon_text_list_with_image_section_section_illustration_id_media_id_fk" FOREIGN KEY ("section_illustration_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_icon_text_list_with_image_section" ADD CONSTRAINT "pages_blocks_icon_text_list_with_image_section_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_icon_text_list_with_image_section_locales" ADD CONSTRAINT "pages_blocks_icon_text_list_with_image_section_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_icon_text_list_with_image_section"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_carousel_item" ADD CONSTRAINT "pages_blocks_carousel_item_item_icon_id_media_id_fk" FOREIGN KEY ("item_icon_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_carousel_item" ADD CONSTRAINT "pages_blocks_carousel_item_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_carousel_item_locales" ADD CONSTRAINT "pages_blocks_carousel_item_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_carousel_item"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_three_dimension_carousel_section" ADD CONSTRAINT "pages_blocks_three_dimension_carousel_section_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_three_dimension_carousel_section_locales" ADD CONSTRAINT "pages_blocks_three_dimension_carousel_section_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_three_dimension_carousel_section"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_grid_image_section_grid_image" ADD CONSTRAINT "pages_blocks_grid_image_section_grid_image_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_grid_image_section_grid_image" ADD CONSTRAINT "pages_blocks_grid_image_section_grid_image_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_grid_image_section"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_grid_image_section_grid_image_locales" ADD CONSTRAINT "pages_blocks_grid_image_section_grid_image_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_grid_image_section_grid_image"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_grid_image_section" ADD CONSTRAINT "pages_blocks_grid_image_section_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_grid_image_section_locales" ADD CONSTRAINT "pages_blocks_grid_image_section_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_grid_image_section"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages" ADD CONSTRAINT "pages_page_group_id_group_page_id_fk" FOREIGN KEY ("page_group_id") REFERENCES "public"."group_page"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "navbar_navbar_item_array_navbar_dropdown" ADD CONSTRAINT "navbar_navbar_item_array_navbar_dropdown_item_dropdown_reference_id_pages_id_fk" FOREIGN KEY ("item_dropdown_reference_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "navbar_navbar_item_array_navbar_dropdown" ADD CONSTRAINT "navbar_navbar_item_array_navbar_dropdown_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."navbar_navbar_item_array"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "navbar_navbar_item_array_navbar_dropdown_locales" ADD CONSTRAINT "navbar_navbar_item_array_navbar_dropdown_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."navbar_navbar_item_array_navbar_dropdown"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "navbar_navbar_item_array" ADD CONSTRAINT "navbar_navbar_item_array_navbar_item_reference_id_pages_id_fk" FOREIGN KEY ("navbar_item_reference_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "navbar_navbar_item_array" ADD CONSTRAINT "navbar_navbar_item_array_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."navbar"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "navbar_navbar_item_array_locales" ADD CONSTRAINT "navbar_navbar_item_array_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."navbar_navbar_item_array"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "navbar" ADD CONSTRAINT "navbar_navbar_logo_id_media_id_fk" FOREIGN KEY ("navbar_logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "navbar" ADD CONSTRAINT "navbar_button_contact_reference_id_pages_id_fk" FOREIGN KEY ("button_contact_reference_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "footer_footer_navigation_navigation_group_item" ADD CONSTRAINT "footer_footer_navigation_navigation_group_item_navigation_page_reference_id_pages_id_fk" FOREIGN KEY ("navigation_page_reference_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "footer_footer_navigation_navigation_group_item" ADD CONSTRAINT "footer_footer_navigation_navigation_group_item_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footer_footer_navigation"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer_footer_navigation_navigation_group_item_locales" ADD CONSTRAINT "footer_footer_navigation_navigation_group_item_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footer_footer_navigation_navigation_group_item"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer_footer_navigation" ADD CONSTRAINT "footer_footer_navigation_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footer"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer_footer_navigation_locales" ADD CONSTRAINT "footer_footer_navigation_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footer_footer_navigation"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer" ADD CONSTRAINT "footer_footer_logo_id_media_id_fk" FOREIGN KEY ("footer_logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "footer_locales" ADD CONSTRAINT "footer_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footer"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "group_page" ADD CONSTRAINT "group_page_sub_group_from_id_group_page_id_fk" FOREIGN KEY ("sub_group_from_id") REFERENCES "public"."group_page"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "pages_blocks_hero_section_greetings_order_idx" ON "pages_blocks_hero_section_greetings" USING btree ("_order");
  CREATE INDEX "pages_blocks_hero_section_greetings_parent_id_idx" ON "pages_blocks_hero_section_greetings" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_hero_section_greetings_image_greeting_idx" ON "pages_blocks_hero_section_greetings" USING btree ("image_greeting_id");
  CREATE UNIQUE INDEX "pages_blocks_hero_section_greetings_locales_locale_parent_id_unique" ON "pages_blocks_hero_section_greetings_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_hero_section_order_idx" ON "pages_blocks_hero_section" USING btree ("_order");
  CREATE INDEX "pages_blocks_hero_section_parent_id_idx" ON "pages_blocks_hero_section" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_hero_section_path_idx" ON "pages_blocks_hero_section" USING btree ("_path");
  CREATE INDEX "pages_blocks_hero_section_greeting_illustration_left_idx" ON "pages_blocks_hero_section" USING btree ("greeting_illustration_left_id");
  CREATE INDEX "pages_blocks_hero_section_greeting_illustration_right_idx" ON "pages_blocks_hero_section" USING btree ("greeting_illustration_right_id");
  CREATE INDEX "pages_blocks_zig_zag_list_section_content_lists_order_idx" ON "pages_blocks_zig_zag_list_section_content_lists" USING btree ("_order");
  CREATE INDEX "pages_blocks_zig_zag_list_section_content_lists_parent_id_idx" ON "pages_blocks_zig_zag_list_section_content_lists" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_zig_zag_list_section_content_lists_content_list_icon_idx" ON "pages_blocks_zig_zag_list_section_content_lists" USING btree ("content_list_icon_id");
  CREATE INDEX "pages_blocks_zig_zag_list_section_content_lists_content_reference_page_idx" ON "pages_blocks_zig_zag_list_section_content_lists" USING btree ("content_reference_page_id");
  CREATE UNIQUE INDEX "pages_blocks_zig_zag_list_section_content_lists_locales_locale_parent_id_unique" ON "pages_blocks_zig_zag_list_section_content_lists_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_zig_zag_list_section_order_idx" ON "pages_blocks_zig_zag_list_section" USING btree ("_order");
  CREATE INDEX "pages_blocks_zig_zag_list_section_parent_id_idx" ON "pages_blocks_zig_zag_list_section" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_zig_zag_list_section_path_idx" ON "pages_blocks_zig_zag_list_section" USING btree ("_path");
  CREATE UNIQUE INDEX "pages_blocks_zig_zag_list_section_locales_locale_parent_id_unique" ON "pages_blocks_zig_zag_list_section_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_image_with_carousel_section_carousel_image_order_idx" ON "pages_blocks_image_with_carousel_section_carousel_image" USING btree ("_order");
  CREATE INDEX "pages_blocks_image_with_carousel_section_carousel_image_parent_id_idx" ON "pages_blocks_image_with_carousel_section_carousel_image" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_image_with_carousel_section_carousel_image_item_image_idx" ON "pages_blocks_image_with_carousel_section_carousel_image" USING btree ("item_image_id");
  CREATE INDEX "pages_blocks_image_with_carousel_section_order_idx" ON "pages_blocks_image_with_carousel_section" USING btree ("_order");
  CREATE INDEX "pages_blocks_image_with_carousel_section_parent_id_idx" ON "pages_blocks_image_with_carousel_section" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_image_with_carousel_section_path_idx" ON "pages_blocks_image_with_carousel_section" USING btree ("_path");
  CREATE INDEX "pages_blocks_image_with_carousel_section_section_illustration_idx" ON "pages_blocks_image_with_carousel_section" USING btree ("section_illustration_id");
  CREATE UNIQUE INDEX "pages_blocks_image_with_carousel_section_locales_locale_parent_id_unique" ON "pages_blocks_image_with_carousel_section_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_quad_grid_section_grid_lists_order_idx" ON "pages_blocks_quad_grid_section_grid_lists" USING btree ("_order");
  CREATE INDEX "pages_blocks_quad_grid_section_grid_lists_parent_id_idx" ON "pages_blocks_quad_grid_section_grid_lists" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_quad_grid_section_grid_lists_item_image_idx" ON "pages_blocks_quad_grid_section_grid_lists" USING btree ("item_image_id");
  CREATE INDEX "pages_blocks_quad_grid_section_order_idx" ON "pages_blocks_quad_grid_section" USING btree ("_order");
  CREATE INDEX "pages_blocks_quad_grid_section_parent_id_idx" ON "pages_blocks_quad_grid_section" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_quad_grid_section_path_idx" ON "pages_blocks_quad_grid_section" USING btree ("_path");
  CREATE UNIQUE INDEX "pages_blocks_quad_grid_section_locales_locale_parent_id_unique" ON "pages_blocks_quad_grid_section_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_image_grid_carousel_section_grid_lists_order_idx" ON "pages_blocks_image_grid_carousel_section_grid_lists" USING btree ("_order");
  CREATE INDEX "pages_blocks_image_grid_carousel_section_grid_lists_parent_id_idx" ON "pages_blocks_image_grid_carousel_section_grid_lists" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_image_grid_carousel_section_grid_lists_item_image_idx" ON "pages_blocks_image_grid_carousel_section_grid_lists" USING btree ("item_image_id");
  CREATE INDEX "pages_blocks_image_grid_carousel_section_order_idx" ON "pages_blocks_image_grid_carousel_section" USING btree ("_order");
  CREATE INDEX "pages_blocks_image_grid_carousel_section_parent_id_idx" ON "pages_blocks_image_grid_carousel_section" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_image_grid_carousel_section_path_idx" ON "pages_blocks_image_grid_carousel_section" USING btree ("_path");
  CREATE UNIQUE INDEX "pages_blocks_image_grid_carousel_section_locales_locale_parent_id_unique" ON "pages_blocks_image_grid_carousel_section_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_contact_section_fields_form_field_radio_options_order_idx" ON "pages_blocks_contact_section_fields_form_field_radio_options" USING btree ("_order");
  CREATE INDEX "pages_blocks_contact_section_fields_form_field_radio_options_parent_id_idx" ON "pages_blocks_contact_section_fields_form_field_radio_options" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_contact_section_fields_form_field_radio_options_locale_idx" ON "pages_blocks_contact_section_fields_form_field_radio_options" USING btree ("_locale");
  CREATE INDEX "pages_blocks_contact_section_fields_form_sub_fields_order_idx" ON "pages_blocks_contact_section_fields_form_sub_fields" USING btree ("_order");
  CREATE INDEX "pages_blocks_contact_section_fields_form_sub_fields_parent_id_idx" ON "pages_blocks_contact_section_fields_form_sub_fields" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "pages_blocks_contact_section_fields_form_sub_fields_locales_locale_parent_id_unique" ON "pages_blocks_contact_section_fields_form_sub_fields_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_contact_section_fields_form_order_idx" ON "pages_blocks_contact_section_fields_form" USING btree ("_order");
  CREATE INDEX "pages_blocks_contact_section_fields_form_parent_id_idx" ON "pages_blocks_contact_section_fields_form" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "pages_blocks_contact_section_fields_form_locales_locale_parent_id_unique" ON "pages_blocks_contact_section_fields_form_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_contact_section_order_idx" ON "pages_blocks_contact_section" USING btree ("_order");
  CREATE INDEX "pages_blocks_contact_section_parent_id_idx" ON "pages_blocks_contact_section" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_contact_section_path_idx" ON "pages_blocks_contact_section" USING btree ("_path");
  CREATE INDEX "pages_blocks_contact_section_section_illustration_idx" ON "pages_blocks_contact_section" USING btree ("section_illustration_id");
  CREATE UNIQUE INDEX "pages_blocks_contact_section_locales_locale_parent_id_unique" ON "pages_blocks_contact_section_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_layered_text_on_image_section_order_idx" ON "pages_blocks_layered_text_on_image_section" USING btree ("_order");
  CREATE INDEX "pages_blocks_layered_text_on_image_section_parent_id_idx" ON "pages_blocks_layered_text_on_image_section" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_layered_text_on_image_section_path_idx" ON "pages_blocks_layered_text_on_image_section" USING btree ("_path");
  CREATE INDEX "pages_blocks_layered_text_on_image_section_section_background_idx" ON "pages_blocks_layered_text_on_image_section" USING btree ("section_background_id");
  CREATE UNIQUE INDEX "pages_blocks_layered_text_on_image_section_locales_locale_parent_id_unique" ON "pages_blocks_layered_text_on_image_section_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "illustrationTextCarousel_carousel_lists_order_idx" ON "illustrationTextCarousel_carousel_lists" USING btree ("_order");
  CREATE INDEX "illustrationTextCarousel_carousel_lists_parent_id_idx" ON "illustrationTextCarousel_carousel_lists" USING btree ("_parent_id");
  CREATE INDEX "illustrationTextCarousel_carousel_lists_locale_idx" ON "illustrationTextCarousel_carousel_lists" USING btree ("_locale");
  CREATE INDEX "illustrationTextCarousel_carousel_lists_carousel_image_idx" ON "illustrationTextCarousel_carousel_lists" USING btree ("carousel_image_id");
  CREATE INDEX "illustrationTextCarousel_order_idx" ON "illustrationTextCarousel" USING btree ("_order");
  CREATE INDEX "illustrationTextCarousel_parent_id_idx" ON "illustrationTextCarousel" USING btree ("_parent_id");
  CREATE INDEX "illustrationTextCarousel_path_idx" ON "illustrationTextCarousel" USING btree ("_path");
  CREATE UNIQUE INDEX "illustrationTextCarousel_locales_locale_parent_id_unique" ON "illustrationTextCarousel_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_image_header_paragraph_section_order_idx" ON "pages_blocks_image_header_paragraph_section" USING btree ("_order");
  CREATE INDEX "pages_blocks_image_header_paragraph_section_parent_id_idx" ON "pages_blocks_image_header_paragraph_section" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_image_header_paragraph_section_path_idx" ON "pages_blocks_image_header_paragraph_section" USING btree ("_path");
  CREATE INDEX "pages_blocks_image_header_paragraph_section_section_image_idx" ON "pages_blocks_image_header_paragraph_section" USING btree ("section_image_id");
  CREATE UNIQUE INDEX "pages_blocks_image_header_paragraph_section_locales_locale_parent_id_unique" ON "pages_blocks_image_header_paragraph_section_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_image_header_three_column_section_grid_lists_order_idx" ON "pages_blocks_image_header_three_column_section_grid_lists" USING btree ("_order");
  CREATE INDEX "pages_blocks_image_header_three_column_section_grid_lists_parent_id_idx" ON "pages_blocks_image_header_three_column_section_grid_lists" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_image_header_three_column_section_grid_lists_locale_idx" ON "pages_blocks_image_header_three_column_section_grid_lists" USING btree ("_locale");
  CREATE INDEX "pages_blocks_image_header_three_column_section_order_idx" ON "pages_blocks_image_header_three_column_section" USING btree ("_order");
  CREATE INDEX "pages_blocks_image_header_three_column_section_parent_id_idx" ON "pages_blocks_image_header_three_column_section" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_image_header_three_column_section_path_idx" ON "pages_blocks_image_header_three_column_section" USING btree ("_path");
  CREATE INDEX "pages_blocks_image_header_three_column_section_section_header_image_idx" ON "pages_blocks_image_header_three_column_section" USING btree ("section_header_image_id");
  CREATE UNIQUE INDEX "pages_blocks_image_header_three_column_section_locales_locale_parent_id_unique" ON "pages_blocks_image_header_three_column_section_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_circle_image_grid_section_grid_lists_order_idx" ON "pages_blocks_circle_image_grid_section_grid_lists" USING btree ("_order");
  CREATE INDEX "pages_blocks_circle_image_grid_section_grid_lists_parent_id_idx" ON "pages_blocks_circle_image_grid_section_grid_lists" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_circle_image_grid_section_grid_lists_locale_idx" ON "pages_blocks_circle_image_grid_section_grid_lists" USING btree ("_locale");
  CREATE INDEX "pages_blocks_circle_image_grid_section_grid_lists_item_image_idx" ON "pages_blocks_circle_image_grid_section_grid_lists" USING btree ("item_image_id");
  CREATE INDEX "pages_blocks_circle_image_grid_section_order_idx" ON "pages_blocks_circle_image_grid_section" USING btree ("_order");
  CREATE INDEX "pages_blocks_circle_image_grid_section_parent_id_idx" ON "pages_blocks_circle_image_grid_section" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_circle_image_grid_section_path_idx" ON "pages_blocks_circle_image_grid_section" USING btree ("_path");
  CREATE UNIQUE INDEX "pages_blocks_circle_image_grid_section_locales_locale_parent_id_unique" ON "pages_blocks_circle_image_grid_section_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_text_with_image_cluster_section_image_lists_order_idx" ON "pages_blocks_text_with_image_cluster_section_image_lists" USING btree ("_order");
  CREATE INDEX "pages_blocks_text_with_image_cluster_section_image_lists_parent_id_idx" ON "pages_blocks_text_with_image_cluster_section_image_lists" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_text_with_image_cluster_section_image_lists_item_image_idx" ON "pages_blocks_text_with_image_cluster_section_image_lists" USING btree ("item_image_id");
  CREATE INDEX "pages_blocks_text_with_image_cluster_section_order_idx" ON "pages_blocks_text_with_image_cluster_section" USING btree ("_order");
  CREATE INDEX "pages_blocks_text_with_image_cluster_section_parent_id_idx" ON "pages_blocks_text_with_image_cluster_section" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_text_with_image_cluster_section_path_idx" ON "pages_blocks_text_with_image_cluster_section" USING btree ("_path");
  CREATE INDEX "pages_blocks_text_with_image_cluster_section_button_link_idx" ON "pages_blocks_text_with_image_cluster_section" USING btree ("button_link_id");
  CREATE UNIQUE INDEX "pages_blocks_text_with_image_cluster_section_locales_locale_parent_id_unique" ON "pages_blocks_text_with_image_cluster_section_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_looping_carousel_section_carousel_lists_order_idx" ON "pages_blocks_looping_carousel_section_carousel_lists" USING btree ("_order");
  CREATE INDEX "pages_blocks_looping_carousel_section_carousel_lists_parent_id_idx" ON "pages_blocks_looping_carousel_section_carousel_lists" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_looping_carousel_section_carousel_lists_item_image_idx" ON "pages_blocks_looping_carousel_section_carousel_lists" USING btree ("item_image_id");
  CREATE INDEX "pages_blocks_looping_carousel_section_order_idx" ON "pages_blocks_looping_carousel_section" USING btree ("_order");
  CREATE INDEX "pages_blocks_looping_carousel_section_parent_id_idx" ON "pages_blocks_looping_carousel_section" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_looping_carousel_section_path_idx" ON "pages_blocks_looping_carousel_section" USING btree ("_path");
  CREATE UNIQUE INDEX "pages_blocks_looping_carousel_section_locales_locale_parent_id_unique" ON "pages_blocks_looping_carousel_section_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_list_with_icon_section_content_lists_order_idx" ON "pages_blocks_list_with_icon_section_content_lists" USING btree ("_order");
  CREATE INDEX "pages_blocks_list_with_icon_section_content_lists_parent_id_idx" ON "pages_blocks_list_with_icon_section_content_lists" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "pages_blocks_list_with_icon_section_content_lists_locales_locale_parent_id_unique" ON "pages_blocks_list_with_icon_section_content_lists_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_list_with_icon_section_order_idx" ON "pages_blocks_list_with_icon_section" USING btree ("_order");
  CREATE INDEX "pages_blocks_list_with_icon_section_parent_id_idx" ON "pages_blocks_list_with_icon_section" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_list_with_icon_section_path_idx" ON "pages_blocks_list_with_icon_section" USING btree ("_path");
  CREATE UNIQUE INDEX "pages_blocks_list_with_icon_section_locales_locale_parent_id_unique" ON "pages_blocks_list_with_icon_section_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_text_align_center_section_order_idx" ON "pages_blocks_text_align_center_section" USING btree ("_order");
  CREATE INDEX "pages_blocks_text_align_center_section_parent_id_idx" ON "pages_blocks_text_align_center_section" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_text_align_center_section_path_idx" ON "pages_blocks_text_align_center_section" USING btree ("_path");
  CREATE UNIQUE INDEX "pages_blocks_text_align_center_section_locales_locale_parent_id_unique" ON "pages_blocks_text_align_center_section_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_list_with_icon_description_section_content_lists_order_idx" ON "pages_blocks_list_with_icon_description_section_content_lists" USING btree ("_order");
  CREATE INDEX "pages_blocks_list_with_icon_description_section_content_lists_parent_id_idx" ON "pages_blocks_list_with_icon_description_section_content_lists" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_list_with_icon_description_section_content_lists_locale_idx" ON "pages_blocks_list_with_icon_description_section_content_lists" USING btree ("_locale");
  CREATE INDEX "pages_blocks_list_with_icon_description_section_order_idx" ON "pages_blocks_list_with_icon_description_section" USING btree ("_order");
  CREATE INDEX "pages_blocks_list_with_icon_description_section_parent_id_idx" ON "pages_blocks_list_with_icon_description_section" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_list_with_icon_description_section_path_idx" ON "pages_blocks_list_with_icon_description_section" USING btree ("_path");
  CREATE UNIQUE INDEX "pages_blocks_list_with_icon_description_section_locales_locale_parent_id_unique" ON "pages_blocks_list_with_icon_description_section_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "left_list_arr_order_idx" ON "left_list_arr" USING btree ("_order");
  CREATE INDEX "left_list_arr_parent_id_idx" ON "left_list_arr" USING btree ("_parent_id");
  CREATE INDEX "left_list_arr_locale_idx" ON "left_list_arr" USING btree ("_locale");
  CREATE INDEX "right_list_arr_order_idx" ON "right_list_arr" USING btree ("_order");
  CREATE INDEX "right_list_arr_parent_id_idx" ON "right_list_arr" USING btree ("_parent_id");
  CREATE INDEX "right_list_arr_locale_idx" ON "right_list_arr" USING btree ("_locale");
  CREATE INDEX "pages_blocks_two_list_with_illustration_section_order_idx" ON "pages_blocks_two_list_with_illustration_section" USING btree ("_order");
  CREATE INDEX "pages_blocks_two_list_with_illustration_section_parent_id_idx" ON "pages_blocks_two_list_with_illustration_section" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_two_list_with_illustration_section_path_idx" ON "pages_blocks_two_list_with_illustration_section" USING btree ("_path");
  CREATE INDEX "pages_blocks_two_list_with_illustration_section_section_illustration_idx" ON "pages_blocks_two_list_with_illustration_section" USING btree ("section_illustration_id");
  CREATE INDEX "pages_blocks_two_list_with_illustration_section_button_link_idx" ON "pages_blocks_two_list_with_illustration_section" USING btree ("button_link_id");
  CREATE UNIQUE INDEX "pages_blocks_two_list_with_illustration_section_locales_locale_parent_id_unique" ON "pages_blocks_two_list_with_illustration_section_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_text_grid_section_grid_array_order_idx" ON "pages_blocks_text_grid_section_grid_array" USING btree ("_order");
  CREATE INDEX "pages_blocks_text_grid_section_grid_array_parent_id_idx" ON "pages_blocks_text_grid_section_grid_array" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_text_grid_section_grid_array_locale_idx" ON "pages_blocks_text_grid_section_grid_array" USING btree ("_locale");
  CREATE INDEX "pages_blocks_text_grid_section_order_idx" ON "pages_blocks_text_grid_section" USING btree ("_order");
  CREATE INDEX "pages_blocks_text_grid_section_parent_id_idx" ON "pages_blocks_text_grid_section" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_text_grid_section_path_idx" ON "pages_blocks_text_grid_section" USING btree ("_path");
  CREATE UNIQUE INDEX "pages_blocks_text_grid_section_locales_locale_parent_id_unique" ON "pages_blocks_text_grid_section_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "illustrationArray_order_idx" ON "illustrationArray" USING btree ("_order");
  CREATE INDEX "illustrationArray_parent_id_idx" ON "illustrationArray" USING btree ("_parent_id");
  CREATE INDEX "illustrationArray_section_illustration_idx" ON "illustrationArray" USING btree ("section_illustration_id");
  CREATE INDEX "pages_blocks_content_item_order_idx" ON "pages_blocks_content_item" USING btree ("_order");
  CREATE INDEX "pages_blocks_content_item_parent_id_idx" ON "pages_blocks_content_item" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_content_item_path_idx" ON "pages_blocks_content_item" USING btree ("_path");
  CREATE INDEX "pages_blocks_content_item_item_image_idx" ON "pages_blocks_content_item" USING btree ("item_image_id");
  CREATE UNIQUE INDEX "pages_blocks_content_item_locales_locale_parent_id_unique" ON "pages_blocks_content_item_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_icon_list_with_side_images_section_order_idx" ON "pages_blocks_icon_list_with_side_images_section" USING btree ("_order");
  CREATE INDEX "pages_blocks_icon_list_with_side_images_section_parent_id_idx" ON "pages_blocks_icon_list_with_side_images_section" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_icon_list_with_side_images_section_path_idx" ON "pages_blocks_icon_list_with_side_images_section" USING btree ("_path");
  CREATE UNIQUE INDEX "pages_blocks_icon_list_with_side_images_section_locales_locale_parent_id_unique" ON "pages_blocks_icon_list_with_side_images_section_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_card_with_image_section_card_array_order_idx" ON "pages_blocks_card_with_image_section_card_array" USING btree ("_order");
  CREATE INDEX "pages_blocks_card_with_image_section_card_array_parent_id_idx" ON "pages_blocks_card_with_image_section_card_array" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_card_with_image_section_card_array_item_thumbnail_idx" ON "pages_blocks_card_with_image_section_card_array" USING btree ("item_thumbnail_id");
  CREATE UNIQUE INDEX "pages_blocks_card_with_image_section_card_array_locales_locale_parent_id_unique" ON "pages_blocks_card_with_image_section_card_array_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_card_with_image_section_order_idx" ON "pages_blocks_card_with_image_section" USING btree ("_order");
  CREATE INDEX "pages_blocks_card_with_image_section_parent_id_idx" ON "pages_blocks_card_with_image_section" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_card_with_image_section_path_idx" ON "pages_blocks_card_with_image_section" USING btree ("_path");
  CREATE UNIQUE INDEX "pages_blocks_card_with_image_section_locales_locale_parent_id_unique" ON "pages_blocks_card_with_image_section_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_icon_text_item_order_idx" ON "pages_blocks_icon_text_item" USING btree ("_order");
  CREATE INDEX "pages_blocks_icon_text_item_parent_id_idx" ON "pages_blocks_icon_text_item" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_icon_text_item_path_idx" ON "pages_blocks_icon_text_item" USING btree ("_path");
  CREATE UNIQUE INDEX "pages_blocks_icon_text_item_locales_locale_parent_id_unique" ON "pages_blocks_icon_text_item_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_icon_text_list_with_image_section_order_idx" ON "pages_blocks_icon_text_list_with_image_section" USING btree ("_order");
  CREATE INDEX "pages_blocks_icon_text_list_with_image_section_parent_id_idx" ON "pages_blocks_icon_text_list_with_image_section" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_icon_text_list_with_image_section_path_idx" ON "pages_blocks_icon_text_list_with_image_section" USING btree ("_path");
  CREATE INDEX "pages_blocks_icon_text_list_with_image_section_section_illustration_idx" ON "pages_blocks_icon_text_list_with_image_section" USING btree ("section_illustration_id");
  CREATE UNIQUE INDEX "pages_blocks_icon_text_list_with_image_section_locales_locale_parent_id_unique" ON "pages_blocks_icon_text_list_with_image_section_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_carousel_item_order_idx" ON "pages_blocks_carousel_item" USING btree ("_order");
  CREATE INDEX "pages_blocks_carousel_item_parent_id_idx" ON "pages_blocks_carousel_item" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_carousel_item_path_idx" ON "pages_blocks_carousel_item" USING btree ("_path");
  CREATE INDEX "pages_blocks_carousel_item_item_icon_idx" ON "pages_blocks_carousel_item" USING btree ("item_icon_id");
  CREATE UNIQUE INDEX "pages_blocks_carousel_item_locales_locale_parent_id_unique" ON "pages_blocks_carousel_item_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_three_dimension_carousel_section_order_idx" ON "pages_blocks_three_dimension_carousel_section" USING btree ("_order");
  CREATE INDEX "pages_blocks_three_dimension_carousel_section_parent_id_idx" ON "pages_blocks_three_dimension_carousel_section" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_three_dimension_carousel_section_path_idx" ON "pages_blocks_three_dimension_carousel_section" USING btree ("_path");
  CREATE UNIQUE INDEX "pages_blocks_three_dimension_carousel_section_locales_locale_parent_id_unique" ON "pages_blocks_three_dimension_carousel_section_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_grid_image_section_grid_image_order_idx" ON "pages_blocks_grid_image_section_grid_image" USING btree ("_order");
  CREATE INDEX "pages_blocks_grid_image_section_grid_image_parent_id_idx" ON "pages_blocks_grid_image_section_grid_image" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_grid_image_section_grid_image_image_idx" ON "pages_blocks_grid_image_section_grid_image" USING btree ("image_id");
  CREATE UNIQUE INDEX "pages_blocks_grid_image_section_grid_image_locales_locale_parent_id_unique" ON "pages_blocks_grid_image_section_grid_image_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_grid_image_section_order_idx" ON "pages_blocks_grid_image_section" USING btree ("_order");
  CREATE INDEX "pages_blocks_grid_image_section_parent_id_idx" ON "pages_blocks_grid_image_section" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_grid_image_section_path_idx" ON "pages_blocks_grid_image_section" USING btree ("_path");
  CREATE UNIQUE INDEX "pages_blocks_grid_image_section_locales_locale_parent_id_unique" ON "pages_blocks_grid_image_section_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "pages_page_name_idx" ON "pages" USING btree ("page_name");
  CREATE INDEX "pages_page_group_idx" ON "pages" USING btree ("page_group_id");
  CREATE INDEX "pages_updated_at_idx" ON "pages" USING btree ("updated_at");
  CREATE INDEX "pages_created_at_idx" ON "pages" USING btree ("created_at");
  CREATE INDEX "navbar_navbar_item_array_navbar_dropdown_order_idx" ON "navbar_navbar_item_array_navbar_dropdown" USING btree ("_order");
  CREATE INDEX "navbar_navbar_item_array_navbar_dropdown_parent_id_idx" ON "navbar_navbar_item_array_navbar_dropdown" USING btree ("_parent_id");
  CREATE INDEX "navbar_navbar_item_array_navbar_dropdown_item_dropdown_reference_idx" ON "navbar_navbar_item_array_navbar_dropdown" USING btree ("item_dropdown_reference_id");
  CREATE UNIQUE INDEX "navbar_navbar_item_array_navbar_dropdown_locales_locale_parent_id_unique" ON "navbar_navbar_item_array_navbar_dropdown_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "navbar_navbar_item_array_order_idx" ON "navbar_navbar_item_array" USING btree ("_order");
  CREATE INDEX "navbar_navbar_item_array_parent_id_idx" ON "navbar_navbar_item_array" USING btree ("_parent_id");
  CREATE INDEX "navbar_navbar_item_array_navbar_item_reference_idx" ON "navbar_navbar_item_array" USING btree ("navbar_item_reference_id");
  CREATE UNIQUE INDEX "navbar_navbar_item_array_locales_locale_parent_id_unique" ON "navbar_navbar_item_array_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "navbar_navbar_logo_idx" ON "navbar" USING btree ("navbar_logo_id");
  CREATE INDEX "navbar_button_contact_reference_idx" ON "navbar" USING btree ("button_contact_reference_id");
  CREATE INDEX "navbar_updated_at_idx" ON "navbar" USING btree ("updated_at");
  CREATE INDEX "navbar_created_at_idx" ON "navbar" USING btree ("created_at");
  CREATE INDEX "footer_footer_navigation_navigation_group_item_order_idx" ON "footer_footer_navigation_navigation_group_item" USING btree ("_order");
  CREATE INDEX "footer_footer_navigation_navigation_group_item_parent_id_idx" ON "footer_footer_navigation_navigation_group_item" USING btree ("_parent_id");
  CREATE INDEX "footer_footer_navigation_navigation_group_item_navigation_page_reference_idx" ON "footer_footer_navigation_navigation_group_item" USING btree ("navigation_page_reference_id");
  CREATE UNIQUE INDEX "footer_footer_navigation_navigation_group_item_locales_locale_parent_id_unique" ON "footer_footer_navigation_navigation_group_item_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "footer_footer_navigation_order_idx" ON "footer_footer_navigation" USING btree ("_order");
  CREATE INDEX "footer_footer_navigation_parent_id_idx" ON "footer_footer_navigation" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "footer_footer_navigation_locales_locale_parent_id_unique" ON "footer_footer_navigation_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "footer_footer_logo_idx" ON "footer" USING btree ("footer_logo_id");
  CREATE INDEX "footer_updated_at_idx" ON "footer" USING btree ("updated_at");
  CREATE INDEX "footer_created_at_idx" ON "footer" USING btree ("created_at");
  CREATE UNIQUE INDEX "footer_locales_locale_parent_id_unique" ON "footer_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "recive_message_updated_at_idx" ON "recive_message" USING btree ("updated_at");
  CREATE INDEX "recive_message_created_at_idx" ON "recive_message" USING btree ("created_at");
  CREATE INDEX "group_page_sub_group_from_idx" ON "group_page" USING btree ("sub_group_from_id");
  CREATE INDEX "group_page_updated_at_idx" ON "group_page" USING btree ("updated_at");
  CREATE INDEX "group_page_created_at_idx" ON "group_page" USING btree ("created_at");
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_navbar_fk" FOREIGN KEY ("navbar_id") REFERENCES "public"."navbar"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_footer_fk" FOREIGN KEY ("footer_id") REFERENCES "public"."footer"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_recive_message_fk" FOREIGN KEY ("recive_message_id") REFERENCES "public"."recive_message"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_group_page_fk" FOREIGN KEY ("group_page_id") REFERENCES "public"."group_page"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "payload_locked_documents_rels_pages_id_idx" ON "payload_locked_documents_rels" USING btree ("pages_id");
  CREATE INDEX "payload_locked_documents_rels_navbar_id_idx" ON "payload_locked_documents_rels" USING btree ("navbar_id");
  CREATE INDEX "payload_locked_documents_rels_footer_id_idx" ON "payload_locked_documents_rels" USING btree ("footer_id");
  CREATE INDEX "payload_locked_documents_rels_recive_message_id_idx" ON "payload_locked_documents_rels" USING btree ("recive_message_id");
  CREATE INDEX "payload_locked_documents_rels_group_page_id_idx" ON "payload_locked_documents_rels" USING btree ("group_page_id");
  ALTER TABLE "media" DROP COLUMN "alt";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_hero_section_greetings" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_hero_section_greetings_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_hero_section" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_zig_zag_list_section_content_lists" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_zig_zag_list_section_content_lists_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_zig_zag_list_section" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_zig_zag_list_section_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_image_with_carousel_section_carousel_image" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_image_with_carousel_section" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_image_with_carousel_section_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_quad_grid_section_grid_lists" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_quad_grid_section" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_quad_grid_section_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_image_grid_carousel_section_grid_lists" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_image_grid_carousel_section" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_image_grid_carousel_section_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_contact_section_fields_form_field_radio_options" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_contact_section_fields_form_sub_fields" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_contact_section_fields_form_sub_fields_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_contact_section_fields_form" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_contact_section_fields_form_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_contact_section" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_contact_section_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_layered_text_on_image_section" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_layered_text_on_image_section_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "illustrationTextCarousel_carousel_lists" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "illustrationTextCarousel" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "illustrationTextCarousel_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_image_header_paragraph_section" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_image_header_paragraph_section_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_image_header_three_column_section_grid_lists" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_image_header_three_column_section" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_image_header_three_column_section_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_circle_image_grid_section_grid_lists" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_circle_image_grid_section" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_circle_image_grid_section_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_text_with_image_cluster_section_image_lists" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_text_with_image_cluster_section" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_text_with_image_cluster_section_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_looping_carousel_section_carousel_lists" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_looping_carousel_section" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_looping_carousel_section_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_list_with_icon_section_content_lists" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_list_with_icon_section_content_lists_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_list_with_icon_section" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_list_with_icon_section_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_text_align_center_section" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_text_align_center_section_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_list_with_icon_description_section_content_lists" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_list_with_icon_description_section" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_list_with_icon_description_section_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "left_list_arr" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "right_list_arr" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_two_list_with_illustration_section" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_two_list_with_illustration_section_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_text_grid_section_grid_array" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_text_grid_section" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_text_grid_section_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "illustrationArray" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_content_item" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_content_item_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_icon_list_with_side_images_section" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_icon_list_with_side_images_section_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_card_with_image_section_card_array" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_card_with_image_section_card_array_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_card_with_image_section" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_card_with_image_section_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_icon_text_item" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_icon_text_item_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_icon_text_list_with_image_section" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_icon_text_list_with_image_section_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_carousel_item" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_carousel_item_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_three_dimension_carousel_section" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_three_dimension_carousel_section_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_grid_image_section_grid_image" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_grid_image_section_grid_image_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_grid_image_section" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_grid_image_section_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "navbar_navbar_item_array_navbar_dropdown" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "navbar_navbar_item_array_navbar_dropdown_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "navbar_navbar_item_array" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "navbar_navbar_item_array_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "navbar" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "footer_footer_navigation_navigation_group_item" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "footer_footer_navigation_navigation_group_item_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "footer_footer_navigation" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "footer_footer_navigation_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "footer" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "footer_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "recive_message" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "group_page" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "pages_blocks_hero_section_greetings" CASCADE;
  DROP TABLE "pages_blocks_hero_section_greetings_locales" CASCADE;
  DROP TABLE "pages_blocks_hero_section" CASCADE;
  DROP TABLE "pages_blocks_zig_zag_list_section_content_lists" CASCADE;
  DROP TABLE "pages_blocks_zig_zag_list_section_content_lists_locales" CASCADE;
  DROP TABLE "pages_blocks_zig_zag_list_section" CASCADE;
  DROP TABLE "pages_blocks_zig_zag_list_section_locales" CASCADE;
  DROP TABLE "pages_blocks_image_with_carousel_section_carousel_image" CASCADE;
  DROP TABLE "pages_blocks_image_with_carousel_section" CASCADE;
  DROP TABLE "pages_blocks_image_with_carousel_section_locales" CASCADE;
  DROP TABLE "pages_blocks_quad_grid_section_grid_lists" CASCADE;
  DROP TABLE "pages_blocks_quad_grid_section" CASCADE;
  DROP TABLE "pages_blocks_quad_grid_section_locales" CASCADE;
  DROP TABLE "pages_blocks_image_grid_carousel_section_grid_lists" CASCADE;
  DROP TABLE "pages_blocks_image_grid_carousel_section" CASCADE;
  DROP TABLE "pages_blocks_image_grid_carousel_section_locales" CASCADE;
  DROP TABLE "pages_blocks_contact_section_fields_form_field_radio_options" CASCADE;
  DROP TABLE "pages_blocks_contact_section_fields_form_sub_fields" CASCADE;
  DROP TABLE "pages_blocks_contact_section_fields_form_sub_fields_locales" CASCADE;
  DROP TABLE "pages_blocks_contact_section_fields_form" CASCADE;
  DROP TABLE "pages_blocks_contact_section_fields_form_locales" CASCADE;
  DROP TABLE "pages_blocks_contact_section" CASCADE;
  DROP TABLE "pages_blocks_contact_section_locales" CASCADE;
  DROP TABLE "pages_blocks_layered_text_on_image_section" CASCADE;
  DROP TABLE "pages_blocks_layered_text_on_image_section_locales" CASCADE;
  DROP TABLE "illustrationTextCarousel_carousel_lists" CASCADE;
  DROP TABLE "illustrationTextCarousel" CASCADE;
  DROP TABLE "illustrationTextCarousel_locales" CASCADE;
  DROP TABLE "pages_blocks_image_header_paragraph_section" CASCADE;
  DROP TABLE "pages_blocks_image_header_paragraph_section_locales" CASCADE;
  DROP TABLE "pages_blocks_image_header_three_column_section_grid_lists" CASCADE;
  DROP TABLE "pages_blocks_image_header_three_column_section" CASCADE;
  DROP TABLE "pages_blocks_image_header_three_column_section_locales" CASCADE;
  DROP TABLE "pages_blocks_circle_image_grid_section_grid_lists" CASCADE;
  DROP TABLE "pages_blocks_circle_image_grid_section" CASCADE;
  DROP TABLE "pages_blocks_circle_image_grid_section_locales" CASCADE;
  DROP TABLE "pages_blocks_text_with_image_cluster_section_image_lists" CASCADE;
  DROP TABLE "pages_blocks_text_with_image_cluster_section" CASCADE;
  DROP TABLE "pages_blocks_text_with_image_cluster_section_locales" CASCADE;
  DROP TABLE "pages_blocks_looping_carousel_section_carousel_lists" CASCADE;
  DROP TABLE "pages_blocks_looping_carousel_section" CASCADE;
  DROP TABLE "pages_blocks_looping_carousel_section_locales" CASCADE;
  DROP TABLE "pages_blocks_list_with_icon_section_content_lists" CASCADE;
  DROP TABLE "pages_blocks_list_with_icon_section_content_lists_locales" CASCADE;
  DROP TABLE "pages_blocks_list_with_icon_section" CASCADE;
  DROP TABLE "pages_blocks_list_with_icon_section_locales" CASCADE;
  DROP TABLE "pages_blocks_text_align_center_section" CASCADE;
  DROP TABLE "pages_blocks_text_align_center_section_locales" CASCADE;
  DROP TABLE "pages_blocks_list_with_icon_description_section_content_lists" CASCADE;
  DROP TABLE "pages_blocks_list_with_icon_description_section" CASCADE;
  DROP TABLE "pages_blocks_list_with_icon_description_section_locales" CASCADE;
  DROP TABLE "left_list_arr" CASCADE;
  DROP TABLE "right_list_arr" CASCADE;
  DROP TABLE "pages_blocks_two_list_with_illustration_section" CASCADE;
  DROP TABLE "pages_blocks_two_list_with_illustration_section_locales" CASCADE;
  DROP TABLE "pages_blocks_text_grid_section_grid_array" CASCADE;
  DROP TABLE "pages_blocks_text_grid_section" CASCADE;
  DROP TABLE "pages_blocks_text_grid_section_locales" CASCADE;
  DROP TABLE "illustrationArray" CASCADE;
  DROP TABLE "pages_blocks_content_item" CASCADE;
  DROP TABLE "pages_blocks_content_item_locales" CASCADE;
  DROP TABLE "pages_blocks_icon_list_with_side_images_section" CASCADE;
  DROP TABLE "pages_blocks_icon_list_with_side_images_section_locales" CASCADE;
  DROP TABLE "pages_blocks_card_with_image_section_card_array" CASCADE;
  DROP TABLE "pages_blocks_card_with_image_section_card_array_locales" CASCADE;
  DROP TABLE "pages_blocks_card_with_image_section" CASCADE;
  DROP TABLE "pages_blocks_card_with_image_section_locales" CASCADE;
  DROP TABLE "pages_blocks_icon_text_item" CASCADE;
  DROP TABLE "pages_blocks_icon_text_item_locales" CASCADE;
  DROP TABLE "pages_blocks_icon_text_list_with_image_section" CASCADE;
  DROP TABLE "pages_blocks_icon_text_list_with_image_section_locales" CASCADE;
  DROP TABLE "pages_blocks_carousel_item" CASCADE;
  DROP TABLE "pages_blocks_carousel_item_locales" CASCADE;
  DROP TABLE "pages_blocks_three_dimension_carousel_section" CASCADE;
  DROP TABLE "pages_blocks_three_dimension_carousel_section_locales" CASCADE;
  DROP TABLE "pages_blocks_grid_image_section_grid_image" CASCADE;
  DROP TABLE "pages_blocks_grid_image_section_grid_image_locales" CASCADE;
  DROP TABLE "pages_blocks_grid_image_section" CASCADE;
  DROP TABLE "pages_blocks_grid_image_section_locales" CASCADE;
  DROP TABLE "pages" CASCADE;
  DROP TABLE "navbar_navbar_item_array_navbar_dropdown" CASCADE;
  DROP TABLE "navbar_navbar_item_array_navbar_dropdown_locales" CASCADE;
  DROP TABLE "navbar_navbar_item_array" CASCADE;
  DROP TABLE "navbar_navbar_item_array_locales" CASCADE;
  DROP TABLE "navbar" CASCADE;
  DROP TABLE "footer_footer_navigation_navigation_group_item" CASCADE;
  DROP TABLE "footer_footer_navigation_navigation_group_item_locales" CASCADE;
  DROP TABLE "footer_footer_navigation" CASCADE;
  DROP TABLE "footer_footer_navigation_locales" CASCADE;
  DROP TABLE "footer" CASCADE;
  DROP TABLE "footer_locales" CASCADE;
  DROP TABLE "recive_message" CASCADE;
  DROP TABLE "group_page" CASCADE;
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_pages_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_navbar_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_footer_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_recive_message_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_group_page_fk";
  
  DROP INDEX "payload_locked_documents_rels_pages_id_idx";
  DROP INDEX "payload_locked_documents_rels_navbar_id_idx";
  DROP INDEX "payload_locked_documents_rels_footer_id_idx";
  DROP INDEX "payload_locked_documents_rels_recive_message_id_idx";
  DROP INDEX "payload_locked_documents_rels_group_page_id_idx";
  ALTER TABLE "media" ADD COLUMN "alt" varchar NOT NULL;
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "pages_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "navbar_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "footer_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "recive_message_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "group_page_id";
  DROP TYPE "public"."subType";
  DROP TYPE "public"."enum_pages_blocks_contact_section_fields_form_field_layout";
  DROP TYPE "public"."enum_pages_blocks_contact_section_fields_form_field_type_single";
  DROP TYPE "public"."enum_pages_blocks_contact_section_fields_form_field_type_double";`)
}
