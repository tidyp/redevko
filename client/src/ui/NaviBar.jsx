import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import { FaUserCircle } from "react-icons/fa";

import cookie from "react-cookies";

import { GoTriangleDown } from "react-icons/go";
import { FaSearch } from "react-icons/fa";
import { VscBell, VscBellDot } from "react-icons/vsc";

import { useEffect, useRef, useState } from "react";

const dummy = [
  {
    isRead: true,
    profileImage:
      "https://th.bing.com/th/id/OIG3.dtxuqRx_wh5efePBGiVs?w=1024&h=1024&rs=1&pid=ImgDetMain",
    title: "공지사항",
    content: "가입을 환영합니다.",
  },
  {
    isRead: false,
    profileImage:
      "https://th.bing.com/th/id/OIG3.dtxuqRx_wh5efePBGiVs?w=1024&h=1024&rs=1&pid=ImgDetMain",
    title: "안내사항",
    content: "새로운 소식이 있어요.",
  },
];
const unreadCount = dummy.filter((item) => !item.isRead).length;

const NaviBar = () => {
  const dropdownRef = useRef();
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const handleDropdownToggle = () => {
    setDropdownOpen((prev) => !prev);
  };

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("click", handleOutsideClick);

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  const [searchQuery, setSearchQuery] = useState("");

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigate = useNavigate();

  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev);
  };

  const useruuid = cookie.load("uuid");
  const userName = cookie.load("userName");
  const userImage = cookie.load("userImage");
  let testPopUp;
  function openPopUp() {
    testPopUp = window.open(
      "https://nid.naver.com/nidlogin.logout",
      "_blank",
      "toolbar=yes,scrollbars=yes,resizable=yes,width=1,height=1",
    );
  }
  function closePopUp() {
    testPopUp.close();
  }

  // const clickLogout = async () => {
  const clickLogout = () => {
    cookie.remove("googleImage", { path: "/" });
    cookie.remove("googleId", { path: "/" });
    cookie.remove("naverImage", { path: "/" });
    cookie.remove("naverId", { path: "/" });
    cookie.remove("uuid", { path: "/" });
    cookie.remove("userName", { path: "/" });
    cookie.remove("userImage", { path: "/" });

    // const logoutUrl = "https://nid.naver.com/nidlogin.logout";

    // await fetch(logoutUrl, {
    //   method: "GET",
    //   mode: "no-cors",
    // });

    openPopUp();
    setTimeout(function () {
      closePopUp();
    }, -1);

    navigate("/");
  };

  //
  //
  const activeLink = "text-black font-bold";
  // 검색
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (!searchQuery) {
      alert("검색어를 입력하세요");
      setSearchQuery("");
      return;
    }
    setSearchQuery("");
    navigate(`/search/${searchQuery}`);
  };

  const handleMenuOpen = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const mv = !isMenuOpen ? "hidden" : "block";
  return (
    <>
      {/* <nav className="z-50 flex items-center justify-center border-b border-b-[#d3d3d3] bg-white py-4"> */}

      {/* </nav> */}

      <nav
        className="z-50 flex items-center justify-center border-b border-b-[#d3d3d3] bg-white py-4"
        ref={dropdownRef}
      >
        <div className="flex w-[80rem] items-center justify-between px-8 sm:flex-col">
          {/* <div className="flex w-full items-center justify-between px-8"> */}
          <div className="text-base sm:flex sm:w-full sm:items-center sm:justify-between">
            <span
              onClick={handleMenuOpen}
              className="hidden text-lg font-semibold sm:block"
            >
              <GiHamburgerMenu />
            </span>
            <Link to="/">
              <span className="bg-black px-4 text-lg font-bold text-white">
                DEVKO
              </span>
              {/* <img className="w-6" src="/images/logo2.png" alt="logo" /> */}
            </Link>
            <span className="hidden text-lg font-semibold sm:block">
              {!useruuid && (
                <Link className="text-sm" to="login">
                  <FaUserCircle />
                </Link>
              )}
            </span>
            {useruuid && (
              <div className="flex hidden flex-row items-center gap-2 text-3xl sm:flex sm:text-sm">
                {/* <Link to={`/userinfo`}> */}
                <Link to={`/userinfo/${useruuid}`}>
                  <img
                    className="w-8 rounded-full sm:w-6"
                    src={userImage || `${userImage}`}
                    alt=""
                  />
                </Link>
                <div onClick={toggleDropdown} className="cursor-pointer">
                  <GoTriangleDown />
                </div>
              </div>
            )}
          </div>
          <div
            className={`flex gap-12 text-base uppercase sm:w-full sm:flex-col sm:items-start sm:gap-2 sm:${mv} sm:flex`}
          >
            {/* <NavLink
              to="/"
              className={({ isActive }) => (isActive ? activeLink : "")}
            >
              explore
            </NavLink> */}
            <NavLink
              to="/discuss/1"
              className={({ isActive }) => (isActive ? activeLink : "")}
            >
              discuss
            </NavLink>
            <NavLink
              to="/questions/1"
              className={({ isActive }) => (isActive ? activeLink : "")}
            >
              Q&amp;A
            </NavLink>
            <NavLink
              to="/article/1"
              className={({ isActive }) => (isActive ? activeLink : "")}
            >
              article
            </NavLink>
            <NavLink
              to="event"
              className={({ isActive }) => (isActive ? activeLink : "")}
            >
              event
            </NavLink>
            <NavLink
              to="/teams/1"
              className={({ isActive }) => (isActive ? activeLink : "")}
            >
              group
            </NavLink>
          </div>
          <div className="relative flex  items-center gap-4 sm:hidden">
            <form onSubmit={handleSearchSubmit}>
              <input
                type="text"
                placeholder="검색어를 입력하세요."
                value={searchQuery}
                onChange={handleSearchChange}
              />
              <button type="submit">
                <FaSearch />
              </button>
            </form>

            {/* 알림 */}
            {/* <div className="cursor-pointer">
              {unreadCount > 0 && (
                <VscBellDot className="text-blue-70 animate-bounce text-xl" />
              )}
              {unreadCount < 0 && <VscBell className="text-xl" />}
            </div>
            <div className=" w-30 item translate3d absolute right-4 top-14 flex flex-col rounded border bg-white p-2 shadow-md">
              <p className="mb-4 font-bold">알림</p>
              {dummy.map((item) => (
                <div className="flex gap-2 border-b-2">
                  <img
                    className="h-12 w-12 rounded-full"
                    src={item.profileImage}
                    alt=""
                  />
                  <div className="flex w-fit flex-col border-b-2">
                    <span>{item.title}</span>
                    <span>{item.content}</span>
                  </div>
                </div>
              ))}
            </div> */}

            {useruuid && (
              <div className="flex flex-row items-center gap-2 text-3xl">
                {/* <Link to={`/userinfo`}> */}
                <Link to={`/userinfo/${useruuid}`}>
                  <img
                    className="w-8 rounded-full"
                    src={userImage || `${userImage}`}
                    alt=""
                  />
                </Link>
                <div onClick={handleDropdownToggle} className="cursor-pointer">
                  <GoTriangleDown />
                </div>
              </div>
            )}

            {!useruuid && (
              <Link className="text-sm" to="login">
                로그인/회원가입
              </Link>
            )}
            {isDropdownOpen && (
              <div className=" w-30 item translate3d absolute right-0 top-14 flex flex-col rounded border bg-white p-2 px-4 shadow-md">
                {userName && (
                  <>
                    <span className=" cursor-pointer" onClick={clickLogout}>
                      로그아웃
                    </span>
                    <Link className="" to={`/myinfo/${useruuid}`}>
                      내 정보
                    </Link>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </nav>
    </>
  );
};

export default NaviBar;
