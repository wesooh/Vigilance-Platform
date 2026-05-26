const Home = () => {
  return (
    <div style={styles.container}>
      
      {/* HERO */}
      <section style={styles.hero}>
        <h1 style={styles.heroTitle}>
          Trusted Workers.
          <br />
          Reliable Services.
        </h1>

        <p style={styles.heroText}>
          Vigilance connects you
          with verified maids,
          nannies, plumbers,
          electricians, cooks,
          cleaners, and more.
        </p>

        <div style={styles.heroButtons}>
          <button style={styles.primaryBtn}>
            Find Workers
          </button>

          <button style={styles.secondaryBtn}>
            Become A Worker
          </button>
        </div>
      </section>

      {/* ABOUT */}
      <section style={styles.section}>
        <h2>What is Vigilance?</h2>

        <p style={styles.paragraph}>
          Vigilance is a modern
          service marketplace
          helping clients hire
          trusted professionals
          safely and quickly.
        </p>
      </section>

      {/* SERVICES */}
      <section style={styles.section}>
        <h2>Popular Services</h2>

        <div style={styles.grid}>
          {[
            "House Maids",
            "Nannies",
            "Plumbers",
            "Electricians",
            "Cooks",
            "Gardeners",
          ].map((item, index) => (
            <div
              key={index}
              style={styles.card}
            >
              {item}
            </div>
          ))}
        </div>
      </section>

      {/* REVIEWS */}
      <section style={styles.section}>
        <h2>Client Reviews</h2>

        <div style={styles.reviewGrid}>
          {[1, 2, 3].map((r) => (
            <div
              key={r}
              style={styles.reviewCard}
            >
              <p>
                “Amazing service and
                trustworthy workers.”
              </p>

              <h4>
                — Nairobi Client
              </h4>
            </div>
          ))}
        </div>
      </section>

      {/* CONTACT */}
      <section style={styles.contact}>
        <h2>Contact Us</h2>

        <p>
          Email:
          support@vigilance.com
        </p>

        <p>
          Phone:
          +254 700 000 000
        </p>

        <p>
          Nairobi, Kenya
        </p>
      </section>

      {/* FOOTER */}
      <footer style={styles.footer}>
        © 2026 Vigilance. All
        rights reserved.
      </footer>
    </div>
  );
};

const styles = {
  container: {
    background: "#F5F7FB",
  },

  hero: {
    minHeight: "90vh",
    background:
      "linear-gradient(to right,#0B2C59,#16437E)",
    color: "white",
    display: "flex",
    flexDirection: "column",
    justifyContent:
      "center",
    alignItems: "center",
    textAlign: "center",
    padding: "40px",
  },

  heroTitle: {
    fontSize: "60px",
    marginBottom: "20px",
  },

  heroText: {
    maxWidth: "700px",
    fontSize: "20px",
    lineHeight: "1.6",
  },

  heroButtons: {
    display: "flex",
    gap: "15px",
    marginTop: "30px",
  },

  primaryBtn: {
    background: "#268426",
    color: "white",
    border: "none",
    padding: "14px 24px",
    borderRadius: "10px",
    cursor: "pointer",
  },

  secondaryBtn: {
    background: "white",
    color: "#0B2C59",
    border: "none",
    padding: "14px 24px",
    borderRadius: "10px",
    cursor: "pointer",
  },

  section: {
    padding: "80px 40px",
    textAlign: "center",
  },

  paragraph: {
    marginTop: "20px",
    color: "#555",
  },

  grid: {
    marginTop: "30px",
    display: "grid",
    gridTemplateColumns:
      "repeat(auto-fit,minmax(200px,1fr))",
    gap: "20px",
  },

  card: {
    background: "white",
    padding: "30px",
    borderRadius: "15px",
    boxShadow:
      "0 4px 10px rgba(0,0,0,0.1)",
  },

  reviewGrid: {
    marginTop: "30px",
    display: "grid",
    gridTemplateColumns:
      "repeat(auto-fit,minmax(250px,1fr))",
    gap: "20px",
  },

  reviewCard: {
    background: "white",
    padding: "25px",
    borderRadius: "15px",
  },

  contact: {
    background: "#0B2C59",
    color: "white",
    padding: "60px",
    textAlign: "center",
  },

  footer: {
    background: "#081E3D",
    color: "white",
    textAlign: "center",
    padding: "20px",
  },
};

export default Home;