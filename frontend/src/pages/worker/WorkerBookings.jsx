import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";

const WorkerBookings = () => {
  const { user } = useAuth();

  const [bookings, setBookings] =
    useState([]);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/bookings/worker/${user._id}`
      );

      setBookings(res.data);

    } catch (err) {
      console.log(err);
    }
  };

  const updateStatus = async (
    id,
    status
  ) => {
    try {
      await axios.put(
        `http://localhost:5000/api/bookings/${id}`,
        {
          status,
        }
      );

      fetchBookings();

    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <h1>Booking Requests</h1>

      {bookings.map((booking) => (
        <div
          key={booking._id}
          style={styles.card}
        >
          <h3>
            {
              booking.client
                ?.firstName
            }{" "}
            {
              booking.client
                ?.lastName
            }
          </h3>

          <p>
            {
              booking.serviceType
            }
          </p>

          <p>{booking.message}</p>

          <p>
            Status:
            {booking.status}
          </p>

          <button
            onClick={() =>
              updateStatus(
                booking._id,
                "accepted"
              )
            }
          >
            Accept
          </button>

          <button
            onClick={() =>
              updateStatus(
                booking._id,
                "rejected"
              )
            }
          >
            Reject
          </button>
        </div>
      ))}
    </div>
  );
};

const styles = {
  card: {
    border: "1px solid #ddd",
    padding: "20px",
    marginBottom: "15px",
  },
};

export default WorkerBookings;