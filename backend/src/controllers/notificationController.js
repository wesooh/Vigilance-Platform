import Notification from "../models/Notification.js";

export const createNotification =
  async (req, res) => {
    try {
      const notification =
        await Notification.create(
          req.body
        );

      res.status(201).json(
        notification
      );

    } catch (err) {
      res.status(500).json({
        message: err.message,
      });
    }
  };

export const getUserNotifications =
  async (req, res) => {
    try {
      const notifications =
        await Notification.find({
          user: req.params.userId,
        }).sort({
          createdAt: -1,
        });

      res.json(notifications);

    } catch (err) {
      res.status(500).json({
        message: err.message,
      });
    }
  };

export const markAsRead =
  async (req, res) => {
    try {
      const notification =
        await Notification.findByIdAndUpdate(
          req.params.id,
          { read: true },
          { new: true }
        );

      res.json(notification);

    } catch (err) {
      res.status(500).json({
        message: err.message,
      });
    }
  };