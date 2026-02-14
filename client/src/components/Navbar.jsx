import { Link } from 'react-router-dom';
import { MdVideoCall } from 'react-icons/md';

const Navbar = () => {
  return (
    <nav id="header" className="w-full z-30 top-0 py-1 bg-white border-b border-gray-200">
      <div className="w-full container mx-auto flex flex-wrap items-center justify-between mt-0 px-6 py-3">
        <label htmlFor="menu-toggle" className="cursor-pointer md:hidden block">
          <svg className="fill-current text-gray-900" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20">
            <title>menu</title>
            <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
          </svg>
        </label>
        <input className="hidden" type="checkbox" id="menu-toggle" />

        <div className="hidden md:flex md:items-center md:w-auto w-full order-3 md:order-1" id="menu">
          <ul className="md:flex items-center gap-1 text-base text-gray-700 pt-4 md:pt-0">
            <li>
              <Link to="/" className="inline-block no-underline hover:text-black hover:underline py-2 px-4">
                Home
              </Link>
            </li>
            <li>
              <Link to="/join" className="inline-block no-underline hover:text-black hover:underline py-2 px-4">
                Join Call
              </Link>
            </li>
          </ul>
        </div>

        <div className="order-1 md:order-2">
          <Link to="/" className="flex items-center tracking-wide no-underline hover:no-underline font-bold text-gray-800 text-xl">
            <MdVideoCall className="fill-current text-blue-500 mr-2 w-7 h-7" />
            <span className="text-blue-600">Video Chat</span>
          </Link>
        </div>

        <div className="order-2 md:order-3 flex items-center" id="nav-content">
          <Link
            to="/join"
            className="inline-flex items-center px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium rounded-lg"
          >
            Start Call
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
