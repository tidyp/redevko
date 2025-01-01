import { BiUpArrowAlt } from "react-icons/bi";
import { readPosts } from "../../api/apiDevko";
import { Outlet, useLoaderData } from "react-router-dom";
import MainBackGround from "../../components/MainBackGround";
import Sidebar from "../../components/Sidebar";
import PostList from "./PostList";
import AlertsBox from "../../components/AlertsBox";
import { useEffect, useState } from "react";

const Index = () => {
  const posts = useLoaderData();
  const [showScrollButton, setShowScrollButton] = useState(false);
  console.log(posts)

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleScroll = () => {
    // Check if the user has scrolled down, then show the button
    setShowScrollButton(window.scrollY > 100);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="flex flex-col items-center justify-center gap-2">
      <Outlet />
      <MainBackGround />

      <div className="flex w-[80rem] items-start justify-center gap-4 sm:w-[40rem]">
        <div className="flex gap-2 ">
          <div className="flex-col gap-4 sm:hidden">
            <Sidebar />
          </div>
        </div>

        <div className="flex w-full items-start justify-center relative sm:w-[40rem]">
          {!(posts === "연결실패") && posts.length > 0 && (
            <PostList posts={posts} />
          )}
          {posts.length <= 0 && posts && (
            <AlertsBox>작성된 글이 없습니다.</AlertsBox>
          )}
          {posts === "연결실패" && posts.length > 0 && (
            <AlertsBox>서버에 연결되어있지 않습니다.</AlertsBox>
          )}

          {showScrollButton && (
            <button
              className="fixed bottom-4 right-44 flex h-12 w-12 items-center justify-center rounded-full bg-black text-2xl text-white"
              onClick={scrollToTop}
            >
              <BiUpArrowAlt />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Index;

export async function loader() {
  try {
    const board = await readPosts();
    return board;
  } catch (error) {
    console.error("Error fetching posts:", error);
    return "연결실패";
  }
}
