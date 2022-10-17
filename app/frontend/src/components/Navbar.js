import { useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../context/AuthContext";

const Navbar = () => {
  const { user, logoutUser } = useContext(AuthContext);
  return (
    <nav className="navbar">
      {user ? (
        <>
          <Link to="/">News Board App</Link>

          <Link to="/list-posts">Post list</Link>

          <button onClick={logoutUser}>Logout</button>
        </>
      ) : (
        <>
          <Link to="/list-posts">Post list</Link>

          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
        </>
      )}
    </nav>
  );
};

export default Navbar;