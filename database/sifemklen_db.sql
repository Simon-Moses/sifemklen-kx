CREATE DATABASE IF NOT EXISTS sifemklen_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE sifemklen_db;

CREATE TABLE users (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  role ENUM('administrator','supervisor','staff','customer') NOT NULL,
  first_name VARCHAR(80) NOT NULL,
  last_name VARCHAR(80) NOT NULL,
  email VARCHAR(190) NOT NULL UNIQUE,
  phone VARCHAR(30),
  password_hash VARCHAR(255) NOT NULL,
  status ENUM('active','invited','suspended','archived') NOT NULL DEFAULT 'active',
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_users_role_status (role, status)
) ENGINE=InnoDB;

CREATE TABLE service_categories (id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY, name VARCHAR(120) NOT NULL UNIQUE, description TEXT, is_active BOOLEAN NOT NULL DEFAULT TRUE, created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP) ENGINE=InnoDB;
CREATE TABLE services (id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY, category_id BIGINT UNSIGNED NOT NULL, name VARCHAR(160) NOT NULL, slug VARCHAR(180) NOT NULL UNIQUE, description TEXT NOT NULL, pricing_type ENUM('fixed','hourly','quote') NOT NULL DEFAULT 'quote', base_price DECIMAL(12,2), duration_minutes SMALLINT UNSIGNED, is_active BOOLEAN NOT NULL DEFAULT TRUE, archived_at TIMESTAMP NULL, created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, FOREIGN KEY (category_id) REFERENCES service_categories(id), INDEX idx_services_active_category (is_active, category_id)) ENGINE=InnoDB;
CREATE TABLE customer_addresses (id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY, customer_id BIGINT UNSIGNED NOT NULL, label VARCHAR(80) NOT NULL, address_line TEXT NOT NULL, city VARCHAR(100) NOT NULL, state VARCHAR(100), is_default BOOLEAN DEFAULT FALSE, FOREIGN KEY (customer_id) REFERENCES users(id), INDEX idx_addresses_customer (customer_id)) ENGINE=InnoDB;
CREATE TABLE bookings (id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY, reference VARCHAR(24) NOT NULL UNIQUE, customer_id BIGINT UNSIGNED NOT NULL, service_id BIGINT UNSIGNED NOT NULL, address_id BIGINT UNSIGNED NOT NULL, scheduled_start DATETIME NOT NULL, scheduled_end DATETIME NOT NULL, status ENUM('pending','confirmed','assigned','in_progress','completed','cancelled','rejected') NOT NULL DEFAULT 'pending', notes TEXT, quoted_amount DECIMAL(12,2) NOT NULL DEFAULT 0, created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, FOREIGN KEY (customer_id) REFERENCES users(id), FOREIGN KEY (service_id) REFERENCES services(id), FOREIGN KEY (address_id) REFERENCES customer_addresses(id), INDEX idx_bookings_schedule_status (scheduled_start, scheduled_end, status), INDEX idx_bookings_customer (customer_id)) ENGINE=InnoDB;
CREATE TABLE booking_assignments (id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY, booking_id BIGINT UNSIGNED NOT NULL, staff_id BIGINT UNSIGNED NOT NULL, assigned_by BIGINT UNSIGNED NOT NULL, assigned_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, completed_at TIMESTAMP NULL, FOREIGN KEY (booking_id) REFERENCES bookings(id), FOREIGN KEY (staff_id) REFERENCES users(id), FOREIGN KEY (assigned_by) REFERENCES users(id), UNIQUE KEY uq_booking_staff (booking_id, staff_id)) ENGINE=InnoDB;
CREATE TABLE payments (id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY, booking_id BIGINT UNSIGNED NOT NULL, amount DECIMAL(12,2) NOT NULL, method ENUM('cash','bank_transfer','card') NOT NULL, status ENUM('pending','verified','failed','refunded') NOT NULL DEFAULT 'pending', provider_reference VARCHAR(190), evidence_path VARCHAR(255), verified_by BIGINT UNSIGNED NULL, verified_at TIMESTAMP NULL, idempotency_key VARCHAR(190) UNIQUE, created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, FOREIGN KEY (booking_id) REFERENCES bookings(id), FOREIGN KEY (verified_by) REFERENCES users(id), INDEX idx_payments_status_date (status, created_at)) ENGINE=InnoDB;
CREATE TABLE notifications (id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY, user_id BIGINT UNSIGNED NOT NULL, type VARCHAR(60) NOT NULL, title VARCHAR(160) NOT NULL, body TEXT NOT NULL, read_at TIMESTAMP NULL, created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, FOREIGN KEY (user_id) REFERENCES users(id), INDEX idx_notifications_user_read (user_id, read_at, created_at)) ENGINE=InnoDB;

INSERT INTO service_categories (name, description) VALUES ('Residential care','Home cleaning programmes'),('Commercial spaces','Offices and workspaces'),('Hospitality','Hotels and guest facilities');
INSERT INTO services (category_id,name,slug,description,pricing_type,base_price,duration_minutes) VALUES (1,'Residential care','residential-care','Recurring and one-off home cleaning.','fixed',18500,180),(2,'Office & workspace','office-workspace','Reliable workplace cleaning programmes.','quote',45000,240),(3,'Hospitality standards','hospitality-standards','Inspection-ready hospitality support.','quote',NULL,360);
-- Demo users/bookings are intentionally kept out of this schema import. Use optional demo seed scripts.
