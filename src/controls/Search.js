import React from 'react';
import { HiOutlineSearch } from 'react-icons/hi';

export default function Search({ search, setSearch, onSearch, placeholder = 'Search...', className = '' }) {
  return (
    <form
      onSubmit={(e) => { e.preventDefault(); if (onSearch) onSearch(); }}
      className={className}
    >
      <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only">Search</label>
      <div className="relative">

        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
          <HiOutlineSearch className="w-5 h-5 text-sky-500" />
        </div>

        <input
          id="default-search"
          type="text"
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder={placeholder}
          className="outline-none block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-200 rounded-full bg-gray-50 focus:ring-gray-300 focus:border-gray-300 shadow-md hover:shadow-lg"
        />

        <button
          type="submit"
          className="text-white absolute end-2.5 bottom-2.5 bg-gradient-to-br from-sky-300 to-sky-500 rounded-full text-sm px-4 py-2"
        >
          Search
        </button>

      </div>
    </form>
  );
}