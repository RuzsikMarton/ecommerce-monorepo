import type { Kafka, Consumer } from "kafkajs";

export const createConsumer = (kafka: Kafka, groupId: string) => {
  const consumer: Consumer = kafka.consumer({ groupId });
  const handlers = new Map<string, (message: any) => Promise<void>>();
  let isRunning = false;

  const connect = async () => {
    await consumer.connect();
  };

  const subscribe = async (
    topic: string,
    handler: (message: any) => Promise<void>
  ) => {
    await consumer.subscribe({ topic, fromBeginning: true });
    handlers.set(topic, handler);
    if (!isRunning) {
      isRunning = true;
      await consumer.run({
        eachMessage: async ({ topic, partition, message }) => {
          try {
            const value = message.value?.toString();

            if (value) {
              const topicHandler = handlers.get(topic);
              if (topicHandler) {
                await topicHandler(JSON.parse(value));
              }
            }
          } catch (error) {
            console.log(
              `Error processing message from topic ${topic}, partition ${partition}:`,
              error
            );
          }
        },
      });
    }
  };

  const disconnect = async () => {
    await consumer.disconnect();
  };

  return { connect, subscribe, disconnect };
};
