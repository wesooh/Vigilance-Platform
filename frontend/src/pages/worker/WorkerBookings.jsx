import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";
import { io } from "socket.io-client";
import ChatBox from "../../components/chat/ChatBox";

const socket = io("http://localhost:5000");

const WorkerBookings = () => {
  const { user } = useAuth();
  const [bookings, setBookings] = useState([]);

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

  // 🔥 INITIAL LOAD
  useEffect(() => {
    if (!user?._id) return;

    fetchBookings();

    socket.on("new-booking", (booking) => {
      if (booking.worker?._id === user._id || booking.worker === user._id) {
        setBookings((prev) => [booking, ...prev]);
      }
    });

    return () => socket.off("new-booking");
  }, [user]);

  // 🔥 STATUS UPDATE
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
          <div key={booking._id} style={styles.card}>
            
            <h3>
              {booking.client?.firstName || "Client"}{" "}
              {booking.client?.lastName || ""}
            </h3>

            <p>{booking.serviceType}</p>
            <p>{booking.message}</p>

            <p>
              Status: <b>{booking.status}</b>
            </p>

            {/* 🔥 LIFECYCLE BUTTONS */}
            {booking.status === "requested" && (
              <>
                <button onClick={() => updateStatus(booking._id, "accepted")}>
                  Accept
                </button>

                <button onClick={() => updateStatus(booking._id, "rejected")}>
                  Reject
                </button>
              </>
            )}

            {booking.status === "accepted" && (
              <button onClick={() => updateStatus(booking._id, "in-progress")}>
                Start Job
              </button>
            )}

            {booking.status === "in-progress" && (
              <button onClick={() => updateStatus(booking._id, "completed")}>
                Complete Job
              </button>
            )}

            {/* 🔥 CHAT */}
            {booking.client && (
              <ChatBox
                bookingId={booking._id}
                receiverId={booking.client._id}
              />
            )}
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
    borderRadius: "10px",
  },
};

export default WorkerBookings;