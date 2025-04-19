import React, { useState } from 'react';
import DemoLoginModal from './DemoLoginModal';
import { toast } from 'react-toastify';
import { useAuthContext } from '../../context/AuthContext';
import Loader from '../loader/Loader';

const DemoLogin = () => {
    const [isModal, setIsModal] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const { handleSetUser, publicInstance } = useAuthContext();

    // open modal
    const handleClick = () => {
        setIsModal(true);
    }

    // close modal
    const handleCloseModal = () => {
        setIsModal(false);
    }

    // handle login 
    const handleLogin = async (email) => {
        let body = {
            email
        }
        setIsModal(false)
        setIsLoading(true)

        try {
            const res = await publicInstance.post("/auth/demo-login", body);
            console.log(res.data);
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
    }
    return (
        <>
            {isModal && <DemoLoginModal closeModal={handleCloseModal} handleLogin={handleLogin} />}
            <button type="button" className="form-btn demo-login" onClick={handleClick}>
                {isLoading ? <Loader /> : "Demo Login"}
            </button>
        </>
    )
}

export default DemoLogin