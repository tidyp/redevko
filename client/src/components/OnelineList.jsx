import { API_URL } from '../config';

import cookie from "react-cookies";

import { Link } from "react-router-dom";
import { GoEye, GoComment, GoHeart, GoHeartFill } from "react-icons/go";
import { useState } from "react";
import { formatDate } from "../utils/utils";

const OnelineList = (post) => {
  console.log(post)
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
    <li key={post.postId} className="group mb-4 w-full sm:w-96 none list-none	">
      <Link to={`/${post.category}/detail/${post.postId}`}>
        <div className="sm:w-96 flex transform items-center justify-between rounded-lg border bg-white p-4 transition-all duration-300 ease-in-out">
          <div className="flex gap-2">
            <img className="w-8 rounded-full" src={post.profileImage} alt="" />
            <span className="text-blue-700">{post.userName}</span>
          </div>
          <span className="mb-2 text-xl font-semibold">{post.title}</span>

          <div className="flex items-center justify-center gap-4">
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
          </div>

          <span className="flex-2 flex text-gray-700">
            {formatDate(post.createdAt)}
          </span>
        </div>
      </Link>
    </li>
  );
};

export default OnelineList;
