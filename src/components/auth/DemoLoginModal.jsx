import React from 'react';
import { IoMdClose } from 'react-icons/io';

const DemoCreds = {
    OWNER: "owner.demo@example.com",
    ADMIN: "admin.demo@example.com",
    READER: "reader.demo@example.com"
}

const DemoLoginModal = ({ closeModal, handleLogin }) => {

    return (
        <>
            <div className="modal">
                <div className="modal-content">
                    <div className="modal-close-wrapper">
                        <h3 className="modal-content-title">
                            Demo Login Creds
                        </h3>
                        <IoMdClose className="modal-close" onClick={closeModal} />
                    </div>
                    <div className="modal-body">
                        <button className='form-btn demo-login demo-login-btn'
                            onClick={() => handleLogin(DemoCreds.OWNER)}
                        >{"Login As Owner"}</button>
                        <button className='form-btn demo-login demo-login-btn'
                            onClick={() => handleLogin(DemoCreds.ADMIN)}
                        >{"Login As Admin"}</button>
                        <button className='form-btn demo-login demo-login-btn'
                            onClick={() => handleLogin(DemoCreds.READER)}
                        >{"Login As Reader"}</button>
                    </div>

                </div>
            </div>
        </>
    )
}

export default DemoLoginModal