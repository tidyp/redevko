import {
  readPost,
  readComments,
  createComment,
  deletePost,
  readTeamsPosts,
} from "../api/apiDevko";
import {
  useLoaderData,
  useLocation,
  useNavigate,
  useNavigation,
} from "react-router-dom";
import { VscKebabVertical } from "react-icons/vsc";
import Button from "../components/Button";
import cookie from "react-cookies";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

const TeamsdetailPage = () => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  // const { post, comments } = useLoaderData();
  // const { post, comments } = useLoaderData();
  const { discussDetail, discussComments } = useLoaderData();
  const { pathname } = useLocation();
  let [data] = discussDetail;
  const commentsData = comments.currPageRows.slice().reverse();

  const navigate = useNavigate();
  const navigation = useNavigation();

  const username = cookie.load("uuid");

  // 댓
  const [commentContent, setCommentContent] = useState("");

  const handleCommentChange = (e) => {
    setCommentContent(e.target.value);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await createComment({
        postId: data.postId,
        commentId: Math.round(Math.random() * 100000),
        userId: username,
        commentContent: commentContent,
      });
      setCommentContent("");
      navigate(pathname);
    } catch (error) {}
  };

  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev);
  };

  const clickdeletePost = async () => {
    try {
      await deletePost(data.postId);
      window.location.reload();
      // navigate("/");
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center gap-2 pt-8">
        <div className="flex w-[80rem] items-start justify-center gap-4">
          <div className="flex w-full flex-col ">
            <div className="flex w-[50rem] flex-col gap-8 rounded-md bg-slate-50 p-12 text-start">
              <p className="text-gray-700">카테고리: {data.category}</p>
              <header className="flex items-center justify-between text-xl">
                <div className="flex items-center gap-4">
                  <img
                    className="className=h-16 w-16 rounded-full bg-gray-300"
                    src={
                      data.profileImage ||
                      `https://api.dicebear.com/7.x/bottts-neutral/svg?seed=${Math.floor(
                        Math.random() * 16,
                      )}`
                    }
                    alt=""
                  />
                  <div>
                    <p className="text-lg font-semibold">id</p>
                    <p className="text-gray-700">{data.userId}</p>
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
                        <Link to={`/edit/${data.postId}`}>수정</Link>
                      </span>
                      <span
                        className="w-12 cursor-pointer"
                        onClick={() => clickdeletePost(data.postId)}
                      >
                        삭제
                      </span>
                    </div>
                  )}
                </div>
              </header>
              <div className="mt-4 flex flex-col gap-8">
                <h1 className="mb-4 text-xl font-bold">제목: {data.title}</h1>

                <p className="text-gray-700">본문: {data.content}</p>
                <p className="text-gray-700">{data.createdAt}</p>
                <p className="text-gray-700">{data.updatedAt}</p>
                <p className="text-gray-700">{`#${data.tagName}`}</p>
              </div>
            </div>
          </div>

          {/* 채팅 */}
          <div className="flex h-[50rem] w-full flex-col rounded-md">
            <div className="flex flex-col gap-4 rounded-md bg-slate-50 p-4 pl-8 text-start">
              <h2 className="mb-4 text-2xl font-bold">채팅</h2>
              <div className="h-[50rem] bg-white"></div>
              <div className="flex gap-2">
                <textarea
                  className="h-16 w-3/4"
                  type="text"
                  value={commentContent}
                  onChange={handleCommentChange}
                  placeholder="대화를 입력하세요"
                />
                <button className="w-1/4">작성</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TeamsdetailPage;

export async function loader({ params }) {
  try {
    const data = await readTeamsPosts(params.id);
    return data;
  } catch (error) {
    // console.error("Error fetching posts:", error);

    // loader-fetch-요청실패
    return "연결실패";
  }
}
