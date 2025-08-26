import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Menu, X } from 'react-feather'

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <nav className="fixed top-0 left-0 w-full flex justify-between items-center p-4 bg-gray-100/90 shadow z-50">
      {/* Logo + Brand */}
      <div>
        <Link to="/" className="flex items-center gap-2 no-underline">
          <img src="/img/icon.png" alt="GoGlobal Logo" className="h-8 w-auto" />
          <span className="font-bold text-2xl text-gray-800">GoGlobal</span>
        </Link>
      </div>

      {/* Desktop Menu */}
      <div className="hidden md:flex gap-6">
        <Link to="/" className="no-underline text-gray-800">หน้าแรก</Link>
        <Link to="/countries" className="no-underline text-gray-800">ประเทศต่างๆ</Link>
        <Link to="/about" className="no-underline text-gray-800">เกี่ยวกับ</Link>
        <Link to="/contact" className="no-underline text-gray-800">ติดต่อ</Link>
      </div>

      {/* Mobile Burger Menu */}
      <div className="md:hidden">
        <button onClick={() => setMenuOpen(!menuOpen)} className="focus:outline-none">
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {menuOpen && (
        <div className="absolute top-full right-4 mt-2 bg-gray-100 shadow rounded-md flex flex-col items-start p-4 gap-2 md:hidden">
          <Link to="/" className="no-underline text-gray-800 w-full">หน้าแรก</Link>
          <Link to="/countries" className="no-underline text-gray-800 w-full">ประเทศต่างๆ</Link>
          <Link to="/about" className="no-underline text-gray-800 w-full">เกี่ยวกับ</Link>
          <Link to="/contact" className="no-underline text-gray-800 w-full">ติดต่อ</Link>
        </div>
      )}
    </nav>
  )
}

export default Navbar
