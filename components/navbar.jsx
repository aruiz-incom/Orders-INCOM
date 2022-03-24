import { useState } from "react";
import Link from "next/link";

export default function Navbar() {
  const [search, setSearch] = useState(false);
  return (
    <div className="fixed max-w-full w-full max-h-16">
      <nav className="flex justify-between items-center px-8 py-2 bg-white shadow-md">
        <div className="">
          <a href="https://www.incom.mx">
            <img
              src="https://via.placeholder.com/190x35?text=Logo"
              alt="Insumos Comerciales de Occidente"
            />
          </a>
        </div>
        {/* {search ? (
          <div className="flex justify-center items-center space-x-2 rounded border border-slate-300 px-4 py-1">
            <span className="text-slate-500 hover:text-slate-800">
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                ></path>
              </svg>
            </span>
            <input
              type="text"
              name="search"
              id="search"
              placeholder="Buscar..."
              className="focus:outline-none text-sm"
            />
            <button onClick={() => setSearch(!search)}>
              <span className="text-black">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  ></path>
                </svg>
              </span>
            </button>
          </div>
        ) : (
          <button onClick={() => setSearch(!search)}>
            <span className="text-slate-500 hover:text-slate-800">
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                ></path>
              </svg>
            </span>
          </button>
        )} */}
        <div className="flex justify-center items-center space-x-2 text-base">
          <Link href="/">
            <a className="hover:underline underline-offset-4 decoration-2 decoration-blue-900 hover:bg-slate-50 rounded px-2 py-2">
              Inicio
            </a>
          </Link>
          {/* <Link href="/products">
            <a className="hover:underline underline-offset-4 decoration-2 decoration-blue-900 hover:bg-slate-50 rounded px-2 py-2">
              Productos
            </a>
          </Link> */}
        </div>
      </nav>
    </div>
  );
}
