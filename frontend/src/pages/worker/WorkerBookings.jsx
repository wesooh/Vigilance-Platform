import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";
import { io } from "socket.io-client";

const WorkerBookings = () => {
  const { user } = useAuth();

  const [bookings, setBookings] = useState([]);

  // 🔥 SOCKET + DATA FETCH
  useEffect(() => {
    if (!user?._id) return; // ✅ SAFETY CHECK

    fetchBookings();

    const socket = io("http://localhost:5000");

    socket.on("new-booking", (booking) => {
      if (booking.worker === user._id) {
        setBookings((prev) => [booking, ...prev]);
      }
    });

    return () => socket.disconnect();
  }, [user]);

  // 🔥 FETCH BOOKINGS
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

  // 🔥 UPDATE STATUS
  const updateStatus = async (id, status) => {
    try {
      await axios.put(
        `http://localhost:5000/api/bookings/${id}`,
        { status }
      );

      fetchBookings();
    } catch (err) {
      console.log(err);
    }
  };

  // 🔥 LOADING STATE (IMPORTANT)
  if (!user) {
    return <h3>Loading user...</h3>;
  }

  return (
    <div>
      <h1>Booking Requests</h1>

      {bookings.length === 0 ? (
        <p>No bookings yet</p>
      ) : (
        bookings.map((booking) => (
          <div
            key={booking._id}
            style={styles.card}
          >
            <h3>
              {booking.client?.firstName}{" "}
              {booking.client?.lastName}
            </h3>

            <p>{booking.serviceType}</p>
            <p>{booking.message}</p>

            <p>Status: {booking.status}</p>

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
        ))
      )}
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