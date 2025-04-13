import React, { useState } from "react";
import { generateQR } from "../utils/utils";
import { toast } from "react-toastify";
import Loader from "./loader/Loader";
import { useAuthContext } from "../context/AuthContext";

const Book = ({ book }) => {

    const [isLoading, setIsLoading] = useState(false);
    const authors = book?.authors?.join(", ");
    var blob = generateQR(book?.qrCode, "image/png");
    var blobUrl = URL.createObjectURL(blob);
    const { privateInstance } = useAuthContext()

    // handle issue book
    const handleIssueBook = async () => {
        setIsLoading(true)
        let body = {
            isbn: book?.isbn
        }
        try {
            const res = await privateInstance.post("/reader/issue/request", body)
            if(res.data){
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
            setIsLoading(false)
        }
    }
    return (
        <div className="book-card">
            <div className="book-image">
                <img src={blobUrl} alt="qr-code" />
            </div>
            <h3 className="book-title">{book?.title}</h3>
            <p className="book-version">{book?.version}</p>
            <p className="book-authors">{authors}</p>
            <p className="book-publisher">{book?.publisher}</p>
            <button className="book-issue" onClick={handleIssueBook}>
                {isLoading ? <Loader /> : "Issue Book"}
            </button>
        </div>
    );
};

export default Book;
