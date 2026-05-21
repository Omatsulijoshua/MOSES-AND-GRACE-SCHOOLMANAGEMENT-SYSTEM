"use client";

import Link from 'next/link';
import { useAuth } from '../context/AuthContext';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';

const Navbar = () => {
  const { user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="bg-primary-900 text-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="text-xl font-bold tracking-wider">
              Moses & Grace College
            </Link>
          </div>
          <div className="hidden md:flex items-center space-x-4">
            <Link href="/" className="hover:text-primary-100 transition">Home</Link>
            <Link href="/about" className="hover:text-primary-100 transition">About</Link>
            <Link href="/programs" className="hover:text-primary-100 transition">Programs</Link>
            <Link href="/admissions" className="hover:text-primary-100 transition">Admissions</Link>
            <Link href="/news" className="hover:text-primary-100 transition">News</Link>
            <Link href="/contact" className="hover:text-primary-100 transition">Contact</Link>
            {user ? (
              <div className="flex items-center space-x-4 ml-4 border-l pl-4 border-primary-700">
                {user.role === 'ADMIN' && (
                  <Link href="/portal/admin" className="font-semibold text-yellow-300 hover:text-white transition">Admin Panel</Link>
                )}
                <Link href="/portal" className="font-semibold text-primary-100 hover:text-white transition">Dashboard</Link>
                <button onClick={logout} className="bg-red-500 hover:bg-red-600 px-3 py-1 rounded transition">Logout</button>
              </div>
            ) : (
              <div className="ml-4 border-l pl-4 border-primary-700">
                <Link href="/portal/login" className="bg-primary-600 hover:bg-primary-500 px-4 py-2 rounded-md font-medium transition">Login Portal</Link>
              </div>
            )}
          </div>
          <div className="flex items-center md:hidden">
            <button onClick={toggleMenu} className="focus:outline-none">
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>
      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-primary-800">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 flex flex-col">
            <Link href="/" onClick={toggleMenu} className="block px-3 py-2 rounded-md hover:bg-primary-700">Home</Link>
            <Link href="/about" onClick={toggleMenu} className="block px-3 py-2 rounded-md hover:bg-primary-700">About</Link>
            <Link href="/programs" onClick={toggleMenu} className="block px-3 py-2 rounded-md hover:bg-primary-700">Programs</Link>
            <Link href="/admissions" onClick={toggleMenu} className="block px-3 py-2 rounded-md hover:bg-primary-700">Admissions</Link>
            <Link href="/news" onClick={toggleMenu} className="block px-3 py-2 rounded-md hover:bg-primary-700">News</Link>
            <Link href="/contact" onClick={toggleMenu} className="block px-3 py-2 rounded-md hover:bg-primary-700">Contact</Link>
            {user ? (
              <>
                {user.role === 'ADMIN' && (
                  <Link href="/portal/admin" onClick={toggleMenu} className="block px-3 py-2 text-yellow-300 font-bold">Admin Panel</Link>
                )}
                <Link href="/portal" onClick={toggleMenu} className="block px-3 py-2 text-primary-100 font-bold">Dashboard</Link>
                <button onClick={() => { logout(); toggleMenu(); }} className="text-left block px-3 py-2 text-red-400">Logout</button>
              </>
            ) : (
              <Link href="/portal/login" onClick={toggleMenu} className="block px-3 py-2 text-primary-100 font-bold">Login Portal</Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
