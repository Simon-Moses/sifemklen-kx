# SIFEMKLEN Cleaning Service Management System

SIFEMKLEN is a premium cleaning and facility-care operations platform for Abuja. The current foundation includes a responsive public website surface, an operations dashboard, database-backed schema foundation, role-aware navigation concepts, service catalogue, bookings overview, verified revenue language, and mobile layouts.

## Brand details
- Phone: 07042106777
- Email: sifemklen@gmail.com
- Address: 53 Agade street, Wuse 2, Abuja
- Tagline: Clean Spaces, Better Living.

## Architecture
The preview UI is implemented in Next.js so it can be reviewed here. The production target described by the project is a framework-free PHP/MySQL deployment under `http://localhost/sifemklen/`. `database/sifemklen_db.sql` is the importable InnoDB schema foundation for that deployment. It deliberately contains catalogue seed data only; demo users and bookings should be added by an explicit optional seed script, never by re-importing the schema.

The schema is normalized around users, service categories, services, customer addresses, bookings, assignments, payments, and notifications. Payment records distinguish `pending`, `verified`, `failed`, and `refunded`; collected revenue must only include `verified` records. Booking references and idempotency keys are unique, and schedule/status/customer indexes are included for scale.

## Local PHP/XAMPP target
1. Install XAMPP and start Apache + MySQL.
2. Create `C:/xampp/htdocs/sifemklen/` and place the PHP application there.
3. Open phpMyAdmin, import `database/sifemklen_db.sql`, or run it against MySQL. The script creates `sifemklen_db`.
4. Copy `config/config.example.php` to `config/config.php` and set local credentials. Never commit `config.php` or real secrets.
5. Open `http://localhost/sifemklen/`.

## Security requirements
Use PDO prepared statements, secure password hashing, secure HttpOnly SameSite session cookies, CSRF tokens for mutations, server-side ownership checks on every customer resource, role checks before financial/reporting queries, upload MIME/size validation, private storage outside the public web root, generic user-facing errors, and private technical logs. Do not store card numbers or CVVs. Manual cash/bank payments require authorized verification evidence. Live gateway callbacks must validate signatures, references, and idempotency before marking a payment verified.

## Roles
Administrator: full configuration, financial controls, reports, and staff management. Supervisor: team oversight, assignments, and job review. Staff: assigned jobs, checklists, and attendance only. Customer: own bookings, invoices, addresses, payments, messages, and reviews only.

## Testing checklist
Test the booking transition rules, overlap checks inside a transaction, customer URL ownership, role restrictions, verified-payment reporting, CSRF failure paths, CSV export authorization, private uploads, and responsive widths 360, 390, 768, 1024, and 1440px. Configure SMTP and optional scheduled tasks only in production environment configuration; do not claim delivery without a provider confirmation.
