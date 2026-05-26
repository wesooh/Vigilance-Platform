import { useEffect, useState } from "react";
import axios from "axios";

const AdminFinanceDashboard = () => {
  const [summary, setSummary] = useState({});
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res1 = await axios.get(
        "http://localhost:5000/api/admin/finance/summary"
      );

      const res2 = await axios.get(
        "http://localhost:5000/api/admin/finance/payments"
      );

      setSummary(res1.data);
      setPayments(res2.data);

    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <h1>Admin Finance Dashboard</h1>

      {/* CARDS */}
      <div style={{ display: "flex", gap: "20px" }}>
        <Card title="Revenue" value={summary.totalRevenue} />
        <Card title="Commission" value={summary.totalCommission} />
        <Card title="Worker Earnings" value={summary.totalWorkerEarnings} />
        <Card title="Payments" value={summary.totalPayments} />
      </div>

      {/* TABLE */}
      <h2>Recent Payments</h2>

      {payments.map((p) => (
        <div key={p._id} style={styles.card}>
          <p>Client: {p.client?.firstName}</p>
          <p>Worker: {p.worker?.firstName}</p>
          <p>Total: {p.totalAmount}</p>
          <p>Commission: {p.companyCommission}</p>
          <p>Worker gets: {p.workerAmount}</p>
          <p>Status: {p.status}</p>
        </div>
      ))}
    </div>
  );
};

const Card = ({ title, value }) => (
  <div style={styles.box}>
    <h3>{title}</h3>
    <p>KES {value || 0}</p>
  </div>
);

const styles = {
  box: {
    padding: "15px",
    border: "1px solid #ddd",
    borderRadius: "10px",
    minWidth: "150px",
  },

  card: {
    padding: "15px",
    border: "1px solid #ddd",
    marginTop: "10px",
    borderRadius: "10px",
  },
};

export default AdminFinanceDashboard;