import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";

const WorkerEarnings = () => {
  const { user } = useAuth();

  const [payments, setPayments] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    if (user?._id) {
      fetchPayments();
    }
  }, [user]);

  const fetchPayments = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/payments/worker/${user._id}`
      );

      setPayments(res.data);

      const totalEarned = res.data.reduce(
        (sum, payment) =>
          sum + payment.workerAmount,
        0
      );

      setTotal(totalEarned);

    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div style={styles.container}>
      <h1>Worker Earnings</h1>

      <div style={styles.totalCard}>
        <h2>Total Earnings</h2>

        <h1>KES {total}</h1>
      </div>

      <h2>Payment History</h2>

      {payments.length === 0 ? (
        <p>No payments yet</p>
      ) : (
        payments.map((payment) => (
          <div
            key={payment._id}
            style={styles.card}
          >
            <p>
              Amount Paid:
              KES {payment.totalAmount}
            </p>

            <p>
              Your Earnings:
              KES {payment.workerAmount}
            </p>

            <p>
              Company Commission:
              KES {payment.companyCommission}
            </p>

            <p>
              Status:
              {payment.status}
            </p>

            <p>
              Date:
              {new Date(
                payment.createdAt
              ).toLocaleDateString()}
            </p>
          </div>
        ))
      )}
    </div>
  );
};

const styles = {
  container: {
    padding: "20px",
  },

  totalCard: {
    background: "#0B2C59",
    color: "#fff",
    padding: "30px",
    borderRadius: "12px",
    marginBottom: "30px",
  },

  card: {
    border: "1px solid #ddd",
    padding: "20px",
    borderRadius: "10px",
    marginBottom: "15px",
    background: "#fff",
  },
};

export default WorkerEarnings;