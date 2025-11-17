# Ecommerce Monorepo

Full-stack ecommerce platform built with microservices architecture and event-driven communication.

## Architecture

This project uses a monorepo structure with multiple services communicating through Kafka for event-driven architecture.

### Applications

- **[Admin](./apps/admin)** (Port 3003) - Admin dashboard for managing users, products, and orders
- **[Client](./apps/client)** (Port 3002) - Customer-facing storefront with cart and checkout
- **[Auth Service](./apps/auth-service)** (Port 8003) - User authentication and management
- **[Products Service](./apps/products-service)** (Port 8000) - Product catalog and inventory
- **[Order Service](./apps/order-service)** (Port 8001) - Order processing and management
- **[Payment Service](./apps/payment-service)** (Port 8002) - Stripe payment integration
- **[Email Service](./apps/email-service)** - Email notifications (Kafka consumer)

### Packages

- `@repo/kafka` - Shared Kafka utilities (producer/consumer)
- `@repo/product-db` - Prisma schema and client for products (PostgreSQL)
- `@repo/order-db` - Mongoose models for orders (MongoDB)
- `@repo/types` - Shared TypeScript types
- `@repo/eslint-config` - Shared ESLint configurations
- `@repo/typescript-config` - Shared TypeScript configurations

## Tech Stack

### Frontend
- **Next.js 15** - React framework
- **Clerk** - Authentication
- **Stripe** - Payment processing
- **Tailwind CSS** - Styling
- **shadcn/ui** - UI components
- **Zustand** - State management
- **TanStack Query/Table** - Data management

### Backend
- **Express** - Products & Auth services
- **Fastify** - Order service
- **Hono** - Payment service
- **PostgreSQL + Prisma** - Products database
- **MongoDB + Mongoose** - Orders database
- **KafkaJS** - Event streaming
- **Nodemailer** - Email sending

### Infrastructure
- **Turborepo** - Monorepo build system
- **Kafka** - Message broker (3 brokers cluster)
- **Zookeeper** - Kafka coordination
- **Docker** - Containerization (Kafka setup)

## Getting Started

### Prerequisites
- Node.js 20+
- pnpm
- Docker (for Kafka)
- PostgreSQL
- MongoDB

### Installation

```bash
# Install dependencies
pnpm install

# Set up environment variables for each service
# Copy .env.example to .env in each app directory
```

### Start Kafka Cluster

```bash
# Start Kafka, Zookeeper, and Kafka UI
docker-compose up -d
```

### Development

Run all services:
```bash
turbo dev
```

Run specific service:
```bash
turbo dev --filter=client
turbo dev --filter=admin
turbo dev --filter=products-service
```

## Event Flow

1. **Payment Success** → Payment Service publishes `payment.successful` event
2. **Order Creation** → Order Service consumes event, creates order, publishes `order-created` event
3. **Email Notification** → Email Service consumes `order-created` event, sends confirmation email
4. **Product Updates** → Products Service publishes product events for synchronization

## API Endpoints

### Products Service (8000)
- `GET /products` - List products with filters
- `GET /products/:id` - Get product details
- `POST /products` - Create product (admin)
- `PUT /products/:id` - Update product (admin)
- `DELETE /products/:id` - Delete product (admin)

### Order Service (8001)
- `GET /orders` - List orders
- `GET /orders/user/:userId` - Get user orders
- `POST /orders` - Create order (internal)

### Payment Service (8002)
- `POST /session` - Create Stripe checkout session
- `GET /session/:id` - Get session details
- `POST /webhooks/stripe` - Handle Stripe webhooks

### Auth Service (8003)
- `GET /users` - List users
- `GET /users/:id` - Get user details
- `POST /users` - Create user
- `DELETE /users/:id` - Delete user

## Build

Build all apps and packages:
```bash
turbo build
```

Build specific app:
```bash
turbo build --filter=client
```

## Type Checking

```bash
turbo check-types
```

## Useful Links

- [Turborepo Documentation](https://turborepo.com/docs)
- [Next.js Documentation](https://nextjs.org/docs)
- [Clerk Documentation](https://clerk.com/docs)
- [Stripe Documentation](https://stripe.com/docs)
- [KafkaJS Documentation](https://kafka.js.org/)

