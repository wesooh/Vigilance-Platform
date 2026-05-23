const Home = () => {
  return (
    <div style={styles.container}>
      
      {/* HERO SECTION */}
      <div style={styles.hero}>
        <h1 style={styles.title}>
          Find Trusted Workers Near You
        </h1>

        <p style={styles.subtitle}>
          Hire maids, plumbers, electricians, cooks, and more — safely and quickly.
        </p>

        {/* SEARCH BAR */}
        <div style={styles.searchBox}>
          <input
            type="text"
            placeholder="Search for services..."
            style={styles.input}
          />
          <button style={styles.searchBtn}>Search</button>
        </div>
      </div>

      {/* CATEGORIES */}
      <h2 style={styles.sectionTitle}>Categories</h2>

      <div style={styles.grid}>
        {[
          "House Maids",
          "Nannies",
          "Plumbers",
          "Electricians",
          "Cooks",
          "Gardeners",
        ].map((item, index) => (
          <div key={index} style={styles.card}>
            {item}
          </div>
        ))}
      </div>

      {/* WORKER PREVIEW */}
      <h2 style={styles.sectionTitle}>Top Rated Workers</h2>

      <div style={styles.workerGrid}>
        {[1, 2, 3].map((w) => (
          <div key={w} style={styles.workerCard}>
            <div style={styles.avatar}></div>
            <h3>Worker Name</h3>
            <p>Electrician • Nairobi</p>
            <button style={styles.hireBtn}>View Profile</button>
          </div>
        ))}
      </div>

    </div>
  );
};

const styles = {
  container: {
    padding: "20px",
  },

  hero: {
    background: "#0B2C59",
    color: "white",
    padding: "40px",
    borderRadius: "10px",
    textAlign: "center",
  },

  title: {
    fontSize: "32px",
    marginBottom: "10px",
  },

  subtitle: {
    opacity: 0.8,
    marginBottom: "20px",
  },

  searchBox: {
    display: "flex",
    justifyContent: "center",
    gap: "10px",
  },

  input: {
    padding: "10px",
    width: "60%",
    borderRadius: "5px",
    border: "none",
  },

  searchBtn: {
    padding: "10px 15px",
    background: "#268426",
    color: "white",
    border: "none",
    cursor: "pointer",
    borderRadius: "5px",
  },

  sectionTitle: {
    marginTop: "30px",
    marginBottom: "10px",
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "10px",
  },

  card: {
    background: "white",
    padding: "15px",
    borderRadius: "8px",
    textAlign: "center",
    boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
  },

  workerGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "15px",
  },

  workerCard: {
    background: "white",
    padding: "15px",
    borderRadius: "10px",
    textAlign: "center",
    boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
  },

  avatar: {
    width: "60px",
    height: "60px",
    background: "#D2D7DF",
    borderRadius: "50%",
    margin: "0 auto 10px",
  },

  hireBtn: {
    marginTop: "10px",
    padding: "8px 12px",
    background: "#16437E",
    color: "white",
    border: "none",
    cursor: "pointer",
  },
};

export default Home;