import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const WorkerProfile = () => {
  const { id } = useParams();
  const [worker, setWorker] = useState(null);

  useEffect(() => {
    fetchWorker();
  }, []);

  const fetchWorker = async () => {
    const res = await axios.get(
      "http://localhost:5000/api/auth/workers"
    );

    const found = res.data.find((w) => w._id === id);
    setWorker(found);
  };

  if (!worker) return <p>Loading...</p>;

  return (
    <div>
      <h1>
        {worker.firstName} {worker.lastName}
      </h1>

      <p>{worker.location}</p>

      <p>Rating: {worker.rating}</p>

      <p>
        Skills:{" "}
        {worker.skills?.join(", ")}
      </p>
    </div>
  );
};

export default WorkerProfile;