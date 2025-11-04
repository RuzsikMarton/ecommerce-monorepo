import { createConsumer, createKafkaClient, createProducer } from "@repo/kafka";

const kafkaClient = createKafkaClient("products-service");

export const producer = createProducer(kafkaClient);
export const consumer = createConsumer(kafkaClient, "products-group");