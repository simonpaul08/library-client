import React, { useState } from "react";
import { FaCheck, FaTrash } from "react-icons/fa";
import { useAuthContext } from "../../context/AuthContext";
import { toast } from "react-toastify";
import Loader from "../loader/Loader";

const RequestTable = ({ requests, retrieveRequests, isLoading}) => {
    const { currentUser, privateInstance } = useAuthContext();

    // handle reject request
    const handleRejectRequest = async (id) => {
        let body = {
            reqId: id,
        };

        try {
            const res = await privateInstance.post("admin/reject/request", body);
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
                retrieveRequests()
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
    };

    // handle approve request 
    const handleApproveRequest = async (id, type) => {
        let body = {
            reqId: id,
        };

        try {
            const res = await privateInstance.post(`admin/${type}/approve`, body);
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
                retrieveRequests()
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
        <div className="request-table">
            <table>
                <thead>
                    <tr>
                        <th>Req ID</th>
                        <th>Book Name</th>
                        {currentUser?.role === "admin" && <th>Reader ID</th>}
                        <th>Request Date</th>
                        <th>Request Type</th>
                        <th>Status</th>
                        <th>Approval Date</th>
                        {currentUser?.role === "admin" && <th>Actions</th>}
                    </tr>
                </thead>
                <tbody>
                    {isLoading && requests?.length === 0 && <Loader />}
                    {requests?.map((r) => {
                        const requestDate = new Date(r?.requestDate).toLocaleDateString();
                        const approvalDate = r?.approvalDate
                            ? new Date(r?.approvalDate).toLocaleDateString()
                            : "NA";

                        return (
                            <tr key={r?.reqId}>
                                <td>{r?.reqId}</td>
                                <td>{r?.BookInventory?.title}</td>
                                {currentUser?.role === "admin" && <td>{r?.readerId}</td>}
                                <td>{requestDate}</td>
                                <td>{r?.requestType}</td>
                                <td>{r?.status}</td>
                                <td>{approvalDate}</td>
                                {currentUser?.role === "admin" &&
                                    (
                                        <td>
                                            {r?.status !== "pending" ? "NA" :
                                                <>
                                                    <FaCheck
                                                        className="table-action-icon"
                                                        color="#176B87"
                                                        title="Approve Request"
                                                        onClick={() => handleApproveRequest(r?.reqId, r?.requestType)}
                                                    />{" "}
                                                    <FaTrash
                                                        className="table-action-icon"
                                                        color="#dc3545"
                                                        title="Reject Request"
                                                        onClick={() => handleRejectRequest(r?.reqId)}
                                                    />
                                                </>}

                                        </td>
                                    )
                                }
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
};

export default RequestTable;
