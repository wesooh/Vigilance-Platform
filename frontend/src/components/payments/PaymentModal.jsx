import { useState } from "react";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";

const PaymentModal = ({ worker, onClose }) => {
  const [amount, setAmount] = useState("");
  const { user } = useAuth();

  const handlePayment = async () => {
    try {
      const res = await axios.post(
        "http://localhost:5000/api/payments",
        {
          worker: worker._id,
          client: user._id,
          totalAmount: Number(amount),
        }
      );

      console.log("PAYMENT:", res.data);

      alert("Payment successful");
      onClose();

    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div style={styles.overlay}>
      <div style={styles.modal}>
        <h2>Pay Worker</h2>

        <input
          type="number"
          placeholder="KES Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          style={styles.input}
        />

        <button onClick={handlePayment} style={styles.button}>
          Pay Now
        </button>

        <button onClick={onClose} style={styles.close}>
          Cancel
        </button>
      </div>
    </div>
  );
};

const styles = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    background: "rgba(0,0,0,0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  modal: {
    background: "#fff",
    padding: "30px",
    borderRadius: "10px",
    width: "350px",
  },
  input: {
    width: "100%",
    padding: "10px",
    marginBottom: "20px",
  },
  button: {
    width: "100%",
    padding: "12px",
    background: "#268426",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
  },
  close: {
    width: "100%",
    padding: "12px",
    marginTop: "10px",
    background: "#ccc",
    border: "none",
    borderRadius: "8px",
  },
};

export default PaymentModal;