import { useCallback, useState } from "react";
import Particles from "react-particles";
import { Outlet } from "react-router-dom";
import Banner from "../components/Banner";
//import { loadFull } from "tsparticles";
import { loadSlim } from "tsparticles-slim";
import { Link } from "react-router-dom";
import cookie from "react-cookies";
import Button from "./Button";
import Modal from "../components/Modal";

const MainBackGround = ({ children }) => {
  const [mainText, setMainText] = useState();

  const isLogin = cookie.load("uuid");
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    setIsOpen((prev) => !prev);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const particlesInit = useCallback(async (engine) => {
    // console.log(engine);

    await loadSlim(engine);
  }, []);

  const particlesLoaded = useCallback(async (container) => {
    // await console.log(container);
  }, []);

  return (
    <div className="relative w-full">
      <div className="absolute mt-24 flex w-full flex-col items-center justify-center gap-8 rounded-3xl">
        {/* <span className="m-auto flex text-7xl text-black">Devko</span> */}
        <div className="flex flex-col items-center gap-4 text-sm	tracking-widest">
          <span>혁신적인 아이디어와 열정을 공유하는 개발자들의 공간,</span>
          <span>함께 성장하며 협업하는 개발자 커뮤니티</span>
        </div>
        {isOpen && !isLogin && (
          <Modal>
            <div className="flex flex-col items-center justify-center">
              <p className="py-10">로그인이 필요합니다</p>
              <Link className="flex flex-col gap-2 px-12" to="/login">
                <button className="rounded-xl bg-black p-4 text-white">
                  로그인하러가기
                </button>
              </Link>
              <button className="rounded-xl bg-white p-4 text-black " onClick={handleClose}>
                취소
              </button>
            </div>
          </Modal>
        )}
        {isLogin ? (
          <>
            <Link to="/write">
              <Button
                onClick={handleOpen}
                color="bg-black"
                px="12"
                className="text-3xl"
              >
                Add Post
              </Button>
            </Link>
            <div className="mt-12 w-[80rem] text-left text-sm">
              <strong>Particles</strong> by Vincent Garreau
            </div>
          </>
        ) : (
          <>
            <button
              className="rounded-full bg-black px-12 py-2 text-sm text-white shadow-lg"
              onClick={handleOpen}
            >
              <div className="flex items-center">
                <div>Add Post</div>
              </div>
            </button>
            <div className="mt-12 w-[80rem] text-left text-sm">
              <strong>Particles</strong> by Vincent Garreau
            </div>
          </>
        )}
      </div>
      <Particles
        className="my-12 h-72  border-b border-b-gray-300"
        id="tsparticles"
        init={particlesInit}
        loaded={particlesLoaded}
        options={{
          background: {
            color: {
              value: "#fff",
            },
          },
          fpsLimit: 120,
          interactivity: {
            events: {
              onClick: {
                enable: true,
                mode: "push",
              },
              onHover: {
                enable: true,
                mode: "attract",
              },
              resize: true,
            },
            modes: {
              push: {
                quantity: 4,
              },
              repulse: {
                distance: 200,
                duration: 0.4,
              },
            },
          },
          particles: {
            color: {
              value: "#000",
            },
            links: {
              color: "#000",
              distance: 150,
              enable: true,
              opacity: 0.5,
              width: 1,
            },
            move: {
              direction: "none",
              enable: true,
              outModes: {
                default: "bounce",
              },
              random: false,
              speed: 1,
              straight: false,
            },
            number: {
              density: {
                enable: true,
                area: 200,
              },
              value: 10,
            },
            opacity: {
              value: 0.5,
            },
            shape: {
              type: "circle",
            },
            size: {
              value: { min: 1, max: 2 },
            },
          },
          detectRetina: true,
          fullScreen: false,
        }}
      ></Particles>
    </div>
  );
};

export default MainBackGround;
