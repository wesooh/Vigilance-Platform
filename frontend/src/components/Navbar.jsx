import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const auth = useAuth();
  const navigate = useNavigate();

  console.log("AUTH CONTEXT:", auth);

  const user = auth?.user;
  const logout = auth?.logout;

  return (
    <nav>
      <h2>Vigilance</h2>

      {!user ? (
        <>
          <button onClick={() => navigate("/login")}>Login</button>
          <button onClick={() => navigate("/register")}>Sign Up</button>
        </>
      ) : (
        <>
          <button onClick={() => navigate(`/${user.role}/dashboard`)}>Dashboard</button>
          <button
            onClick={() => {
              logout();
              navigate("/");
            }}
          >
            Logout
          </button>
        </>
      )}
    </nav>
  );
};

export default Navbar;