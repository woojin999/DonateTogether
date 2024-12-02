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
    { id: "home", label: "홈", icon: <FaHome />, to: "/" },
    { id: "donate", label: "같이기부", icon: <FaInfoCircle />, to: "/donate" },
    {
      id: "campaign",
      label: "캠페인",
      icon: <FaInfoCircle />,
      to: "/campaign",
    },
  ];
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  return (
    <header className="sticky top-0 bg-white px-4 z-30">
      <div className="container mx-auto flex justify-between items-center h-14">
        <div>
          <Link to="/" className="text-xl font-bold">
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
