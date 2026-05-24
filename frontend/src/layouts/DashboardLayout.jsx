import Sidebar from "../components/Sidebar";

const DashboardLayout = ({ children }) => {
  return (
    <div style={styles.container}>
      <Sidebar />

      <div style={styles.content}>
        {children}
      </div> 
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    minHeight: "100vh",
  },

  content: {
    flex: 1,
    padding: "20px",
    background: "#f5f7fb",
  },
};

export default DashboardLayout;