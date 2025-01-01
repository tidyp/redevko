import { API_URL } from '../../config';
import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import cookie from "react-cookies";

import { TbTrash, TbEdit } from "react-icons/tb";
import { PiSiren } from "react-icons/pi";
import { GoEye, GoComment, GoHeart, GoHeartFill } from "react-icons/go";

import { deletePost } from "../../api/apiDevko";
import { formatDate } from "../../utils/utils";

const Post = ({ post }) => {
  const navigate = useNavigate();
  const useruuid = cookie.load("uuid");
  const ln = post.likeName?.includes(`${useruuid}`);
  const [isClickLike, setIsClickLike] = useState(ln);

  const date = formatDate(post.createdAt);

  // function getRandomColor() {
  //   const letters = "0123456789ABCDEF";
  //   let color = "#";
  //   for (let i = 0; i < 6; i++) {
  //     color += letters[Math.floor(Math.random() * 16)];
  //   }
  //   return color;
  // }

  const tagss =
    typeof post.tagName === "string"
      ? post.tagName.split(",").map((el, index) => {
          if (el.trim() === "javascript") {
            return (
              <span className="rounded-lg bg-[#F7DF1E] px-4 py-1" key={index}>
                #{el.trim()}
              </span>
            );
          } else if (el.trim() === "mysql") {
            return (
              <span
                className="rounded-lg bg-[#4479A1] px-4 py-1 text-white"
                key={index}
              >
                #{el.trim()}
              </span>
            );
          } else {
            return (
              <span
                // className="rounded-lg px-4 py-1 bg-gray-100"
                className="rounded-lg px-4 py-1"
                key={index}
                // style={{ backgroundColor: getRandomColor() }}
              >
                #{el.trim()}
              </span>
            );
          }
        })
      : "";

  const fetchData = async (id, isLike) => {
    try {
      const res = await fetch(
        `${API_URL}like/${post.category}/${post.postId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: id,
            isLiked: false,
          }),
        },
      );

      if (res.ok) {
      } else {
        console.error("Failed to like post");
      }
    } catch (error) {
      console.error("Error while liking post", error);
    }

    navigate("/");
  };

  // 좋아요 클릭 이벤트
  const handleLikeClick = async () => {
    // 좋아요 상태 변경
    if (!useruuid) {
      return;
    }

    await setIsClickLike((prev) => !prev);
    await fetchData(useruuid, isClickLike);
  };

  const clickdeletePost = async () => {
    await deletePost(post.category, post.postId);
    navigate("/");
  };


  const pimg = post.profileImage
  // console.log(pimg.replace('"', ""))

  const likes = post.likeName ? post.likeName.split(",").length : 0;

  return (
    <div className="mx-2 mb-4 box-border flex h-fit w-[70rem] items-start justify-start rounded-2xl bg-neutral-50 p-12 sm:w-[40rem]">
      {/* 프로필, 글 */}
      <div className="flex w-full flex-col justify-between gap-8 sm:w-[20rem]">
        <div>
          <span className="rounded-full bg-black px-4 font-bold uppercase text-white">
            {post.category}
          </span>
        </div>
        <div className="flex items-center justify-start gap-3">
          <Link className="h-12 w-12" to={`/userinfo/${post.userId}`}>
            <img
              className="h-12 w-12 rounded-lg"
              src={
                pimg
                  ? post.profileImage
                  : `/images/basicprofile.jpg`
              }
              alt={post.profileImage}
            />
          </Link>

          <div className="flex h-14  basis-0 flex-col items-start justify-center">
            <Link to={`/${post.category}/detail/${post.postId}`}>
              <div className="w-[50rem] overflow-hidden truncate text-xl font-semibold text-black">
                {post.title}
              </div>
            </Link>
            <div className="flex items-center justify-end gap-2.5">
              <div className="text-sm font-semibold text-blue-700">
                {post.userName || `DevKo`}
              </div>
              <div className="text-sm font-semibold text-zinc-500">{date}</div>
            </div>
          </div>
        </div>

        <Link to={`/${post.category}/detail/${post.postId}`}>
          <div className="w-[50rem] self-stretch text-clip text-base font-medium text-zinc-500">
            {post.content}
          </div>
        </Link>
        <div className="flex gap-2">{tagss}</div>
      </div>

      {/* 수정,삭제,신고 // 댓글,뷰,좋아요 */}
      <div className="flex flex-col items-end justify-between gap-2.5 self-stretch">
        <div className="flex gap-4">
          {post.userId === useruuid && (
            <>
              <Link to={`${post.category}/detail/${post.postId}/edit`}>
                <TbEdit />
              </Link>

              <TbTrash
                className="cursor-pointer"
                onClick={() => clickdeletePost(post.postId)}
              />
            </>
          )}

          <Link>
            <PiSiren />
          </Link>
        </div>

        <div className="flex items-center justify-center gap-4">
          <GoComment />
          <span>{post.commentCnt > 0 ? post.commentCnt : 0}</span>
          <GoEye />
          <span>{post.viewCnt > 0 ? post.viewCnt : 0}</span>
          {isClickLike ? (
            <GoHeartFill
              className="scale-150 transform text-red-600 hover:scale-150"
              onClick={handleLikeClick}
            />
          ) : (
            <GoHeart className="hover:scale-150" onClick={handleLikeClick} />
          )}
          {/* {post.likeUser === useruuid ? (
            <GoHeartFill
              className="scale-150 transform text-red-600 hover:scale-150"
              onClick={handleLikeClick}
            />
          ) : (
            <GoHeart className="hover:scale-150" onClick={handleLikeClick} />
          )} */}
          <span>{likes}</span>
        </div>
      </div>
    </div>
  );
};

export default Post;
