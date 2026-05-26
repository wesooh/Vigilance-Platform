import Review from "../models/Review.js";

export const createReview = async (req, res) => {
  try {
    const review = await Review.create(req.body);

    res.status(201).json(review);

  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

export const getWorkerReviews = async (req, res) => {
  try {
    const reviews = await Review.find({
      worker: req.params.workerId,
    })
      .populate("client", "firstName lastName")
      .sort({ createdAt: -1 });

    res.json(reviews);

  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};