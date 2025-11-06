import { consumer } from "./kafka"
import { createOrder } from "./order";

export const runKafkaSubscriptions = async () => {
    consumer.subscribe("payment.successful", async (message) => {
        const order = message.value;
        await createOrder(order);
    });
}