# Order Service

Order management and processing service.

## What it does
- Create and retrieve orders
- Listen to payment successful events from Kafka
- Publish order created events to Kafka
- Order history by user
- MongoDB integration for order storage

## Tech Stack
- **Fastify** - Web framework
- **MongoDB + Mongoose** - Database
- **Clerk** - Authentication
- **KafkaJS** - Event streaming
- **date-fns** - Date utilities

## Port
8001
