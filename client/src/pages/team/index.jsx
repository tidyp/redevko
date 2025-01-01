import { Link, Outlet, useLoaderData } from "react-router-dom";
import Group from "./Group";
import Button from "../../components/Button";
import { useState } from "react";
import { readTeamsPosts } from "../../api/apiDevko";

import cookie from "react-cookies";
import Modal from "../../components/Modal";
import Pagination from "../../components/Pagination";

const index = () => {
  const posts = useLoaderData();
  const postsList = posts.currPageRows;
  const isLogin = cookie.load("uuid");
  const [isOpen, setIsOpen] = useState(false);
  const handleOpen = () => {
    setIsOpen((prev) => !prev);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const [tab, setTab] = useState(null);
  // const filteredPosts = posts.currPageRows.filter((el) => (tab ? el.section === tab : true));
  const filteredPosts = posts.currPageRows.filter((el) =>
    tab ? el.title === tab : true,
  );

  const handleTab = (selectedTab) => {
    setTab(selectedTab);
  };

  const tabItems = [
    { label: "전체", value: null },
    { label: "프로젝트", value: "project" },
    { label: "자격증", value: "certification" },
    { label: "코딩테스트", value: "codingtest" },
  ];

  return (
    <>
      <Outlet />
      <div className="mt-16 flex w-full flex-col items-center justify-center gap-2">
        <div className="flex w-[80rem] items-center justify-center gap-8 px-4 py-6 text-3xl font-bold">
          <h2>GROUP</h2>
        </div>
        <div className="my- flex w-[80rem] items-center justify-between px-4">
          <ul className="flex items-start gap-2 text-left text-xl">
            {tabItems.map((item) => (
              <li
                key={item.value}
                className={`${
                  tab === item.value ? "font-semibold" : ""
                } cursor-pointer`}
                onClick={() => handleTab(item.value)}
              >
                {item.label}
              </li>
            ))}
          </ul>
          {isOpen && !isLogin && (
            <Modal>
              <div className="flex flex-col items-center justify-center">
                <p className="py-10">로그인이 필요합니다</p>
                <Link className="flex flex-col gap-2 px-12" to="/login">
                  <button className="rounded-xl bg-black p-4 text-white">
                    로그인하러가기
                  </button>
                </Link>
                <button
                  className="rounded-xl bg-white p-4 text-black "
                  onClick={handleClose}
                >
                  취소
                </button>
              </div>
            </Modal>
          )}
          {isLogin ? (
            <>
              <Link to="write">
                <Button color="bg-black" px="8" onClick={handleOpen}>
                  글 작성
                </Button>
              </Link>
            </>
          ) : (
            <>
              <Button color="bg-black" px="8" onClick={handleOpen}>
                글 작성
              </Button>
            </>
          )}
        </div>
        <div className="flex w-[80rem] flex-col items-center justify-center gap-4">
          <div className="box-border grid w-full grid-cols-4  flex-wrap items-start">
            {postsList.map((el, index) => (
              <Group key={index} {...el} />
            ))}
          </div>
        </div>
        <Pagination
          tab={"teams"}
          curPage={posts.page}
          totalPage={posts.totalPages}
        />
      </div>
    </>
  );
};

export default index;

export async function loader({ params }) {
  try {
    const data = await readTeamsPosts(params.id);
    return data;
  } catch (error) {
    return "연결실패";
  }
}
