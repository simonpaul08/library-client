import React, { useEffect, useState } from "react";
import IssuedTable from "../tables/IssuedTable";
import { ToastContainer, toast } from "react-toastify";
import { useAuthContext } from "../../context/AuthContext";

const IssuedBooks = () => {
    const [registry, setRegistry] = useState([]);
    const { privateInstance } = useAuthContext()

    const retrieveRegistry = async () => {
        try {
            const res = await privateInstance.get("/user/registry");
            if (res.data) {
                setRegistry(res?.data?.registry);
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

    useEffect(() => {
        retrieveRegistry()
    }, [])

    return (
        <>
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
            <div className="dashboard-content">
                <IssuedTable registry={registry} retrieveRegistry={retrieveRegistry}/>
            </div>
        </>
    );
};

export default IssuedBooks;
