import { Navigate, Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import SidebarContextProvider from "../context/SidebarContext";
import { useAuthContext } from "../context/AuthContext";

const DashboardLayout = () => {
  const { currentUser } = useAuthContext();
  return (
    <>
      {currentUser ? 
          <SidebarContextProvider>
          <div className="dashboard">
            <Sidebar />
            <Outlet />
          </div>
        </SidebarContextProvider> :
        <Navigate to="/register" />}
    </>

  );
};

export default DashboardLayout;
