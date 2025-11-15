import { createConsumer, createKafkaClient } from "@repo/kafka";

const kafka = createKafkaClient("email-service");
export const consumer = createConsumer(kafka, "email-service");