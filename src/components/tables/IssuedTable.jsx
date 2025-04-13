import React from 'react'
import { toast } from 'react-toastify';
import { useAuthContext } from '../../context/AuthContext';

const IssuedTable = ({ registry, retrieveRegistry }) => {

    const { privateInstance } = useAuthContext()

    // handle return book
    const handleReturnBook = async (id) => {
        let body = {
            isbn: id
        }

        try {
            const res = await privateInstance.post("reader/return/request", body);
            if (res.data) {
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
                retrieveRegistry()
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
    return (
        <div className="issued-table">
            <table>
                <thead>
                    <tr>
                        <th>Issue ID</th>
                        <th>Book Name</th>
                        <th>Issue Date</th>
                        <th>Return Date</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {registry?.map(r => {

                        const issueDate = new Date(r?.issueDate).toLocaleDateString();
                        const returnDate = r?.returnDate ? new Date(r?.returnDate).toLocaleDateString() : "NA";

                        return (
                            <tr key={r?.issueId}>
                                <td>{r?.issueId}</td>
                                <td>{r?.BookInventory?.title}</td>
                                <td>{issueDate}</td>
                                <td>{returnDate}</td>
                                <td>{r?.issueStatus}</td>
                                <td>{r?.issueStatus === "returned" ? "returned" : <button className='search-btn return-btn' onClick={() => handleReturnBook(r?.isbn)}>Return</button>}</td>
                            </tr>
                        )
                    })}

                </tbody>
            </table>
        </div>
    )
}

export default IssuedTable