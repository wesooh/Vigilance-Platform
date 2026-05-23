import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const FindWorkers = () => {
  const [workers, setWorkers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchWorkers();
  }, []);

  const fetchWorkers = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/auth/workers"
      );

      setWorkers(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <h2>Find Workers</h2>

      <div style={{ display: "grid", gap: "20px" }}>
        {workers.map((worker) => (
          <div key={worker._id} style={cardStyle}>
            <h3>
              {worker.firstName} {worker.lastName}
            </h3>

            <p>{worker.location}</p>

            <button
              onClick={() =>
                navigate(`/client/worker/${worker._id}`)
              }
            >
              View Profile
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

const cardStyle = {
  padding: "15px",
  border: "1px solid #ddd",
  borderRadius: "10px",
};

export default FindWorkers;