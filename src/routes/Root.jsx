import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import { useContext, useEffect } from "react";
import "../assests/Root.css";
import Sidebar from "../components/Sidebar";

export default function Root() {
  const { user, triggerAuthCheck } = useContext(AuthContext);

  useEffect(() => {
    triggerAuthCheck();
  }, []);

  if (!user.isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return (
    <>
      <div className="flex">
        <Sidebar />
        <main className="main">
          <Outlet />
        </main>
      </div>
    </>
  );
}
