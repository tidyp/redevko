import { API_URL } from "../config";

import cookie from "react-cookies";

import { Link } from "react-router-dom";
import { GoEye, GoComment, GoHeart, GoHeartFill } from "react-icons/go";
import { useState } from "react";
import { formatDate } from "../utils/utils";

const EventList = (post) => {
  console.log(post);
  const useruuid = cookie.load("uuid");

  const [isClickLike, setIsClickLike] = useState(false);

  // 좋아요 클릭 이벤트
  const handleLikeClick = async () => {
    setIsClickLike((prev) => !prev);
    try {
      const res = await fetch(`${API_URL}like/${post.id}`, {
        method: "POST",
      });

      if (res.ok) {
      } else {
        console.error("Failed to like post");
      }
    } catch (error) {
      console.error("Error while liking post", error);
    }
  };

  return (
    <li key={post.postId} className="none group mb-4 w-full list-none sm:w-96	">
      <Link to={`/${post.category}/detail/${post.postId}`}>
        <div className="flex transform items-center justify-between rounded-lg border bg-white p-4 transition-all sm:w-96">
          <div className="flex gap-16 ">
            <div className="mb-2 flex gap-4 border-r-2 border-gray-200 text-xl">
              <span className="w-24 border-r-2 border-gray-200 text-xl text-blue-700">
                {post.section}
              </span>
              <span className="w-24 text-orange-700">{post.location}</span>
            </div>
            <span className="mb-2 px-4 text-xl">{post.title}</span>
            <span className="mb-2 text-xl ">{post.content}</span>
          </div>

          {/* <div className="flex items-center justify-center gap-4">
      <GoComment />
      <span>{post.commentCnt > 0 ? post.commentCnt : 0}</span>
      <GoEye />
      {post.viewCnt ? <span>{post.viewCnt}</span> : 0}

      {post.likeUser === useruuid ? (
       <GoHeartFill
        className="scale-150 transform text-red-600"
        onClick={handleLikeClick}
       />
      ) : (
       <GoHeart onClick={handleLikeClick} />
      )}

      <span>{post.likeCnt}</span>
     </div> */}

          <span className="flex-2 flex text-gray-700">
            종료: {post.endDate}
          </span>
        </div>
      </Link>
    </li>
  );
};

export default EventList;
