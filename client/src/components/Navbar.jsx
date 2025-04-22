import React from 'react'
import { IoLogOutOutline } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };
  return (
    <div className='bg-white shadow-2xl flex py-2 px-10 items-center justify-between'>
      <p className='text-2xl font-extrabold text-blue-600'>ResqueSence | <span className='font-thin'>Admin Panel</span></p>
      <p className='text-2xl font-thin text-blue-600 flex items-center gap-2.5'> Hello {user?.username} <IoLogOutOutline className='text-4xl cursor-pointer' onClick={()=>handleLogout()}/></p>
    </div>
  )
}

export default Navbar