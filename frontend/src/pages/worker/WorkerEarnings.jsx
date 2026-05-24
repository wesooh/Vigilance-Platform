import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";

const WorkerEarnings = () => {
  const { user } = useAuth();
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    fetchPayments();
  }, []);

  const fetchPayments = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/payments/worker/${user._id}`
      );

      setPayments(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const total = payments.reduce(
    (sum, p) => sum + (p.totalAmount || 0),
    0
  );

  return (
    <div style={{ padding: "20px" }}>
      <h1>💰 Earnings Dashboard</h1>

      <h2>Total Earned: KES {total}</h2>

      <hr />

      {payments.map((p) => (
        <div key={p._id} style={styles.card}>
          <p>💵 Amount: KES {p.totalAmount}</p>
          <p>👤 Client: {p.client?.firstName || "Client"}</p>
          <p>📅 Date: {new Date(p.createdAt).toLocaleString()}</p>
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
    borderRadius: "8px",
  },
};

export default WorkerEarnings;