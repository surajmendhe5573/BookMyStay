const Notification = require('../models/notification.model');
const { sendEmail } = require('../services/email.service');

exports.sendNotification = async (req, res) => {
  try {
    const { userId, email, type, subject, body } = req.body;

    // Save notification to database
    const notification = new Notification({
      userId,
      email,
      type,
      subject,
      body,
    });
    await notification.save();

    // Send email
    const emailResponse = await sendEmail(email, subject, body);
    notification.status = emailResponse.success ? 'SENT' : 'FAILED';
    await notification.save();

    res.status(200).json({ message: 'Notification processed.', notification });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error sending notification.' });
  }
};

exports.getNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find({ userId: req.user.id });
    res.status(200).json({ notifications });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error retrieving notifications.' });
  }
};
