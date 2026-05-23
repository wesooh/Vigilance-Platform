import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const WorkerProfile = () => {
  const { id } = useParams();

  const [worker, setWorker] = useState(null);

  useEffect(() => {
    fetchWorker();
  }, []);

  const fetchWorker = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/auth/workers/${id}`
      );

      setWorker(res.data);

    } catch (err) {
      console.log(err);
    }
  };

  if (!worker) {
    return <h2>Loading...</h2>;
  }

  return (
    <div style={styles.container}>

      {/* PROFILE IMAGE */}
      <div style={styles.image}></div>

      <h1>
        {worker.firstName} {worker.lastName}
      </h1>

      <p>{worker.category}</p>

      <p>{worker.location}</p>

      <p>
        ⭐ Rating: {worker.rating}
      </p>

      <p>
        {worker.availability
          ? "🟢 Available"
          : "🔴 Offline"}
      </p>

      {/* ABOUT */}
      <section>
        <h2>About</h2>
        <p>{worker.about}</p>
      </section>

      {/* SKILLS */}
      <section>
        <h2>Skills</h2>

        <ul>
          {worker.skills?.map((skill, i) => (
            <li key={i}>{skill}</li>
          ))}
        </ul>
      </section>

      {/* EXPERIENCE */}
      <section>
        <h2>Experience</h2>
        <p>{worker.experience}</p>
      </section>

      {/* PRICING */}
      <section>
        <h2>Pricing</h2>

        <p>
          Daily: KES {worker.price?.daily}
        </p>

        <p>
          Weekly: KES {worker.price?.weekly}
        </p>

        <p>
          Monthly: KES {worker.price?.monthly}
        </p>
      </section>

      {/* TESTIMONIALS */}
      <section>
        <h2>Testimonials</h2>

        {worker.testimonials?.map((test, i) => (
          <div key={i}>
            <strong>
              {test.clientName}
            </strong>

            <p>{test.comment}</p>
          </div>
        ))}
      </section>

      {/* HIRE BUTTON */}
      <button style={styles.button}>
        Hire Worker
      </button>

    </div>
  );
};

const styles = {
  container: {
    padding: "20px",
  },

  image: {
    width: "120px",
    height: "120px",
    borderRadius: "50%",
    background: "#ccc",
    marginBottom: "20px",
  },

  button: {
    padding: "12px 20px",
    border: "none",
    background: "#268426",
    color: "#fff",
    borderRadius: "8px",
    cursor: "pointer",
    marginTop: "20px",
  },
};

export default WorkerProfile;