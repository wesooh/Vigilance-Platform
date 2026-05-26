import axios from "axios";
import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import VerificationModal from "../../components/worker/WorkerVerificationModal";

const WorkerDashboard = () => {
  const { user } = useAuth();
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (user?._id) {
      checkStatus();
    }
  }, [user]);

  const checkStatus = async () => {
    const res = await axios.get(
      `http://localhost:5000/api/verification/status/${user._id}`
    );

    if (!res.data.isComplete) {
      setShowModal(true);
    }
  };

  return (
    <div>
      <h1>Worker Dashboard</h1>

      {showModal && (
        <VerificationModal
          user={user}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
};

export default WorkerDashboard;