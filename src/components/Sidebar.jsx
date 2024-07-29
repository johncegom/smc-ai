import { Link } from "react-router-dom";
import "../assests/Sidebar.css";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

const Sidebar = () => {
  const { handleLogout } = useContext(AuthContext);
  return (
    <nav className="sidebar">
      <div className="container">
        <h3 className="sidebar__title">SmC AI</h3>
        <ul className="flex flex--col sidebar__list">
          <li className="sidebar__link">
            <Link to="/services">Services</Link>
          </li>
          <li className="sidebar__link">
            <Link to="/profile">Profile</Link>
          </li>
          <li className="sidebar__link">
            <button className="btn__logout" onClick={handleLogout}>
              Logout
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Sidebar;
