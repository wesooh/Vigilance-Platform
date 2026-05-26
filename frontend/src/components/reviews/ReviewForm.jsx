import { useState } from "react";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";

const ReviewForm = ({ booking, workerId }) => {
  const { user } = useAuth();

  const [rating, setRating] = useState(5);

  const [comment, setComment] =
    useState("");

  const submitReview = async () => {
    try {
      await axios.post(
        "http://localhost:5000/api/reviews",
        {
          booking: booking._id,
          client: user._id,
          worker: workerId,
          rating,
          comment,
        }
      );

      alert("Review submitted");

    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div style={styles.box}>
      <h3>Leave Review</h3>

      <select
        value={rating}
        onChange={(e) =>
          setRating(e.target.value)
        }
      >
        <option value="5">5</option>
        <option value="4">4</option>
        <option value="3">3</option>
        <option value="2">2</option>
        <option value="1">1</option>
      </select>

      <textarea
        placeholder="Write review..."
        value={comment}
        onChange={(e) =>
          setComment(e.target.value)
        }
        style={styles.textarea}
      />

      <button
        onClick={submitReview}
        style={styles.button}
      >
        Submit Review
      </button>
    </div>
  );
};

const styles = {
  box: {
    marginTop: "20px",
    padding: "15px",
    border: "1px solid #ddd",
    borderRadius: "10px",
  },

  textarea: {
    width: "100%",
    minHeight: "100px",
    marginTop: "10px",
    marginBottom: "10px",
  },

  button: {
    padding: "10px 20px",
    background: "#268426",
    border: "none",
    color: "#fff",
    borderRadius: "8px",
  },
};

export default ReviewForm;