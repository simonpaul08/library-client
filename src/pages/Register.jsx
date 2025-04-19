import { useFormik } from "formik";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { object, string } from "yup";
import VerifyOTP from "../components/VerifyOTP";
import { useState } from "react";
import Loader from "../components/loader/Loader";
import { useAuthContext } from "../context/AuthContext";
import DemoLogin from "../components/auth/DemoLogin";

const Register = () => {

  const [isModal, setIsModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { publicInstance } = useAuthContext()

  // handle submit
  const handleSubmit = async (values) => {

    let body = {
      name: values?.name,
      email: values?.email,
    };

    setIsLoading(true)

    try {
      const res = await publicInstance.post("/auth/library", body);
      console.log(res.data);
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
      setIsModal(true)
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
      setIsLoading(false)
    }
  };

  const schema = object({
    name: string().required("name field is required!"),
    email: string().email("invalid email").required("email field is required"),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
    },
    validationSchema: schema,
    validateOnBlur: false,
    onSubmit: handleSubmit,
  });

  return (
    <>
      {isModal && <VerifyOTP setIsModal={setIsModal} email={formik.values.email} />}
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
      <div className="auth">
        <div className="auth-container">
          <div className="auth-content">
            <div className="auth-content-left">
              <h1 className="auth-content-title">Register Your Own Library</h1>
              <p className="auth-content-para">
                Setup your own personalized digital library 
              </p>
              <form className="auth-form" onSubmit={formik.handleSubmit}>
                <div className="form-item">
                  <input
                    type="text"
                    className="form-input"
                    name="name"
                    id="name"
                    placeholder="Enter Library Name"
                    value={formik.values.name}
                    onChange={formik.handleChange}
                  />
                  <p>{formik.errors.name || ""}</p>
                </div>
                <div className="form-item">
                  <input
                    type="text"
                    className="form-input"
                    name="email"
                    id="email"
                    placeholder="Enter Email Address"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                  />
                  <p>{formik.errors.email || ""}</p>
                </div>
                <button type="submit" className="form-btn">
                  {isLoading ? <Loader /> : "Register Now"}
                </button>
              </form>
              <p className="form-redirect">
                Already have an account ? <Link to="/login">Login</Link>
              </p>
              <DemoLogin />
            </div>
            <div className="auth-content-right"></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
