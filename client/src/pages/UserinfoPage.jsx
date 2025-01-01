import { useState } from "react";
import { readUserinfo } from "../api/apiDevko";
import { useLoaderData, useParams } from "react-router-dom";
import cookie from "react-cookies";
import ProfileBox from "../components/ProfileBox";

const UserinfoPage = () => {
  const userdata = useLoaderData();
  const { postrows, commentrows } = userdata;

  // 사용자체크
  const checkUser = cookie.load("uuid");
  const user = useParams();

  const postClassify = (catogory, tab) => {
    // const userPost =
    const post = postrows.filter((item) => item.category === catogory);
    const display =
      post.length > 0 ? (
        <>
          <p className="bor">{post.length}개의 작성 글이 있습니다.</p>
          {post.map((el) => (
            <p class="mb-4 flex w-full items-center justify-start border-b-2 border-black p-2">
              <div class="w-24 font-bold uppercase text-blue-500">
                {el.category}
              </div>
              <div class="w-3/4 text-lg font-semibold">{el.title}</div>
              <div class="text-gray-700">{el.postContent}</div>
            </p>
          ))}
        </>
      ) : (
        <p className="mt-10 text-2xl">{`해당 유저는 ${tab}이 없어요.`}</p>
      );
    return display;
  };

  const tabs = ["discuss", "q&a", "comment", "guitar.etc.."];

  const [activeTabIndex, setActiveTabIndex] = useState(0);

  const handleTabClick = (index) => {
    setActiveTabIndex(index);
  };

  return (
    <>
      <div className="mt-8 flex h-fit flex-col items-center justify-center gap-2">
        <div className="flex w-[80rem] items-start justify-center gap-4">
          <ProfileBox />
          <div className="flex w-full flex-col items-center justify-center">
            <div className="flex w-full">
              {tabs.map((tab, index) => (
                <div
                  className={`w-full cursor-pointer p-4 text-center uppercase  ${
                    index === activeTabIndex
                      ? "border-b-4 border-black font-semibold text-black"
                      : ""
                  }`}
                  key={index}
                  onClick={() => handleTabClick(index)}
                >
                  {tab}
                </div>
              ))}
            </div>
            <div className="flex w-full flex-col items-center justify-center">
              {tabs[activeTabIndex] === "discuss" &&
                postClassify("discuss", "작성한 글")}
              {tabs[activeTabIndex] === "q&a" &&
                postClassify("questions", "질문한 글")}
              {tabs[activeTabIndex] === "comment" &&
                commentrows.map((el) => (
                  <p class="mb-4 flex w-full items-center justify-start border-stone-500 p-2">
                    <div class="w-24 font-bold uppercase text-blue-500">
                      {el.commentContent}
                    </div>
                  </p>
                ))}
              {tabs[activeTabIndex] === "guitar.etc.." &&
                postClassify("group", "활동기록")}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserinfoPage;

export async function loader({ params }) {
  try {
    const data = await readUserinfo(params.id);
    return data;
  } catch (error) {
    return "연결실패";
  }
}
