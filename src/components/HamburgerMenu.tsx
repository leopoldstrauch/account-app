'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function HamburgerMenu() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={toggleMenu}
        className="p-4 bg-gray-800 text-white focus:outline-none fixed top-0 left-0 z-50"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d={isOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16m-7 6h7'}
          ></path>
        </svg>
      </button>
      {isOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 z-40">
          <div className="fixed inset-y-0 left-0 w-64 bg-white shadow-lg z-50">
            <nav className="p-6 mt-10">
              <ul>
                <li className="mb-4 group">
                  <span className="text-gray-800 text-lg font-bold cursor-pointer">
                    Konten
                  </span>
                  <ul className="pl-6 mt-2 hidden group-hover:block">
                    <li className="mb-4">
                      <Link href="/accounts" legacyBehavior>
                        <a onClick={closeMenu} className="text-gray-800 text-lg">Konten Übersicht</a>
                      </Link>
                    </li>
                    <li className="mb-4">
                      <Link href="/accounts/create" legacyBehavior>
                        <a onClick={closeMenu} className="text-gray-800 text-lg">Konto erstellen</a>
                      </Link>
                    </li>
                  </ul>
                </li>
                <li className="mb-4 group">
                  <span className="text-gray-800 text-lg font-bold cursor-pointer">
                    Buchungssätze
                  </span>
                  <ul className="pl-6 mt-2 hidden group-hover:block">
                    <li className="mb-4">
                      <Link href="/entries/list" legacyBehavior>
                        <a onClick={closeMenu} className="text-gray-800 text-lg">Buchungssätze Übersicht</a>
                      </Link>
                    </li>
                    <li className="mb-4">
                      <Link href="/entries/create" legacyBehavior>
                        <a onClick={closeMenu} className="text-gray-800 text-lg">Buchungssatz erstellen</a>
                      </Link>
                    </li>
                  </ul>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      )}
    </div>
  );
}
