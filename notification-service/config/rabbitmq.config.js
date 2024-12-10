const amqp = require('amqplib');
const Notification = require('../models/notification.model');
const { sendEmail } = require('../services/email.service');

const RABBITMQ_URL = process.env.RABBITMQ_URL;

const listenForMessages = async () => {
  const connection = await amqp.connect(RABBITMQ_URL);
  const channel = await connection.createChannel();

  const queue = 'booking_notifications';
  await channel.assertQueue(queue);

  console.log(`Listening for messages in queue: ${queue}`);

  channel.consume(queue, async (msg) => {
    if (msg !== null) {
      const { userId, email, subject, body } = JSON.parse(msg.content.toString());

      try {
        // Save notification
        const notification = new Notification({ userId, email, type: 'CONFIRMATION', subject, body });
        await notification.save();

        // Send email
        const emailResponse = await sendEmail(email, subject, body);
        notification.status = emailResponse.success ? 'SENT' : 'FAILED';
        await notification.save();

        console.log('Notification processed.');
      } catch (error) {
        console.error('Error processing notification:', error);
      }

      channel.ack(msg);
    }
  });
};

module.exports = { listenForMessages };
