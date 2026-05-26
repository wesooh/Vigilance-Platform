import axios from "axios";
import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import WorkerVerificationModal from "../../components/worker/WorkerVerificationModal";

const WorkerDashboard = () => {
  const { user } = useAuth();
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (user?.role === "worker" && !user?.isVerified) {
    setShowModal(true);
    }
  }, [user]);
  
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