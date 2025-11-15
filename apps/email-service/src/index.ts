import { consumer } from "./utils/kafka";
import sendMail from "./utils/mailer";

const start = async () => {
  try {
    await consumer.subscribe([
      {
        topicName: "user-created",
        topicHandler: async (message) => {
          const { username, email } = message.value;

          if (email) {
            await sendMail({
              email,
              subject: "Welcome to RM Designs Ecommerce App!",
              text: `Hello ${username},\n\nThank you for registering with our service! We're excited to have you on board.\n\nBest regards,\nThe Team`,
            });
          }
        },
      },
      {
        topicName: "order-created",
        topicHandler: async (message) => {
          const { email, amount, pruducts, orderId } = message.value;
          console.log("Received order-created event:", message.value);

          if (email) {
            await sendMail({
              email,
              subject: `Order ${orderId} has been created!`,
              text: `Hello,\n\nYour order with ID ${orderId} has been successfully created. The total amount is $${Number(amount/100)}.\n\nThank you for shopping with us!\n\nBest regards,\nThe Team`,
            });
          }
        },
      },
    ]);
  } catch (error) {
    console.error("Error sending email: ", error);
  }
};
start();
