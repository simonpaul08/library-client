import { useFormik } from "formik";
import { useState } from "react";
import { Link } from "react-router-dom";
import { object, string } from "yup";
import VerifyOTP from "../components/VerifyOTP";
import { ToastContainer, toast } from "react-toastify";
import Loader from "../components/loader/Loader";
import { useAuthContext } from "../context/AuthContext";
import DemoLogin from "../components/auth/DemoLogin";

const Login = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isModal, setIsModal] = useState(false);
  const { publicInstance } = useAuthContext()

  // handle submit
  const handleSubmit = async (values) => {
    console.log(values);

    setIsLoading(true);
    let body = {
      email: formik.values.email
    }
    try {
      const res = await publicInstance.post("/auth/login", body);
      console.log(res.data);
      if(res.data){
        setIsModal(true);
      }
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
    }catch(e) {
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
  }

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
    <>
      {isModal && (
        <VerifyOTP setIsModal={setIsModal} email={formik.values.email} />
      )}
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
              <h1 className="auth-content-title">Login To The Library</h1>
              <p className="auth-content-para">
                Lorem ipsum dolor sit amet consectetur adipisicing elit dolor sit amet dolor sit amet.
              </p>
              <form className="auth-form" onSubmit={formik.handleSubmit}>
                <div className="form-item">
                  <input
                    type="text"
                    className="form-input"
                    name="email"
                    placeholder="Enter Email Address"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                  />
                  <p>{formik.errors.email || ""}</p>
                </div>

                <button type="submit" className="form-btn">
                  {isLoading ? <Loader /> : "Login"}
                </button>
              </form>
              <p className="form-redirect">
                Don't have an account ? <Link to="/">Register</Link>
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

export default Login;
