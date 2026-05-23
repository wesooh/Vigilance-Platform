import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const FindWorkers = () => {
  const [workers, setWorkers] = useState([]);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    fetchWorkers();
  }, [search, category]);

  const fetchWorkers = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/auth/workers",
        {
          params: {
            search,
            category,
          },
        }
      );

      setWorkers(res.data);

    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <h1>Find Workers</h1>

      {/* SEARCH */}
      <input
        type="text"
        placeholder="Search workers..."
        value={search}
        onChange={(e) =>
          setSearch(e.target.value)
        }
      />

      {/* CATEGORY */}
      <select
        value={category}
        onChange={(e) =>
          setCategory(e.target.value)
        }
      >
        <option value="">
          All Categories
        </option>

        <option value="House Maid">
          House Maid
        </option>

        <option value="Electrician">
          Electrician
        </option>

        <option value="Plumber">
          Plumber
        </option>

        <option value="Cook">
          Cook
        </option>
      </select>

      {/* WORKERS */}
      <div
        style={{
          display: "grid",
          gap: "20px",
          marginTop: "20px",
        }}
      >
        {workers.map((worker) => (
          <div
            key={worker._id}
            style={cardStyle}
          >
            <h3>
              {worker.firstName}{" "}
              {worker.lastName}
            </h3>

            <p>
              Category: {worker.category}
            </p>

            <p>
              Location: {worker.location}
            </p>

            <button
              onClick={() =>
                navigate(
                  `/client/worker/${worker._id}`
                )
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
  border: "1px solid #ddd",
  padding: "20px",
  borderRadius: "10px",
};

export default FindWorkers;