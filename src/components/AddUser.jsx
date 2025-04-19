import { useFormik } from "formik";
import React, { useState } from "react";
import { object, string } from "yup";
import Loader from "./loader/Loader";
import { FaPaperPlane } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import { toast } from "react-toastify";
import { useAuthContext } from "../context/AuthContext";

const AddUser = ({ closeModal, role, currentUser, retrieveUsers }) => {
  const { privateInstance } = useAuthContext()
  const handleSubmit = async (values) => {
    console.log(values);
    setIsLoading(true);

    let url = `/${currentUser?.role}/onboard/${role === "owner" ? "admin" : "reader"}`
    let body = { user: values?.email }

    try {
      const res = await privateInstance.post(url, body);
      if (res.data) {
        closeModal()
        retrieveUsers()
        toast.success(res.data?.message, {
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
    } finally {
      setIsLoading(false);
    }
  };
  const [isLoading, setIsLoading] = useState(false);
  const schema = object({
    email: string().email("invalid email").required("email field is required"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: schema,
    onSubmit: handleSubmit,
  });

  return (
    <div className="modal">
      <div className="modal-content">
        <div className="modal-close-wrapper">
          <h3 className="modal-content-title">
            Invite {role === "admin" ? "Reader" : "Admin"}
          </h3>
          <IoMdClose className="modal-close" onClick={closeModal} />
        </div>

        <div className="modal-body">
        <form className="modal-form" onSubmit={formik.handleSubmit}>
          <div className="modal-form-item">
            <input
              type="text"
              className="form-input-alt"
              name="email"
              id="email"
              placeholder="Enter Email"
              value={formik.values.email}
              onChange={formik.handleChange}
            />
            <p>{formik.errors.email || ""}</p>
          </div>
          <button type="submit" className="modal-form-btn">
            {isLoading ? (
              <Loader />
            ) : (
              <>
                {"Send Invite"} <FaPaperPlane className="invite-icon" />
              </>
            )}
          </button>
        </form>
        </div>

      </div>
    </div>
  );
};

export default AddUser;
