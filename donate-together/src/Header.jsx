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
import { useEffect, useState } from "react";
import Button from "./components/Button";
import { useData } from "./context/StsProvider";
import { useLoginData } from "./context/userProvider";

function Header() {
  const navItems = [
    { id: "home", label: "같이기부", icon: <FaHome />, to: "/" },
    {
      id: "campaign",
      label: "캠페인",
      icon: <FaInfoCircle />,
      to: "/campaign",
    },
    {
      id: "mydonate",
      label: "나의기부",
      icon: <FaInfoCircle />,
      to: "/mydonate",
    },
  ];
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const { boardSts, setBoardSts } = useData();
  const { loginSts, loginName, setLoginName,setLoginEmail } = useLoginData();

  // 로그인시 회원 이름 가져오기 위해 렌더링
  useEffect(() => {
    if (sessionStorage.getItem("loginInfo")) {
      let data = JSON.parse(sessionStorage.getItem("loginInfo"));
      setLoginName(data.username);
      setLoginEmail(data.email);
    }
  }, [loginSts]);

  const handleChangeSts = () => {
    setBoardSts("list");
  };
  return (
    <header className="sticky top-0 bg-white px-4 z-30 border-b-2 ">
      <div className="container mx-auto px-12 lg:px-24 flex justify-between items-center h-20">
        <div>
          <Link to="/" className="text-2xl font-bold" onClick={handleChangeSts}>
            Donate Together
          </Link>
        </div>
        <nav className="hidden md:flex space-x-8">
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
        <ul className="flex gap-3 w-48 justify-end">
          {!loginSts && (
            <li className="cursor-pointer">
              <Link to="/login">
                <p className="underline font-bold text-lg">로그인</p>
              </Link>
            </li>
          )}
          {loginSts && (
            <li className="cursor-pointer">
              <Link to="/mypage">
                <p className="underline font-bold text-lg">{loginName}님</p>
              </Link>
            </li>
          )}
          <li className="cursor-pointer pt-1">
            <Link>
              <FaSearch className="size-5 hover:text-gray-800 " />
            </Link>
          </li>
          {/* <li className="cursor-pointer">
            <Link to="/login">
              <FaUserCircle className="size-6 hover:text-gray-800 " />
            </Link>
          </li> */}
          <li className="cursor-pointer pt-1" onClick={toggleMenu}>
            <FaBars className="size-5 hover:text-gray-800 " />
          </li>
        </ul>
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
            <NavLink
              key={item.id}
              to={item.to}
              className="hover:text-gray-300 font-bold"
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      </aside>
    </header>
  );
}

export default Header;
