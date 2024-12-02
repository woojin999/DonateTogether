import { Link, Links, NavLink } from "react-router-dom";
import {
  FaEnvelope,
  FaHome,
  FaInfoCircle,
  FaBars,
  FaTimes,
  FaSearch,
  FaPersonBooth,
  FaUserCircle,
} from "react-icons/fa";
import { useState } from "react";
import Button from "./components/Button";

function Header() {
  const navItems = [
    { id: "home", label: "같이기부", icon: <FaHome />, to: "/" },
    {
      id: "campaign",
      label: "캠페인",
      icon: <FaInfoCircle />,
      to: "/campaign",
    },
    { id: "mydonate", label: "나의기부", icon: <FaInfoCircle />, to: "/mydonate" },
  ];
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  return (
    <header className="sticky top-0 bg-slate-100 px-4 z-30 border-b-2">
      <div className="container mx-auto flex justify-between items-center h-20">
        <div>
          <Link to="/" className="text-2xl font-bold">
            Donate Together
          </Link>
        </div>
        <nav className="hidden sm:flex space-x-8">
          {navItems.map((item) => (
            <NavLink
              key={item.id}
              to={item.to}
              className="hover:text-gray-800 font-bold"
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
        <div className="flex gap-3">
          <button className="">
            <FaSearch className="size-5 hover:text-gray-800 " />
          </button>
          {/* <Button className="hidden md:block">Login</Button> */}
          <button>
            <FaUserCircle className="size-5 hover:text-gray-800 " />
          </button>
          <button className="" onClick={toggleMenu}>
            <FaBars className="size-5 hover:text-gray-800 " />
          </button>
        </div>
      </div>
      {/* Mobile Menu */}
      <aside
        className={`fixed top-0 left-0 w-64 h-full bg-gray-100 z-50 ${
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
        } transform transition-transform duration-300 ease-in-out`}
      >
        <div className="flex justify-end p-4">
          <button
            className="text-black focus:outline-none"
            aria-label="Close menu"
            onClick={toggleMenu}
          >
            <FaTimes className="h-6 w-6" />
          </button>
        </div>
        <nav className="flex flex-col space-y-4 p-4">
          {navItems.map((item) => (
            <NavLink key={item.id} to={item.to} className="hover:text-gray-300 font-bold">
              {item.label}
            </NavLink>
          ))}
        </nav>
      </aside>
    </header>
  );
}

export default Header;
