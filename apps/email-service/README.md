# Email Service

Email notification service.

## What it does
- Listen to Kafka events (user-created, order-created)
- Send welcome emails to new users
- Send order confirmation emails
- Email delivery via SMTP

## Tech Stack
- **Nodemailer** - Email sending
- **KafkaJS** - Event streaming

## Port
No HTTP server (Kafka consumer only)
