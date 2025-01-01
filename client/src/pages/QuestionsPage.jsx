import { useLoaderData, Link, Outlet } from "react-router-dom";

import { readQnaPosts } from "../api/apiDevko";

import AlertsBox from "../components/AlertsBox";
import OnelineList from "../components/OnelineList";
import Button from "../components/Button";
import Pagination from "../components/Pagination";

import cookie from "react-cookies";
import { useState } from "react";
import Modal from "../components/Modal";

const QuestionsPage = () => {
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

  return (
    <>
      <Outlet />
      <div className="mt-16 flex w-full flex-col items-center justify-center gap-2 sm:w-32 ">
        <div className="flex w-[80rem] items-center justify-center gap-8 px-4 text-3xl font-bold py-6">
          <h2>Q&amp;A</h2>
        </div>
        <div className="my- flex w-[80rem] items-center justify-between px-4">
          <ul className="flex items-start gap-2 text-left text-xl font-semibold">
            {/* <li>정렬기준</li> */}
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
        <div className="flex w-[80rem] items-start justify-center gap-4">
          {/* Posts */}
          <div className="flex w-full items-start justify-center">
            {posts.length >= 0 && <AlertsBox>작성된 글이 없 습니다.</AlertsBox>}
            {posts.length < 0 && posts === "연결실패" ? (
              // connect fail
              <AlertsBox>서버에 연결되어있지 않습니다.</AlertsBox>
            ) : (
              posts && (
                <div className="box-border flex w-full flex-col items-center justify-center gap-4">
                  <ul className="flex w-full flex-col">
                    {postsList.map((post) => (
                      <OnelineList key={post.postId} {...post} />
                    ))}
                  </ul>
                </div>
              )
            )}
          </div>
        </div>

        <Pagination
          tab={"questions"}
          curPage={posts.page}
          totalPage={posts.totalPages}
        />
      </div>
    </>
  );
};

export default QuestionsPage;

export async function loader({ params }) {
  try {
    const data = await readQnaPosts(params.id);
    return data;
  } catch (error) {
    return "연결실패";
  }
}
