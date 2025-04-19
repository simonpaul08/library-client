import { useFormik } from "formik";
import { toast } from "react-toastify";
import { object, string } from "yup";
import { useState } from "react";
import Loader from "./loader/Loader";
import { useAuthContext } from "../context/AuthContext";

const VerifyOTP = ({ setIsModal, email }) => {
  const [isLoading, setIsLoading] = useState(false);
  const { handleSetUser, publicInstance } = useAuthContext();

  // handle submit
  const handleSubmit = async (values) => {
    console.log(values);

    setIsLoading(true)

    let body = {
      otp: values?.otp,
      email
    };

    try {
      const res = await publicInstance.post("/auth/otp/verify", body);
      console.log(res.data);
      setIsModal(false);
      handleSetUser(res.data?.user, res.data?.token);
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
    otp: string().required("otp field is required!"),
  });

  const formik = useFormik({
    initialValues: {
      otp: "",
    },
    validationSchema: schema,
    onSubmit: handleSubmit,
  });

  return (
    <div className="modal">
      <div className="modal-content">
        <div className="modal-close-wrapper">
          <h3 className="modal-content-title">Verify OTP</h3>
          <p></p>
        </div>
        <div className="modal-body">
        <form className="modal-form" onSubmit={formik.handleSubmit}>
          <div className="modal-form-item">
            <input
              type="text"
              className="form-input-alt"
              name="otp"
              id="otp"
              placeholder="Enter OTP"
              value={formik.values.otp}
              onChange={formik.handleChange}
            />
            <p>{formik.errors.otp || ""}</p>
          </div>
          <button type="submit" className="modal-form-btn">
            {isLoading ? <Loader /> : "Submit"}
          </button>
        </form>
        </div>
      </div>
    </div>
  );
};

export default VerifyOTP;
