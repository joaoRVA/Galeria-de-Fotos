import { CircleUserRound, Images } from 'lucide-react'
import React from 'react'
import { Link } from 'react-router-dom'

const NavBar = () => {
  return (
    <div className='bg-gray-900 p-4 flex justify-between shadow-md text-white fixed top-0 left-0 right-0 z-50'>
      <Link to={"/"}>
      <div className='flex items-center space-x-1 cursor-pointer'>
        <h1 className='font-bold text-2xl'>Gallery</h1>
        <Images />
      </div>
      </Link>

      <button className='flex items-center space-x-2 cursor-pointer'>
        <h3>Usuário</h3>
        <CircleUserRound />
      </button>
    </div>

  )
}

export default NavBar