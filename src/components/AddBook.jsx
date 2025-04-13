import React, { useState } from "react";
import { IoMdClose } from "react-icons/io";
import { number, object, string } from "yup";
import { useFormik } from "formik";
import Loader from "./loader/Loader";
import { toast } from "react-toastify";
import { useAuthContext } from "../context/AuthContext";

const AddBook = ({ closeModal, RetrieveBooks }) => {
    const [isLoading, setIsLoading] = useState(false);
    const { privateInstance } = useAuthContext()

    const handleSubmit = async (values) => {
        console.log(values);
        setIsLoading(true);

        let body = {
            title: values?.title,
            authors: values?.authors?.split(","),
            publisher: values?.publisher,
            version: values?.version,
            totalCopies: values?.totalCopies,
        };

        try {
            const res = await privateInstance.post("/admin/create/inventory", body);
            if (res.data) {
                closeModal()
                RetrieveBooks()
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
        }
        finally {
            setIsLoading(false)
        }
    };

    const schema = object({
        title: string().required("field is required"),
        authors: string().required("field is required"),
        publisher: string().required("field is required"),
        version: string().required("field is required"),
        totalCopies: number().integer().required("field is required"),
    });

    const formik = useFormik({
        initialValues: {
            title: "",
            authors: "",
            publisher: "",
            version: "",
            totalCopies: "",
        },
        validationSchema: schema,
        validateOnBlur: false,
        validateOnChange: false,
        onSubmit: handleSubmit,
    });

    return (
        <div className="modal">
            <div className="modal-content modal-content-alt">
                <div className="modal-close-wrapper">
                    <IoMdClose className="modal-close" onClick={closeModal} />
                </div>
                <h3 className="modal-content-title">Add Inventory</h3>
                <form className="modal-form" onSubmit={formik.handleSubmit}>
                    <div className="modal-form-item">
                        <input
                            type="text"
                            className="form-input-alt"
                            name="title"
                            id="title"
                            placeholder="Enter Book Title"
                            value={formik.values.title}
                            onChange={formik.handleChange}
                        />
                        <p>{formik.errors.title || ""}</p>
                    </div>
                    <div className="modal-form-item">
                        <input
                            type="text"
                            className="form-input-alt"
                            name="authors"
                            id="authors"
                            placeholder="Authors separated by comma"
                            value={formik.values.authors}
                            onChange={formik.handleChange}
                        />
                        <p>{formik.errors.authors || ""}</p>
                    </div>
                    <div className="modal-form-item">
                        <input
                            type="text"
                            className="form-input-alt"
                            name="publisher"
                            id="publisher"
                            placeholder="Enter Publisher Name"
                            value={formik.values.publisher}
                            onChange={formik.handleChange}
                        />
                        <p>{formik.errors.publisher || ""}</p>
                    </div>
                    <div className="modal-form-item">
                        <input
                            type="text"
                            className="form-input-alt"
                            name="version"
                            id="version"
                            placeholder="Enter Book Version"
                            value={formik.values.version}
                            onChange={formik.handleChange}
                        />
                        <p>{formik.errors.version || ""}</p>
                    </div>
                    <div className="modal-form-item">
                        <input
                            type="number"
                            className="form-input-alt"
                            name="totalCopies"
                            id="totalCopies"
                            placeholder="Enter Total Copies"
                            value={formik.values.totalCopies}
                            onChange={formik.handleChange}
                        />
                        <p>{formik.errors.totalCopies || ""}</p>
                    </div>
                    <button type="submit" className="modal-form-btn">
                        {isLoading ? <Loader /> : <>{"Submit"}</>}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddBook;
