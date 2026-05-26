import axios from "axios";
import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import WorkerVerificationModal from "../../components/worker/VerificationModal";

const WorkerDashboard = () => {
  const { user } = useAuth();
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (user?._id) {
      checkStatus();
    }
  }, [user]);

  const checkStatus = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/verification/check/${user._id}`
      );

      if (!res.data.isComplete) {
        setShowModal(true);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <h1>Worker Dashboard</h1>

      {showModal && (
        <WorkerVerificationModal
          user={user}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
};

export default WorkerDashboard;