import AuthNavbar from "../components/AuthNavbar";

const AuthLayout = ({ children }) => {
  return (
    <div style={styles.wrapper}>
      <AuthNavbar />

      <div style={styles.center}>
        {children}
      </div>
    </div>
  );
};

const styles = {
  wrapper: {
    minHeight: "100vh",
    background: "#D2D7DF",
  },

  center: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: "90px",
  },
};

export default AuthLayout;