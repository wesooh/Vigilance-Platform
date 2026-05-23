import { useNavigate } from "react-router-dom";

const navigate = useNavigate();

<div style={styles.card}>
  <div style={styles.avatar}></div>

  <h3>
    {worker.firstName} {worker.lastName}
  </h3>

  <p>{worker.location}</p>

  <p style={styles.role}>{worker.role}</p>

  {/* NEW DATA DISPLAY */}
  <p>⭐ Rating: {worker.rating}</p>

  <p>
    Skills:{" "}
    {worker.skills?.length
      ? worker.skills.join(", ")
      : "Not added"}
  </p>

  <button style={styles.btn}
  onClick={() =>
    navigate(`/client/worker/${worker._id}`)
  }>
    View Profile
  </button>
</div>

console.log(worker);