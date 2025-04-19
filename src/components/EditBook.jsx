import React, { useState } from "react";
import { IoMdClose } from "react-icons/io";
import Loader from "./loader/Loader";
import { object, string } from "yup";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import { useAuthContext } from "../context/AuthContext";

const EditBook = ({ closeModal, book, RetrieveBooks }) => {

    const [isLoading, setIsLoading] = useState(false);
    const { privateInstance } = useAuthContext()

    const handleSubmit = async (values) => {
        setIsLoading(true);

        let body = {
            isbn: book?.isbn,
            title: values?.title,
            authors: values?.authors?.split(", "),
            publisher: values?.publisher,
            version: values?.version,
            totalCopies: parseInt(values?.totalCopies)
        }

        try {
            const res = await privateInstance.patch("/admin/update/book", body);
            if (res.data) {
                RetrieveBooks()
                closeModal()
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
            setIsLoading(false)
        }
    };
    const digitsOnly = (value) => /^\d+$/.test(value)
    const schema = object({
        title: string().required("field is required"),
        authors: string().required("field is required"),
        publisher: string().required("field is required"),
        version: string().required("field is required"),
        totalCopies: string().notRequired().test('Digits only', 'only digits are allowed', digitsOnly).min(0, "no negative number")
    });

    const formik = useFormik({
        initialValues: {
            title: book?.title || "",
            authors: book?.authors?.join(",") || "",
            publisher: book?.publisher || "",
            version: book?.version || "",
            totalCopies: ""
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
                    <h3 className="modal-content-title">Edit Inventory</h3>
                    <IoMdClose className="modal-close" onClick={closeModal} />
                </div>
                <div className="modal-body">
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
                            <input type="text" className="form-input-alt" name="totalCopies" id="totalCopies" placeholder="Total Copies"
                                value={formik.values.totalCopies} onChange={formik.handleChange} />
                            <p>{formik.errors.totalCopies}</p>
                        </div>
                        <button type="submit" className="modal-form-btn">
                            {isLoading ? <Loader /> : <>{"Submit"}</>}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default EditBook;
