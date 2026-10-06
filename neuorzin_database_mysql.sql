-- =====================================================================
-- NEUORZIN CRM ENTERPRISE DATABASE SCHEMA & INITIAL DATA (MySQL / phpMyAdmin)
-- Ready for 1-Click Import into Hostinger phpMyAdmin
-- =====================================================================

SET FOREIGN_KEY_CHECKS = 0;
SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";

-- ---------------------------------------------------------------------
-- 1. USERS & ROLES
-- ---------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `users` (
  `id` VARCHAR(64) NOT NULL PRIMARY KEY,
  `name` VARCHAR(255) NOT NULL,
  `email` VARCHAR(255) NOT NULL UNIQUE,
  `password` VARCHAR(255) NOT NULL,
  `role` VARCHAR(100) NOT NULL DEFAULT "Sales Executive",
  `department` VARCHAR(100) NOT NULL DEFAULT "Sales",
  `phone` VARCHAR(50) DEFAULT NULL,
  `avatar` VARCHAR(500) DEFAULT NULL,
  `status` VARCHAR(50) NOT NULL DEFAULT "Active",
  `permissions` LONGTEXT DEFAULT NULL,
  `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
  `updated_at` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ---------------------------------------------------------------------
-- 2. LEADS
-- ---------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `leads` (
  `id` VARCHAR(64) NOT NULL PRIMARY KEY,
  `source` VARCHAR(100) NOT NULL DEFAULT "Website",
  `name` VARCHAR(255) NOT NULL,
  `company` VARCHAR(255) DEFAULT NULL,
  `phone` VARCHAR(50) DEFAULT NULL,
  `whatsapp` VARCHAR(50) DEFAULT NULL,
  `email` VARCHAR(255) NOT NULL,
  `location` VARCHAR(255) DEFAULT NULL,
  `service` VARCHAR(255) NOT NULL,
  `requirement_need` LONGTEXT DEFAULT NULL,
  `budget` VARCHAR(100) DEFAULT NULL,
  `timeline` VARCHAR(100) DEFAULT NULL,
  `assigned_to` VARCHAR(64) DEFAULT NULL,
  `team` VARCHAR(100) DEFAULT "Sales",
  `priority` VARCHAR(50) DEFAULT "Medium",
  `score` INT DEFAULT 50,
  `status` VARCHAR(50) DEFAULT "New",
  `utm_source` VARCHAR(100) DEFAULT NULL,
  `utm_medium` VARCHAR(100) DEFAULT NULL,
  `utm_campaign` VARCHAR(100) DEFAULT NULL,
  `utm_content` VARCHAR(100) DEFAULT NULL,
  `last_activity_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
  `next_followup_at` DATETIME DEFAULT NULL,
  `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
  `updated_at` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  KEY `idx_leads_assigned` (`assigned_to`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ---------------------------------------------------------------------
-- 3. CUSTOMERS
-- ---------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `customers` (
  `id` VARCHAR(64) NOT NULL PRIMARY KEY,
  `lead_id` VARCHAR(64) DEFAULT NULL,
  `name` VARCHAR(255) NOT NULL,
  `company` VARCHAR(255) DEFAULT NULL,
  `email` VARCHAR(255) NOT NULL,
  `phone` VARCHAR(50) DEFAULT NULL,
  `whatsapp` VARCHAR(50) DEFAULT NULL,
  `location` VARCHAR(255) DEFAULT NULL,
  `gst_number` VARCHAR(50) DEFAULT NULL,
  `billing_address` LONGTEXT DEFAULT NULL,
  `balance_amount` DECIMAL(15,2) DEFAULT 0.00,
  `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
  `updated_at` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  KEY `idx_customers_lead` (`lead_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ---------------------------------------------------------------------
-- 4. SALES PIPELINES & DEALS
-- ---------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `pipelines` (
  `id` VARCHAR(64) NOT NULL PRIMARY KEY,
  `name` VARCHAR(255) NOT NULL,
  `type` VARCHAR(50) DEFAULT "Sales",
  `stages` LONGTEXT NOT NULL,
  `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `deals` (
  `id` VARCHAR(64) NOT NULL PRIMARY KEY,
  `pipeline_id` VARCHAR(64) NOT NULL,
  `title` VARCHAR(255) NOT NULL,
  `lead_id` VARCHAR(64) DEFAULT NULL,
  `customer_id` VARCHAR(64) DEFAULT NULL,
  `assigned_to` VARCHAR(64) DEFAULT NULL,
  `stage` VARCHAR(100) NOT NULL,
  `value` DECIMAL(15,2) DEFAULT 0.00,
  `currency` VARCHAR(10) DEFAULT "INR",
  `probability` INT DEFAULT 20,
  `expected_close_date` DATE DEFAULT NULL,
  `status` VARCHAR(50) DEFAULT "Open",
  `lost_reason` LONGTEXT DEFAULT NULL,
  `notes` LONGTEXT DEFAULT NULL,
  `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
  `updated_at` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ---------------------------------------------------------------------
-- 5. ACTIVITIES & FOLLOWUPS
-- ---------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `activities` (
  `id` VARCHAR(64) NOT NULL PRIMARY KEY,
  `lead_id` VARCHAR(64) DEFAULT NULL,
  `customer_id` VARCHAR(64) DEFAULT NULL,
  `deal_id` VARCHAR(64) DEFAULT NULL,
  `user_id` VARCHAR(64) NOT NULL,
  `type` VARCHAR(50) NOT NULL,
  `subject` VARCHAR(255) NOT NULL,
  `notes` LONGTEXT DEFAULT NULL,
  `scheduled_at` DATETIME DEFAULT NULL,
  `completed_at` DATETIME DEFAULT NULL,
  `status` VARCHAR(50) DEFAULT "Pending",
  `next_action` VARCHAR(255) DEFAULT NULL,
  `outcome` LONGTEXT DEFAULT NULL,
  `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ---------------------------------------------------------------------
-- 6. QUOTATIONS
-- ---------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `quotations` (
  `id` VARCHAR(64) NOT NULL PRIMARY KEY,
  `quote_number` VARCHAR(100) NOT NULL UNIQUE,
  `lead_id` VARCHAR(64) DEFAULT NULL,
  `customer_id` VARCHAR(64) NOT NULL,
  `deal_id` VARCHAR(64) DEFAULT NULL,
  `created_by` VARCHAR(64) NOT NULL,
  `service_title` VARCHAR(255) NOT NULL,
  `scope_of_work` LONGTEXT DEFAULT NULL,
  `items` LONGTEXT NOT NULL,
  `subtotal` DECIMAL(15,2) NOT NULL,
  `discount` DECIMAL(15,2) DEFAULT 0.00,
  `gst_rate` DECIMAL(5,2) DEFAULT 18.00,
  `gst_amount` DECIMAL(15,2) DEFAULT 0.00,
  `total_amount` DECIMAL(15,2) NOT NULL,
  `terms_conditions` LONGTEXT DEFAULT NULL,
  `valid_until` DATE DEFAULT NULL,
  `status` VARCHAR(50) DEFAULT "Draft",
  `pdf_path` VARCHAR(500) DEFAULT NULL,
  `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
  `updated_at` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ---------------------------------------------------------------------
-- 7. INVOICES & PAYMENTS
-- ---------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `invoices` (
  `id` VARCHAR(64) NOT NULL PRIMARY KEY,
  `invoice_number` VARCHAR(100) NOT NULL UNIQUE,
  `quotation_id` VARCHAR(64) DEFAULT NULL,
  `deal_id` VARCHAR(64) DEFAULT NULL,
  `customer_id` VARCHAR(64) NOT NULL,
  `created_by` VARCHAR(64) NOT NULL,
  `issue_date` DATE NOT NULL,
  `due_date` DATE NOT NULL,
  `items` LONGTEXT NOT NULL,
  `subtotal` DECIMAL(15,2) NOT NULL,
  `discount` DECIMAL(15,2) DEFAULT 0.00,
  `gst_number` VARCHAR(50) DEFAULT NULL,
  `gst_amount` DECIMAL(15,2) DEFAULT 0.00,
  `total_amount` DECIMAL(15,2) NOT NULL,
  `paid_amount` DECIMAL(15,2) DEFAULT 0.00,
  `status` VARCHAR(50) DEFAULT "Unpaid",
  `notes` LONGTEXT DEFAULT NULL,
  `pdf_path` VARCHAR(500) DEFAULT NULL,
  `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
  `updated_at` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `payments` (
  `id` VARCHAR(64) NOT NULL PRIMARY KEY,
  `invoice_id` VARCHAR(64) NOT NULL,
  `customer_id` VARCHAR(64) NOT NULL,
  `receipt_number` VARCHAR(100) NOT NULL UNIQUE,
  `amount` DECIMAL(15,2) NOT NULL,
  `payment_method` VARCHAR(50) NOT NULL,
  `transaction_ref` VARCHAR(100) DEFAULT NULL,
  `payment_date` DATETIME DEFAULT CURRENT_TIMESTAMP,
  `notes` LONGTEXT DEFAULT NULL,
  `recorded_by` VARCHAR(64) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ---------------------------------------------------------------------
-- 8. PROJECTS & MILESTONES
-- ---------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `projects` (
  `id` VARCHAR(64) NOT NULL PRIMARY KEY,
  `project_code` VARCHAR(100) NOT NULL UNIQUE,
  `name` VARCHAR(255) NOT NULL,
  `customer_id` VARCHAR(64) NOT NULL,
  `deal_id` VARCHAR(64) DEFAULT NULL,
  `quotation_id` VARCHAR(64) DEFAULT NULL,
  `project_manager_id` VARCHAR(64) DEFAULT NULL,
  `department` VARCHAR(100) DEFAULT "Development",
  `start_date` DATE DEFAULT NULL,
  `deadline` DATE DEFAULT NULL,
  `budget` DECIMAL(15,2) DEFAULT 0.00,
  `priority` VARCHAR(50) DEFAULT "High",
  `status` VARCHAR(50) DEFAULT "Kickoff",
  `health` VARCHAR(50) DEFAULT "Good",
  `description` LONGTEXT DEFAULT NULL,
  `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
  `updated_at` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `project_milestones` (
  `id` VARCHAR(64) NOT NULL PRIMARY KEY,
  `project_id` VARCHAR(64) NOT NULL,
  `title` VARCHAR(255) NOT NULL,
  `description` LONGTEXT DEFAULT NULL,
  `due_date` DATE DEFAULT NULL,
  `billing_amount` DECIMAL(15,2) DEFAULT 0.00,
  `linked_invoice_id` VARCHAR(64) DEFAULT NULL,
  `status` VARCHAR(50) DEFAULT "Pending",
  `client_approved` TINYINT(1) DEFAULT 0,
  `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ---------------------------------------------------------------------
-- 9. TASKS & TIMESHEETS
-- ---------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `tasks` (
  `id` VARCHAR(64) NOT NULL PRIMARY KEY,
  `task_code` VARCHAR(100) NOT NULL UNIQUE,
  `project_id` VARCHAR(64) DEFAULT NULL,
  `title` VARCHAR(255) NOT NULL,
  `description` LONGTEXT DEFAULT NULL,
  `department` VARCHAR(100) NOT NULL DEFAULT "Development",
  `assigned_to` VARCHAR(64) DEFAULT NULL,
  `priority` VARCHAR(50) DEFAULT "Medium",
  `due_date` DATETIME DEFAULT NULL,
  `status` VARCHAR(50) DEFAULT "Todo",
  `estimated_hours` DECIMAL(8,2) DEFAULT 0.00,
  `logged_hours` DECIMAL(8,2) DEFAULT 0.00,
  `subtasks` LONGTEXT DEFAULT NULL,
  `created_by` VARCHAR(64) NOT NULL,
  `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
  `updated_at` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `timesheets` (
  `id` VARCHAR(64) NOT NULL PRIMARY KEY,
  `task_id` VARCHAR(64) NOT NULL,
  `user_id` VARCHAR(64) NOT NULL,
  `date` DATE NOT NULL,
  `hours` DECIMAL(8,2) NOT NULL,
  `notes` LONGTEXT DEFAULT NULL,
  `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ---------------------------------------------------------------------
-- 10. MARKETING & WHATSAPP
-- ---------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `marketing_campaigns` (
  `id` VARCHAR(64) NOT NULL PRIMARY KEY,
  `name` VARCHAR(255) NOT NULL,
  `platform` VARCHAR(100) NOT NULL,
  `utm_source` VARCHAR(100) DEFAULT NULL,
  `utm_campaign` VARCHAR(100) DEFAULT NULL,
  `budget` DECIMAL(15,2) DEFAULT 0.00,
  `spend` DECIMAL(15,2) DEFAULT 0.00,
  `impressions` INT DEFAULT 0,
  `clicks` INT DEFAULT 0,
  `leads_generated` INT DEFAULT 0,
  `deals_won` INT DEFAULT 0,
  `revenue_generated` DECIMAL(15,2) DEFAULT 0.00,
  `status` VARCHAR(50) DEFAULT "Active",
  `start_date` DATE DEFAULT NULL,
  `end_date` DATE DEFAULT NULL,
  `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `whatsapp_messages` (
  `id` VARCHAR(64) NOT NULL PRIMARY KEY,
  `lead_id` VARCHAR(64) DEFAULT NULL,
  `customer_id` VARCHAR(64) DEFAULT NULL,
  `deal_id` VARCHAR(64) DEFAULT NULL,
  `user_id` VARCHAR(64) DEFAULT NULL,
  `direction` VARCHAR(20) NOT NULL,
  `from_phone` VARCHAR(50) NOT NULL,
  `to_phone` VARCHAR(50) NOT NULL,
  `message` LONGTEXT NOT NULL,
  `template_id` VARCHAR(64) DEFAULT NULL,
  `status` VARCHAR(50) DEFAULT "Sent",
  `timestamp` DATETIME DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ---------------------------------------------------------------------
-- 11. AUDIT LOGS & NOTIFICATIONS
-- ---------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `audit_logs` (
  `id` VARCHAR(64) NOT NULL PRIMARY KEY,
  `entity_type` VARCHAR(100) NOT NULL,
  `entity_id` VARCHAR(64) NOT NULL,
  `action` VARCHAR(100) NOT NULL,
  `user_id` VARCHAR(64) DEFAULT NULL,
  `user_name` VARCHAR(255) DEFAULT NULL,
  `changes` LONGTEXT DEFAULT NULL,
  `timestamp` DATETIME DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `notifications` (
  `id` VARCHAR(64) NOT NULL PRIMARY KEY,
  `user_id` VARCHAR(64) DEFAULT NULL,
  `title` VARCHAR(255) NOT NULL,
  `message` LONGTEXT NOT NULL,
  `type` VARCHAR(50) DEFAULT "Info",
  `link` VARCHAR(500) DEFAULT NULL,
  `is_read` TINYINT(1) DEFAULT 0,
  `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ---------------------------------------------------------------------
-- 12. BLOG CMS & TAXONOMY
-- ---------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `blog_categories` (
  `id` VARCHAR(64) NOT NULL PRIMARY KEY,
  `name` VARCHAR(100) NOT NULL UNIQUE,
  `slug` VARCHAR(100) NOT NULL UNIQUE,
  `description` LONGTEXT DEFAULT NULL,
  `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `blog_tags` (
  `id` VARCHAR(64) NOT NULL PRIMARY KEY,
  `name` VARCHAR(100) NOT NULL UNIQUE,
  `slug` VARCHAR(100) NOT NULL UNIQUE,
  `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `blogs` (
  `id` VARCHAR(64) NOT NULL PRIMARY KEY,
  `slug` VARCHAR(255) NOT NULL UNIQUE,
  `title` VARCHAR(500) NOT NULL,
  `section` VARCHAR(100) DEFAULT "Digital Marketing",
  `category` VARCHAR(100) DEFAULT "Digital Marketing",
  `excerpt` LONGTEXT DEFAULT NULL,
  `content` LONGTEXT DEFAULT NULL,
  `intro` LONGTEXT DEFAULT NULL,
  `sections_json` LONGTEXT DEFAULT NULL,
  `conclusion` LONGTEXT DEFAULT NULL,
  `image` LONGTEXT DEFAULT NULL,
  `author` VARCHAR(255) DEFAULT "NeuOrzin Editorial",
  `author_role` VARCHAR(255) DEFAULT "Growth & Marketing Lead",
  `author_id` VARCHAR(64) DEFAULT NULL,
  `tags` LONGTEXT DEFAULT NULL,
  `status` VARCHAR(50) NOT NULL DEFAULT "Draft",
  `read_time` VARCHAR(50) DEFAULT "5 min read",
  `is_featured` TINYINT(1) DEFAULT 0,
  `seo_title` VARCHAR(255) DEFAULT NULL,
  `seo_description` LONGTEXT DEFAULT NULL,
  `seo_keywords` LONGTEXT DEFAULT NULL,
  `published_at` DATETIME DEFAULT NULL,
  `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
  `updated_at` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  KEY `idx_blogs_status` (`status`),
  KEY `idx_blogs_slug` (`slug`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ---------------------------------------------------------------------
-- 13. AI / GEMINI CONFIGURATION
-- ---------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `ai_config` (
  `id` VARCHAR(64) NOT NULL PRIMARY KEY DEFAULT "default",
  `gemini_api_key` LONGTEXT DEFAULT NULL,
  `model_name` VARCHAR(100) DEFAULT "gemini-1.5-pro",
  `temperature` DECIMAL(3,2) DEFAULT 0.70,
  `is_configured` TINYINT(1) DEFAULT 0,
  `updated_by` VARCHAR(64) DEFAULT NULL,
  `updated_at` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ---------------------------------------------------------------------
-- 14. PASSWORD RESET TOKENS
-- ---------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `password_reset_tokens` (
  `id` VARCHAR(64) NOT NULL PRIMARY KEY,
  `user_id` VARCHAR(64) NOT NULL,
  `email` VARCHAR(255) NOT NULL,
  `token` VARCHAR(255) NOT NULL UNIQUE,
  `expires_at` DATETIME NOT NULL,
  `used` TINYINT(1) DEFAULT 0,
  `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
  KEY `idx_pwd_token` (`token`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =====================================================================
-- INITIAL SEED DATA
-- =====================================================================

INSERT INTO `users` (`id`, `name`, `email`, `password`, `role`, `department`, `phone`, `status`) VALUES
("USR-001", "Kailash S (Super Admin)", "admin@neuorzin.com", "$2a$10$wG27vN5iBc0o5wS5H9Yv6.K9Z0uNfS8zE1qN1r4z.W22oq", "Super Admin", "Executive", "+91 77940 45500", "Active"),
("USR-002", "Rohan Mehta (Sales Lead)", "rohan.sales@neuorzin.com", "$2a$10$wG27vN5iBc0o5wS5H9Yv6.K9Z0uNfS8zE1qN1r4z.W22oq", "Sales Manager", "Sales", "+91 98201 12345", "Active"),
("USR-003", "Ananya Roy (Senior AE)", "ananya.ae@neuorzin.com", "$2a$10$wG27vN5iBc0o5wS5H9Yv6.K9Z0uNfS8zE1qN1r4z.W22oq", "Sales Executive", "Sales", "+91 98402 54321", "Active"),
("USR-004", "Vikram Sen (PM)", "vikram.pm@neuorzin.com", "$2a$10$wG27vN5iBc0o5wS5H9Yv6.K9Z0uNfS8zE1qN1r4z.W22oq", "Project Manager", "Development", "+91 97112 88990", "Active"),
("USR-005", "Aditya Verma (Lead Dev)", "aditya.dev@neuorzin.com", "$2a$10$wG27vN5iBc0o5wS5H9Yv6.K9Z0uNfS8zE1qN1r4z.W22oq", "Developer", "Development", "+91 96541 22334", "Active");

INSERT INTO `pipelines` (`id`, `name`, `type`, `stages`) VALUES
("PIPE-SW", "Software & App Development", "Sales", "[{\"name\":\"Lead Qualified\",\"probability\":20},{\"name\":\"Discovery & Scope\",\"probability\":40},{\"name\":\"Proposal / Quote Sent\",\"probability\":60},{\"name\":\"Negotiation\",\"probability\":80},{\"name\":\"Won / Signed\",\"probability\":100}]"),
("PIPE-MKTG", "Digital Marketing & Growth Engines", "Sales", "[{\"name\":\"Audit Request\",\"probability\":25},{\"name\":\"Strategy Presentation\",\"probability\":50},{\"name\":\"Proposal Sent\",\"probability\":70},{\"name\":\"Contract Closing\",\"probability\":90},{\"name\":\"Won / Retainer Live\",\"probability\":100}]"),
("PIPE-PRJ-DEV", "Standard Agile Delivery Framework", "Project", "[{\"name\":\"Kickoff\"},{\"name\":\"Requirement Analysis\"},{\"name\":\"Architecture & UI/UX\"},{\"name\":\"Core Development\"},{\"name\":\"Internal QA\"},{\"name\":\"Client Review & UAT\"},{\"name\":\"Deployment\"},{\"name\":\"Support & Retainer\"}]");

INSERT INTO `customers` (`id`, `name`, `company`, `email`, `phone`, `whatsapp`, `location`, `gst_number`, `balance_amount`) VALUES
("CUST-001", "Arjun Nambiar", "Aura Retail Global", "arjun@auraretail.com", "+91 98112 34567", "+91 98112 34567", "Bengaluru, India", "29AABCA1234F1Z5", 0.00),
("CUST-002", "Siddharth Rao", "Nexis PropTech AI", "siddharth@nexisprop.io", "+91 99401 22334", "+91 99401 22334", "Hyderabad, India", "36AABCN9876E1Z9", 150000.00),
("CUST-003", "Dr. Kavita Deshmukh", "SkillSphere EduTech", "kavita@skillsphere.in", "+91 97654 88990", "+91 97654 88990", "Mumbai, India", "27AABCS5432D1Z1", 0.00);

INSERT INTO `leads` (`id`, `source`, `name`, `company`, `phone`, `whatsapp`, `email`, `location`, `service`, `requirement_need`, `budget`, `timeline`, `assigned_to`, `priority`, `score`, `status`, `utm_source`, `utm_campaign`) VALUES
("LEAD-1001", "Website", "Arjun Nambiar", "Aura Retail Global", "+91 98112 34567", "+91 98112 34567", "arjun@auraretail.com", "Bengaluru", "Enterprise AI & Autonomous Software", "Omnichannel inventory automation and AI customer insights", "₹15L - ₹25L", "2 Months", "USR-003", "High", 95, "Won", "google", "q1_brand"),
("LEAD-1002", "WhatsApp", "Siddharth Rao", "Nexis PropTech AI", "+91 99401 22334", "+91 99401 22334", "siddharth@nexisprop.io", "Hyderabad", "Mobile App Development", "Flutter iOS & Android app with real-time property 3D tours", "₹8L - ₹12L", "1 Month", "USR-003", "High", 85, "Proposal", "direct", "meta_campaign"),
("LEAD-1003", "Organic Search", "Dr. Kavita Deshmukh", "SkillSphere EduTech", "+91 97654 88990", "+91 97654 88990", "kavita@skillsphere.in", "Mumbai", "Website Architecture & UI/UX", "Complete redesign of student learning portal and LMS", "₹5L - ₹8L", "3 Weeks", "USR-002", "Medium", 75, "Meeting", "google_seo", "ai_portal");

INSERT INTO `deals` (`id`, `pipeline_id`, `title`, `lead_id`, `customer_id`, `assigned_to`, `stage`, `value`, `currency`, `probability`, `expected_close_date`, `status`) VALUES
("DEAL-001", "PIPE-SW", "Aura Global ERP & AI Telemetry Platform", "LEAD-1001", "CUST-001", "USR-003", "Won / Signed", 1850000.00, "INR", 100, "2026-03-31", "Won"),
("DEAL-002", "PIPE-SW", "Nexis PropTech Mobile Platform (iOS & Android)", "LEAD-1002", "CUST-002", "USR-003", "Proposal / Quote Sent", 950000.00, "INR", 60, "2026-04-15", "Open"),
("DEAL-003", "PIPE-SW", "SkillSphere High-Scale LMS Architecture", "LEAD-1003", "CUST-003", "USR-002", "Discovery & Scope", 650000.00, "INR", 40, "2026-04-30", "Open");

INSERT INTO `quotations` (`id`, `quote_number`, `lead_id`, `customer_id`, `deal_id`, `created_by`, `service_title`, `scope_of_work`, `items`, `subtotal`, `discount`, `gst_rate`, `gst_amount`, `total_amount`, `valid_until`, `status`) VALUES
("QTN-001", "QT-2026-0001", "LEAD-1001", "CUST-001", "DEAL-001", "USR-001", "Enterprise AI Engine & Autonomous ERP Suite", "End-to-end custom architecture, cloud telemetry microservices, and AI models.", "[{\"description\":\"Custom Cloud Architecture & Microservices\",\"sac\":\"998313\",\"qty\":1,\"rate\":900000,\"tax\":18,\"amount\":900000},{\"description\":\"AI LLM Assistant & Multi-Agent Telemetry\",\"sac\":\"998313\",\"qty\":1,\"rate\":667796.61,\"tax\":18,\"amount\":667796.61}]", 1567796.61, 0.00, 18.00, 282203.39, 1850000.00, "2026-04-30", "Accepted"),
("QTN-002", "QT-2026-0002", "LEAD-1002", "CUST-002", "DEAL-002", "USR-003", "Cross-Platform Mobile App & 3D Tour Viewer", "Flutter application for iOS and Android with WebGL 3D property renderings.", "[{\"description\":\"Phase 1: UI/UX & Design Systems\",\"sac\":\"998313\",\"qty\":1,\"rate\":300000,\"tax\":18,\"amount\":300000},{\"description\":\"Phase 2: Mobile App Development & Backend Integration\",\"sac\":\"998313\",\"qty\":1,\"rate\":505084.75,\"tax\":18,\"amount\":505084.75}]", 805084.75, 0.00, 18.00, 144915.25, 950000.00, "2026-04-15", "Sent");

INSERT INTO `invoices` (`id`, `invoice_number`, `quotation_id`, `deal_id`, `customer_id`, `created_by`, `issue_date`, `due_date`, `items`, `subtotal`, `discount`, `gst_number`, `gst_amount`, `total_amount`, `paid_amount`, `status`, `notes`) VALUES
("INV-001", "INV-2026-0001", "QTN-001", "DEAL-001", "CUST-001", "USR-001", "2026-03-01", "2026-03-15", "[{\"description\":\"Mobilization Advance (40% Milestone Deliverable)\",\"sac\":\"998313\",\"qty\":1,\"rate\":627118.64,\"tax\":18,\"amount\":627118.64}]", 627118.64, 0.00, "29AABCA1234F1Z5", 112881.36, 740000.00, 740000.00, "Paid", "Paid in full via HDFC Bank Wire"),
("INV-002", "INV-2026-0002", "QTN-002", "DEAL-002", "CUST-002", "USR-001", "2026-03-10", "2026-03-25", "[{\"description\":\"Initial Sprint Milestone (20% Advance)\",\"sac\":\"998313\",\"qty\":1,\"rate\":161016.95,\"tax\":18,\"amount\":161016.95}]", 161016.95, 0.00, "36AABCN9876E1Z9", 28983.05, 190000.00, 40000.00, "Partially Paid", "Mobilization invoice");

INSERT INTO `projects` (`id`, `project_code`, `name`, `customer_id`, `deal_id`, `quotation_id`, `project_manager_id`, `department`, `start_date`, `deadline`, `budget`, `priority`, `status`, `health`, `description`) VALUES
("PRJ-001", "PRJ-2026-0001", "Aura Retail Global - Enterprise AI Engine", "CUST-001", "DEAL-001", "QTN-001", "USR-004", "Development", "2026-03-01", "2026-05-30", 1850000.00, "Critical", "Development", "Good", "Custom AI architecture with automated telemetry and multi-region database replication."),
("PRJ-002", "PRJ-2026-0002", "Nexis PropTech 3D Mobile App", "CUST-002", "DEAL-002", "QTN-002", "USR-004", "Development", "2026-03-15", "2026-06-15", 950000.00, "High", "Design", "Good", "Flutter mobile application for iOS and Android.");

INSERT INTO `notifications` (`id`, `user_id`, `title`, `message`, `type`, `link`, `is_read`) VALUES
("NOTIF-001", "USR-001", "Welcome to NeuOrzin CRM", "Your enterprise CRM database and operations suite are fully initialized.", "Success", "/admin", 0),
("NOTIF-002", "USR-001", "Inbound Lead Assigned", "Arjun Nambiar (Aura Retail Global) inquiry assigned to Sales team.", "Info", "/admin", 0),
("NOTIF-003", "USR-001", "Invoice Payment Received", "₹7,40,000 received for INV-2026-0001 from Aura Retail Global.", "Success", "/admin", 0);

-- SEED BLOG CATEGORIES (ALIGNED WITH NEUORZIN SERVICE PILLARS)
INSERT INTO `blog_categories` (`id`, `name`, `slug`, `description`) VALUES
("CAT-001", "Sales & Marketing Growth Engines", "sales-marketing-growth", "Programmatic SEO, high-conversion outbound pipelines, CRO, and multi-channel performance advertising."),
("CAT-002", "CRM & Revenue Operations", "crm-revenue-operations", "Enterprise HubSpot and Salesforce architecture, automated lead scoring, and pipeline velocity telemetry."),
("CAT-003", "Intelligent Autonomous Systems", "intelligent-autonomous-systems", "Multi-agent cognitive workflows, autonomous decision engines, and self-orchestrating business processes."),
("CAT-004", "AI-Driven Quality Automation", "ai-driven-quality-automation", "Continuous automated validation, self-healing test automation, and cognitive QA pipelines."),
("CAT-005", "Enterprise Data Operations", "enterprise-data-operations", "Snowflake migrations, dbt transformation pipelines, real-time Kafka streaming, and data mesh architectures."),
("CAT-006", "Business AI Implementation", "business-ai-implementation", "Private retrieval-augmented generation (RAG), fine-tuned domain models, and vector search embeddings."),
("CAT-007", "Cloud Performance Management", "cloud-performance-management", "High-availability multi-cloud orchestration, Kubernetes cluster tuning, eBPF telemetry, and SRE."),
("CAT-008", "Cloud Cost Intelligence", "cloud-cost-intelligence", "FinOps telemetry, automated compute right-sizing, spot instance orchestration, and cloud spend reduction."),
("CAT-009", "Seamless Cloud Transitioning", "seamless-cloud-transitioning", "Zero-downtime legacy migration, containerization, and IaC automation."),
("CAT-010", "Quantum-Enhanced Machine Learning", "quantum-enhanced-ml", "Hybrid quantum-classical optimization, quantum support vector machines (QSVM), and post-quantum security."),
("CAT-011", "On-Demand Quantum Compute", "on-demand-quantum-compute", "Access to QPU backends, circuit simulation, and algorithm acceleration.");

-- SEED BLOG TAGS
INSERT INTO `blog_tags` (`id`, `name`, `slug`) VALUES
("TAG-001", "Organic Growth", "organic-growth"),
("TAG-002", "AI Search", "ai-search"),
("TAG-003", "Content Strategy", "content-strategy"),
("TAG-004", "B2B Lead Gen", "b2b-lead-gen"),
("TAG-005", "RevOps", "revops"),
("TAG-006", "Server-Side Tracking", "server-side-tracking"),
("TAG-007", "Attribution", "attribution"),
("TAG-008", "Machine Learning", "machine-learning"),
("TAG-009", "Snowflake", "snowflake"),
("TAG-010", "Kubernetes", "kubernetes"),
("TAG-011", "Private RAG", "private-rag"),
("TAG-012", "FinOps", "finops"),
("TAG-013", "Quantum ML", "quantum-ml");

-- SEED AI CONFIG
INSERT INTO `ai_config` (`id`, `model_name`, `temperature`, `is_configured`) VALUES
("default", "gemini-1.5-pro", 0.70, 0)
ON DUPLICATE KEY UPDATE `model_name` = VALUES(`model_name`);

SET FOREIGN_KEY_CHECKS = 1;

