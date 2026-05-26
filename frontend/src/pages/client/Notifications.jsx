import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";

const Notifications = () => {
  const { user } = useAuth();

  const [notifications, setNotifications] =
    useState([]);

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications =
    async () => {
      try {
        const res =
          await axios.get(
            `http://localhost:5000/api/notifications/${user._id}`
          );

        setNotifications(res.data);

      } catch (err) {
        console.log(err);
      }
    };

  return (
    <div>
      <h1>Notifications</h1>

      {notifications.map((n) => (
        <div
          key={n._id}
          style={styles.card}
        >
          <h3>{n.title}</h3>

          <p>{n.message}</p>
        </div>
      ))}
    </div>
  );
};

const styles = {
  card: {
    padding: "15px",
    border: "1px solid #ddd",
    marginBottom: "10px",
    borderRadius: "10px",
  },
};

export default Notifications;