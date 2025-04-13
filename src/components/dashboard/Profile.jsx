import React from 'react'

const Profile = () => {
  return (
    <div className='dashboard-content'>
      <div className="profile-content">
        <h3>Profile </h3>
        <form className='profile-form'>
          <div className="profile-form-grid">
            <div className="profile-form-item">
              <input type="text" className='profile-form-input' id='name' name='name' placeholder='Enter Name' />
            </div>
            <div className="profile-form-item">
              <input type="email" className='profile-form-input' id='email' name='email' placeholder='Enter Email' />
            </div>
          </div>
          <div className="profile-form-grid">
            <div className="profile-form-item">
              <input type="text" className='profile-form-input' id='contactNumber' name='contactNumber' placeholder='Enter Contact Number' />
            </div>
            <div className="profile-form-item">
              <input type="text" className='profile-form-input' id='role' name='role' placeholder='Enter Role' />
            </div>
          </div>
          <div className="profile-form-item">
            <button className='profile-btn'>Update Profile</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Profile