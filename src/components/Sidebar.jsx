import { Link, useLocation } from "react-router-dom";
import "../assests/Sidebar.css";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import HandshakeOutlinedIcon from "@mui/icons-material/HandshakeOutlined";
import PermIdentityOutlinedIcon from "@mui/icons-material/PermIdentityOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";

const Sidebar = () => {
  const { handleLogout } = useContext(AuthContext);
  const currentPath = useLocation().pathname;
  return (
    <nav className="sidebar">
      <div className="container">
        <Link to="/" className="sidebar__title">
          SmC AI
        </Link>
        <ul className="flex flex--col sidebar__list">
          <li
            id="sidebar__services"
            className={
              "sidebar__link " +
              (currentPath.includes("/services") ? "hightlight" : "")
            }
          >
            <Link to="services">
              <HandshakeOutlinedIcon />
              <span>Services</span>
            </Link>
          </li>
          <li
            className={
              "sidebar__link " +
              (currentPath.includes("/profile") ? "hightlight" : "")
            }
          >
            <Link to="profile">
              <PermIdentityOutlinedIcon />
              <span>Profile</span>
            </Link>
          </li>
          <li className="sidebar__link">
            <button className="btn__logout" onClick={handleLogout}>
              <LogoutOutlinedIcon /> Logout
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Sidebar;
