import React, { useEffect, useState } from "react";
import RequestTable from "../tables/RequestTable";
import { ToastContainer, toast } from "react-toastify";
import { useAuthContext } from "../../context/AuthContext";
import { handleSortByStatus } from "../../utils/utils";

const Requests = () => {

  const [requests, setRequests] = useState([]);
  const { privateInstance } = useAuthContext()

  const retrieveRequests = async () => {
    try {
      const res = await privateInstance.get("/user/issues")
      if (res.data) {
        const sorted = handleSortByStatus(res.data?.requests)
        setRequests(sorted)
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
    retrieveRequests()
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
        <RequestTable requests={requests} retrieveRequests={retrieveRequests}/>
      </div>
    </>
  );
};

export default Requests;
