import React from "react";
import { FaEdit, FaInfoCircle, FaTrash } from "react-icons/fa";
import Loader from "../loader/Loader";

const BookTable = ({ handleIsEdit, list, deleteBook, handleBookInfo, isLoading }) => {
  return (
    <div className="book-table">
      <table>
        <thead>
          <tr>
            <th>Book Name</th>
            <th>Authors</th>
            <th>Publisher</th>
            <th>Version</th>
            <th>Total Copies</th>
            <th>Available Copies</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>

          {isLoading && list?.length === 0 && <Loader />}
          {list?.map(l => {
            const authors = l?.authors?.join(", ")
            return (
              <tr key={l?.isbn}>
                <td>{l?.title}</td>
                <td>{authors}</td>
                <td>{l?.publisher}</td>
                <td>{l?.version}</td>
                <td>{l?.totalCopies}</td>
                <td>{l?.availableCopies}</td>
                <td><FaEdit className="table-action-icon" color="#176B87" title="Edit Book" onClick={() => handleIsEdit(l?.isbn)} /> <FaTrash className="table-action-icon" color="#dc3545" title="Delete Book" onClick={() => deleteBook(l?.isbn)} />
                  <FaInfoCircle className="table-action-icon" title="Book Info" onClick={() => handleBookInfo(l?.isbn)} /> </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  );
};

export default BookTable;
