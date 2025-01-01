import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

import NavBar from './NavBar';
import Logo from './Logo';
import SideBar from './SideBar';

import cookie from 'react-cookies';

import { GoTriangleDown } from 'react-icons/go';
import Menu from './Menu';
import Button from '../common/button';

export default function Header() {
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

    document.addEventListener('click', handleOutsideClick);

    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, []);

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev);
  };

  const useruuid = cookie.load('uuid');
  const userName = cookie.load('userName');
  const userImage = cookie.load('userImage');
  let testPopUp;
  function openPopUp() {
    testPopUp = window.open(
      'https://nid.naver.com/nidlogin.logout',
      '_blank',
      'toolbar=yes,scrollbars=yes,resizable=yes,width=1,height=1',
    );
  }
  function closePopUp() {
    testPopUp.close();
  }

  // const clickLogout = async () => {
  const clickLogout = () => {
    cookie.remove('googleImage', { path: '/' });
    cookie.remove('googleId', { path: '/' });
    cookie.remove('naverImage', { path: '/' });
    cookie.remove('naverId', { path: '/' });
    cookie.remove('uuid', { path: '/' });
    cookie.remove('userName', { path: '/' });
    cookie.remove('userImage', { path: '/' });

    // const logoutUrl = "https://nid.naver.com/nidlogin.logout";

    // await fetch(logoutUrl, {
    //   method: "GET",
    //   mode: "no-cors",
    // });

    openPopUp();
    setTimeout(function () {
      closePopUp();
    }, -1);

    navigate('/');
  };

  //
  //

  const handleMenuOpen = () => {
    setIsMenuOpen((prev) => !prev);
  };

  return (
    <div className='fixed left-0 top-0 z-50 w-full'>
      {isMenuOpen && (
        <SideBar>
          <NavBar isMenuOpen={true} />
        </SideBar>
      )}
      <header
        className='relative z-50 flex w-full items-center justify-between border-b border-b-[#d3d3d3] bg-white px-2 py-2'
        ref={dropdownRef}
      >
        <div className='flex items-center justify-center gap-1'>
          <Menu onMenuOpen={handleMenuOpen} />
          <Logo />
        </div>
        <div className='flex items-center justify-between px-2 sm:flex-col'>
          {/* <div className="flex w-full items-center justify-between px-8"> */}
          <div className='text-base'>
            <span className='text-lg font-semibold sm:block'>
              {!useruuid && (
                <Link className='text-sm' to='login'>
                  {/* <FaUserCircle /> */}
                </Link>
              )}
            </span>
            {useruuid && (
              <div className='flex flex-row items-center gap-2 text-3xl sm:flex sm:text-sm'>
                {/* <Link to={`/userinfo`}> */}
                <Link to={`/userinfo/${useruuid}`}>
                  <img
                    className='w-8 rounded-full sm:w-6'
                    src={userImage || `${userImage}`}
                    alt=''
                  />
                </Link>
                <div onClick={toggleDropdown} className='cursor-pointer'>
                  <GoTriangleDown />
                </div>
              </div>
            )}
          </div>

          {/* 로그인 */}
          <Button>
            {useruuid && (
              <div className='flex flex-row items-center gap-2 text-3xl'>
                {/* <Link to={`/userinfo`}> */}
                <Link to={`/userinfo/${useruuid}`}>
                  <img
                    className='w-8 rounded-full'
                    src={userImage || `${userImage}`}
                    alt=''
                  />
                </Link>
                <div onClick={handleDropdownToggle} className='cursor-pointer'>
                  <GoTriangleDown />
                </div>
              </div>
            )}

            {!useruuid && (
              <Link className='w-12 text-sm' to='login'>
                로그인
              </Link>
            )}
          </Button>

          <div className='relative flex items-center gap-4'>
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

            {isDropdownOpen && (
              <div className='w-30 item translate3d absolute right-0 top-14 flex flex-col rounded border bg-white p-2 px-4 shadow-md'>
                {userName && (
                  <>
                    <span className='cursor-pointer' onClick={clickLogout}>
                      로그아웃
                    </span>
                    <Link className='' to={`/myinfo/${useruuid}`}>
                      내 정보
                    </Link>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </header>
    </div>
  );
}
