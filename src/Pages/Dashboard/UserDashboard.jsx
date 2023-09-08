import React, { useEffect } from 'react'

const UserDashboard = () => {
  useEffect(() => {
    document.title = 'Dashboard - T-Task';
  }, []);
  return (
    <div>
      <h1 className='text-lime-600 text-2xl text-center font-bold'>WelCome To Our T-Task System</h1>
    </div>
  )
}

export default UserDashboard
