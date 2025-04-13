import React from "react";
import Home from "../components/dashboard/Home";
import { useSidebarContext } from "../context/SidebarContext";
import Profile from "../components/dashboard/Profile";
import Books from "../components/dashboard/Books";
import Requests from "../components/dashboard/Requests";
import Registry from "../components/dashboard/Registry";
import IssuedBooks from "../components/dashboard/IssuedBooks";
import Header from "../components/Header";

const Dashboard = () => {
    const { currentTab } = useSidebarContext()
  return (
    <div className="dashboard-content-wrapper">
        <Header />
        {currentTab === "home" && <Home />}
        {currentTab === "profile" && <Profile />}
        {currentTab === "books" && <Books />}
        {currentTab === "requests" && <Requests />}
        {currentTab === "registry" && <Registry />}
        {currentTab === "issued" && <IssuedBooks />}
    </div>
  );
};

export default Dashboard;
