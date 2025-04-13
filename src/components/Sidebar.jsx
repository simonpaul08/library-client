import { FaHome, FaBook, FaList, FaClipboardList, FaBookmark } from "react-icons/fa";
import { MdLogout } from "react-icons/md";
import { useSidebarContext } from "../context/SidebarContext";
import { useAuthContext } from "../context/AuthContext";
import { useEffect, useRef } from "react";
import { IoMdClose } from "react-icons/io";

const Sidebar = () => {
  const { currentTab, setCurrentTab, isSidebar, setIsSidebar } = useSidebarContext();
  const { handleLogout, currentUser } = useAuthContext();

  const handleSwitchTab = (tab) => {
    setIsSidebar(false)
    setCurrentTab(tab);
  }

  const handleCloseSidebar = () => setIsSidebar(false);
  const sidebarRef = useRef(null)

  return (
    <div className={`sidebar ${isSidebar ? "sidebar-active" : ""}`} ref={sidebarRef}>
      <nav className="side-nav">
        <div className="nav-close" onClick={handleCloseSidebar}>
          <IoMdClose className="nav-close-icon"/>
        </div>
        <div className="side-nav-top">
          <div
            className={`side-nav-item ${currentTab === "home" ? "side-nav-item-active" : ""
              }`}
            onClick={() => handleSwitchTab("home")}
          >
            <FaHome className="side-nav-item-icon" color="#fff" />
            <p>Home</p>
          </div>

          {currentUser?.role === "admin" && <div
            className={`side-nav-item ${currentTab === "books" ? "side-nav-item-active" : ""
              }`}
            onClick={() => handleSwitchTab("books")}
          >
            <FaBook className="side-nav-item-icon" color="#fff" />
            <p>Books</p>
          </div>}

          {currentUser?.role !== "owner" && <div
            className={`side-nav-item ${currentTab === "requests" ? "side-nav-item-active" : ""
              }`}
            onClick={() => handleSwitchTab("requests")}
          >
            <FaList className="side-nav-item-icon" color="#fff" />
            <p>Requests</p>
          </div>}

          {currentUser?.role === "admin" && <div
            className={`side-nav-item ${currentTab === "registry" ? "side-nav-item-active" : ""
              }`}
            onClick={() => handleSwitchTab("registry")}
          >
            <FaClipboardList className="side-nav-item-icon" color="#fff" />
            <p>Registry</p>
          </div>}

          {currentUser?.role === "reader" && <div
            className={`side-nav-item ${currentTab === "issued" ? "side-nav-item-active" : ""
              }`}
            onClick={() => handleSwitchTab("issued")}
          >
            <FaBookmark className="side-nav-item-icon" color="#fff" />
            <p>Issued Books</p>
          </div>}

        </div>
        <div className="side-nav-bottom" onClick={handleLogout}>
          <div className="side-nav-bottom-item">
            <p>Logout</p>
            <MdLogout className="side-nav-bottom-icon" color="#fff" />
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Sidebar;
