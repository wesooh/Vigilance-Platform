import { useState } from "react";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";

const EditProfile = () => {
  const { user } = useAuth();

  const [formData, setFormData] =
    useState({
      about: "",
      experience: "",
      category: "",
      skills: "",
      daily: "",
      weekly: "",
      monthly: "",
    });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.put(
        `http://localhost:5000/api/auth/workers/${user._id}`,
        {
          about: formData.about,

          experience:
            formData.experience,

          category:
            formData.category,

          skills:
            formData.skills
              .split(",")
              .map((s) => s.trim()),

          price: {
            daily:
              Number(formData.daily),

            weekly:
              Number(formData.weekly),

            monthly:
              Number(formData.monthly),
          },
        }
      );

      alert("Profile Updated");

    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div style={styles.container}>
      <h1>Edit Profile</h1>

      <form onSubmit={handleSubmit}>

        <textarea
          name="about"
          placeholder="About"
          onChange={handleChange}
        />

        <input
          type="text"
          name="experience"
          placeholder="Experience"
          onChange={handleChange}
        />

        <input
          type="text"
          name="category"
          placeholder="Category"
          onChange={handleChange}
        />

        <input
          type="text"
          name="skills"
          placeholder="Skills comma separated"
          onChange={handleChange}
        />

        <input
          type="number"
          name="daily"
          placeholder="Daily Price"
          onChange={handleChange}
        />

        <input
          type="number"
          name="weekly"
          placeholder="Weekly Price"
          onChange={handleChange}
        />

        <input
          type="number"
          name="monthly"
          placeholder="Monthly Price"
          onChange={handleChange}
        />

        <button type="submit">
          Save Profile
        </button>

      </form>
    </div>
  );
};

const styles = {
  container: {
    padding: "20px",
  },
};

export default EditProfile;