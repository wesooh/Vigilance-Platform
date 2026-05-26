import Navbar from "../components/Navbar";

const MainLayout = ({
  children,
}) => {
  return (
    <div>
      <Navbar />

      <div
        style={{
          paddingTop: "90px",
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default MainLayout;