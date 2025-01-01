import { useState } from "react";
import {
  Link,
  Outlet,
  useLoaderData,
  useLocation,
  useNavigate,
} from "react-router-dom";
import cookie from "react-cookies";

import { formatDateDash } from "../utils/utils";

import {
  readDetailPost,
  createComment,
  deleteComment,
  deletePost,
} from "../api/apiDevko";
import { VscKebabVertical } from "react-icons/vsc";

import { TbTrash, TbEdit } from "react-icons/tb";

import Button from "../components/Button";

const PostDetailPage = () => {
  const navigate = useNavigate();
  const { discussDetail, discussComments } = useLoaderData(); // Load Data
  const postData = discussDetail[0];
  console.log(postData);
  console.log(discussComments);
  const commentsData =
    discussComments.rows.length > 0 ? discussComments.rows.slice().reverse() : "";
    console.log(commentsData)
    

  const username = cookie.load("uuid");
  const userimage = cookie.load("userImage");
  const userNickname = cookie.load("userName");

  const [commentContent, setCommentContent] = useState(""); // 댓글 입력 state
  const [isInputFocused, setIsInputFocused] = useState(false); // 댓글 focus state
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const { pathname } = useLocation();

  const handleChange = (e) => {
    setCommentContent(e.target.value);
  };
  // 댓글 작성
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await createComment({
        postId: postData.postId,
        commentId: Math.round(Math.random() * 100000),
        userId: username,
        commentContent: commentContent,
        category: postData.category === "questions" ? "qna" : postData.category,
      });

      navigate(pathname);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }

    setCommentContent("");
    setIsInputFocused(false);
  };

  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev);
  };

  const clickdeleteComment = async (id) => {
    try {
      await deleteComment(id);
      // window.location.reload();
      navigate("");
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };
  const clickdeletePost = async () => {
    try {
      await deletePost(postData.category, postData.postId);
      // window.location.reload();
      navigate("/");
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  const profileimg = `https://api.dicebear.com/7.x/bottts-neutral/svg?seed=${Math.floor(
    Math.random() * 16,
  )}`;
  return (
    <>
      <Outlet />
      <div className="flex h-fit flex-col items-center justify-center gap-2 pt-8">
        <div className="flex w-[80rem] flex-col  items-start justify-center gap-4">
          <div className="flex w-full flex-col ">
            <div className="flex flex-col gap-8 rounded-md bg-neutral-50 p-12 text-start">
              <p className="text-gray-700">
                <span className="rounded-full bg-black px-4 font-bold uppercase text-white">
                  {postData.category}
                </span>{" "}
              </p>
              <header className="flex items-center justify-between text-xl">
                <div className="flex items-center justify-start gap-3">
                  <Link
                    className="h-12 w-12"
                    to={`/userinfo/${postData.userId}`}
                  >
                    {/* <img
                className="h-12 w-12 rounded-lg"
                src={`${"postData.profileImage"}`}
                alt={postData.profileImage}
              /> */}
                    <img
                      className="h-12 w-12 rounded-lg"
                      src={
                        postData.profileImage
                          ? `${postData.profileImage}`
                          : `https://api.dicebear.com/7.x/bottts-neutral/svg?seed=${Math.floor(
                              Math.random() * 16,
                            )}`
                      }
                      alt={postData.profileImage}
                    />
                  </Link>

                  <div className="flex h-14  basis-0 flex-col items-start justify-center">
                    <div className="w-[50rem] truncate text-xl font-semibold text-black">
                      {postData.title}
                    </div>
                    <div className="flex items-center justify-end gap-2.5">
                      <div className="flex gap-4 text-lg font-semibold">
                        <span className="text-blue-700">
                          {postData.userName || `DevKo`}
                        </span>
                        <span>{formatDateDash(postData.createdAt)}</span>
                      </div>
                      <div className="text-sm font-semibold text-zinc-500">
                        {/* {date} */}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="relative cursor-pointer">
                  <VscKebabVertical
                    onClick={toggleDropdown}
                    className="text-gray-600"
                  />
                  {isDropdownOpen && (
                    <div className="item translate3d absolute right-2 flex flex-col items-center justify-center rounded border bg-white p-2 px-4 shadow-md">
                      <span className="w-12 cursor-pointer">
                        <Link to={`edit`}>수정</Link>
                      </span>
                      <span
                        className="w-12 cursor-pointer"
                        onClick={() => clickdeletePost(postData.postId)}
                      >
                        삭제
                      </span>
                    </div>
                  )}
                </div>
              </header>
              <div className="mt-4 flex flex-col gap-8">
                <p className="text-lg text-gray-700">{postData.content}</p>

                <p className="text-gray-700">{`#${postData.tagName?.replaceAll(
                  ",",
                  " #",
                )}`}</p>
              </div>
            </div>
          </div>

          <div
            className={`flex-rows mt-4 flex w-full gap-8 duration-300 ${
              isInputFocused ? "flex-col" : ""
            }`}
          >
            <div className="flex items-center gap-4">
              <img
                className={`${
                  isInputFocused ? "h-12 w-12" : "h-16 w-16"
                } rounded-full focus:flex-col`}
                src={`${userimage}`}
                alt=""
              />
              <div className={`${isInputFocused ? "" : "hidden"}`}>
                {userNickname}
              </div>
            </div>
            <form className="flex w-full flex-col justify-center">
              <input
                onFocus={() => setIsInputFocused(true)}
                className="border-b-2 outline-none focus:border-black"
                value={commentContent}
                onChange={handleChange}
                type="text"
                placeholder="댓글 추가..."
              />
              <div
                className={`mt-2 flex justify-end gap-4 text-black duration-300 ${
                  isInputFocused ? "" : "hidden"
                }`}
              >
                <button
                  color="bg-white"
                  px="8"
                  type="submit"
                  onClick={() => setIsInputFocused(false)}
                >
                  취소
                </button>
                <Button
                  color="bg-black"
                  px="4"
                  type="submit"
                  onClick={handleSubmit}
                >
                  작성
                </Button>
              </div>
            </form>
          </div>
          {/* <div className="w-full rounded-md bg-slate-50 p-4 pl-8 text-start"> */}
          {commentsData.length > 0 &&
            commentsData.map((el) => (
              <div
                key={el.commentId}
                className="flex w-full justify-between gap-2 rounded-md bg-neutral-50 p-4"
              >
                <img
                  className="className=h-8 w-8 rounded-full bg-neutral-50"
                  src={el.profileImage}
                  alt=""
                />
                <p className="text-gray-700">{el.content}</p>
                <p className="font-semibold text-gray-700">
                  {formatDateDash(el.createdAt)}
                </p>
                <div className="flex items-center gap-4">
                  {el.userId === username && (
                    <>
                      {/* <Link to={`${post.category}/detail/${post.postId}/edit`}> */}
                      {/* <TbEdit /> */}
                      {/* </Link> */}
                      <TbTrash
                        className="cursor-pointer"
                        onClick={() => clickdeleteComment(el.commentId)}
                      />
                    </>
                  )}

                  {/* <Link>
            <PiSiren />
          </Link> */}
                </div>
              </div>
            ))}
          {/* </div> */}
        </div>
      </div>
    </>
  );
};

export default PostDetailPage;

export async function loader({ request }) {
  const category = request.url.split("/")[3];
  const id = request.url.split("/")[5];
  try {
    const data = await readDetailPost(category, id);
    // const comments = await readDiscussComments(params.id);
    return data;
  } catch (error) {
    console.error("Error fetching posts:", error);
    // loader-fetch-요청실패
    return "연결실패";
  }
}
