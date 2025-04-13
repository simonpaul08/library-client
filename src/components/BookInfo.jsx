import React from "react";
import { IoMdClose } from "react-icons/io";
import { generateQR } from "../utils/utils";

const BookInfo = ({ closeModal, book }) => {
    const blob = generateQR(book?.qrCode, "image/png");
    const url = URL.createObjectURL(blob);

    const authors = book?.authors?.join(", ")
    return (
        <div className="modal">
            <div className="modal-content modal-content-alt modal-content-info">
                <div className="modal-close-wrapper">
                    <IoMdClose className="modal-close" onClick={closeModal} />
                </div>
                <div className="modal-image-wrapper">   
                    <img src={url} alt="QR code" />
                </div>
                <h3 className="book-title">{book?.title}</h3>
                <p className="book-version">{book?.version}</p>
                <p className="book-authors">{authors}</p>
                <p className="book-publisher">{book?.publisher}</p>
            </div>
        </div>
    );
};

export default BookInfo;
