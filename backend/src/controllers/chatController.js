import Message from "../models/Message.js";

export const sendMessage = async (
  req,
  res
) => {
  try {
    const message =
      await Message.create(req.body);

    res.status(201).json(message);

  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

export const getMessages = async (
  req,
  res
) => {
  try {
    const messages =
      await Message.find({
        booking: req.params.bookingId,
      })
        .populate(
          "sender",
          "firstName lastName"
        )
        .sort({ createdAt: 1 });

    res.json(messages);

  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};