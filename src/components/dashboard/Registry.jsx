import React, { useEffect, useState } from "react";
import RegistryTable from "../tables/RegistryTable";
import { ToastContainer, toast } from "react-toastify";
import { useAuthContext } from "../../context/AuthContext";
import { handleSortByIssueStatus } from "../../utils/utils";

const Registry = () => {

  const [registry, setRegistry] = useState([]);
  const { privateInstance } = useAuthContext()

  const retrieveRegistry = async () => {
    try {
      const res = await privateInstance.get("/user/registry")
      if(res.data){
        const sorted = handleSortByIssueStatus(res.data?.registry)
        setRegistry(sorted)
      }

    } catch (e) {
      let error = e?.response?.data?.message || e?.response?.data?.error;
      if (error) {
        toast.error(error, {
          position: "top-right",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      } else {
        toast.error(e?.message, {
          position: "top-right",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    }
  }

  useEffect(() => {
    retrieveRegistry();
  }, [])
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={1500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <div className="dashboard-content">
        {/* <div className="add-book-wrapper">

          <div className="search-wrapper">
            <form className="search-form">
              <input
                type="text"
                name="search"
                className="search-form-input"
                placeholder="Search Book"
              />
              <button type="submit" className="search-btn">
                <FaSearch color="#fff" className="search-icon" />
              </button>
            </form>
          </div>
        </div> */}
        <RegistryTable registry={registry}/>
      </div>
    </>
  );
};

export default Registry;
