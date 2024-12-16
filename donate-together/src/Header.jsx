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
  FaUserAlt,
  FaOutdent,
  FaUserSlash,
} from "react-icons/fa";
import { useEffect, useState } from "react";
import Button from "./components/Button";
import { useData } from "./context/StsProvider";
import { useLoginData } from "./context/UserProvider";

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
      label: "마이페이지",
      icon: <FaInfoCircle />,
      to: "/mypage",
    },
  ];
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const { boardSts, setBoardSts } = useData();
  const {
    loginSts,
    loginName,
    setLoginName,
    setLoginId,
    setLoginEmail,
    kakaologinSts,
    userKakaoData,
    setUserKakaoData,
    isLoadingKakao,
    setIsLoadingKakao,
    kakaoLoginSts,
    handleLogout,
  } = useLoginData();

  // 로그인시 회원 이름 가져오기 위해 렌더링
  useEffect(() => {
    if (sessionStorage.getItem("loginInfo")) {
      let data = JSON.parse(sessionStorage.getItem("loginInfo"));
      setLoginName(data.username);
      setLoginEmail(data.email);
      setLoginId(data.userid);
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
              className="hover:text-gray-600 font-bold text-lg"
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
        <ul className="flex gap-5 w-48 justify-end">
          {!loginSts && !userKakaoData && (
            <li>
              <Link to="/login">
                <p className="underline font-bold text-lg inline cursor-pointer">
                  로그인
                </p>
              </Link>
            </li>
          )}
          {loginSts && (
            <li className="hidden sm:flex">
              <Link to="/mypage">
                <p className="underline font-bold text-lg inline cursor-pointer">
                  {loginName}님
                </p>
              </Link>
            </li>
          )}
          {!isLoadingKakao && userKakaoData && (
            <li className="hidden sm:flex">
              <Link to="/mypage" className="flex gap-1">
                {userKakaoData.kakao_account.profile_image_needs_agreement && (
                  <img
                    src={userKakaoData.properties.thumbnail_image}
                    alt="카카오 프사"
                    className="w-6 h-6 object-cover"
                  />
                )}
                <p className="underline font-bold text-lg inline cursor-pointer">
                  {userKakaoData.properties.nickname}님
                </p>
              </Link>
            </li>
          )}

          <li className="cursor-pointer pt-1">
            <Link to="/search">
              <FaSearch className="size-5 hover:text-gray-800 " />
            </Link>
          </li>
          <li className="cursor-pointer pt-1" onClick={toggleMenu}>
            <FaBars className="size-5 hover:text-gray-800 " />
          </li>
        </ul>
      </div>
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={toggleMenu}
        ></div>
      )}
      {/* Mobile Menu */}
      <aside
        className={`fixed top-0 right-0 w-80 h-full bg-gray-50 z-50 ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
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
        <div className="p-10 pt-5">
          {!loginSts && !userKakaoData && (
            <div className="cursor-pointer">
              <Link to="/login" onClick={toggleMenu}>
                <p className="underline font-bold text-lg">로그인하세요</p>
              </Link>
            </div>
          )}
          {loginSts && (
            <div className="cursor-pointer">
              <Link to="/mypage" onClick={toggleMenu}>
                <p className="underline font-bold text-lg">{loginName}님</p>
              </Link>
            </div>
          )}
          {!isLoadingKakao && userKakaoData && (
            <div className="cursor-pointer">
              <Link to="/mypage">
                <img src="" alt="" />
                <p className="underline font-bold text-lg">
                  {userKakaoData.properties.nickname}님
                </p>
              </Link>
            </div>
          )}
          {!loginSts && !userKakaoData && (
            <>
              <ul className="flex h-10 gap-3 mt-5 mb-16">
                <li className="w-full h-full bg-white hover:bg-slate-200 transition-all duration-300 rounded-lg cursor-pointer">
                  <Link to="/login" onClick={toggleMenu}>
                    <p className="pt-2 font-bold flex items-center justify-center gap-2">
                      <FaUserAlt className="size-4" />
                      MY
                    </p>
                  </Link>
                </li>
              </ul>
            </>
          )}
          {(loginSts || userKakaoData) && (
            <>
              <ul className="flex h-10 gap-3 mt-5 mb-16">
                <li className="w-full h-full bg-white hover:bg-slate-200 transition-all duration-300 rounded-lg cursor-pointer">
                  <Link to="/mypage" onClick={toggleMenu}>
                    <p className="pt-2 font-bold flex items-center justify-center gap-2">
                      <FaUserAlt className="size-4" />
                      MY
                    </p>
                  </Link>
                </li>
                <li
                  className="w-full h-full bg-white hover:bg-slate-200 transition-all duration-300 rounded-lg cursor-pointer"
                  onClick={() => {
                    handleLogout();
                    toggleMenu();
                  }}
                >
                  <p className="pt-2 font-bold flex items-center justify-center gap-2">
                    <FaUserSlash className="size-4" />
                    logout
                  </p>
                </li>
              </ul>
            </>
          )}

          <nav className="flex flex-col space-y-4">
            {navItems.map((item) => (
              <NavLink
                key={item.id}
                to={item.to}
                onClick={toggleMenu}
                className="hover:text-gray-600 font-bold text-lg"
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
        </div>
      </aside>
    </header>
  );
}

export default Header;
