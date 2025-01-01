import { readArticlePosts } from "../api/apiDevko";
import { useLoaderData, Link, Outlet } from "react-router-dom";
import { formatDate } from "../utils/utils";
import { GoEye, GoComment, GoHeart, GoHeartFill } from "react-icons/go";
import { IoMdMail, IoMdMailOpen } from "react-icons/io";
import Button from "../components/Button";
import Pagination from "../components/Pagination";

const ArticlePage = () => {
  const pageTab = "article";
  const datas = useLoaderData();
  const data = datas.currPageRows;
  console.log(datas.page)
  console.log(datas.totalPages)

  return (
    <>
      <Outlet />
      <div className="mt-16 flex w-full flex-col items-center justify-center gap-2 ">
        <div className="flex w-[80rem] items-center justify-center gap-8 px-4 py-6 text-3xl font-bold">
          <h2 className="uppercase">Article</h2>
        </div>
        <div className="my- flex w-[80rem] items-center justify-between px-4">
          {/* <ul className="flex items-start gap-2 text-left text-xl font-semibold">
            <li>전체</li>
            <li>프로젝트</li>
            <li>자격증</li>
            <li>코딩테스트</li>
          </ul> */}
          {/* <Link to="write">
            <Button color="bg-black" px="8">
              글 작성
            </Button>
          </Link> */}
        </div>
        <ul className="w-[80rem] items-start justify-start text-start ">
          {/* {data.currPageRows && */}
          {data.map((el) => (
            <Link target="blank" to={el.link} key={el.title}>
              <li className="flex flex-col gap-4 border-b-2 border-stone-200 py-8">
                <div className="flex items-center gap-2 text-xl font-semibold">
                  {<IoMdMail className="text-violet-700" /> || <IoMdMailOpen />}
                  {el.title}
                </div>
                <div className="flex justify-between">
                  <div>{el.userId}</div>
                  <div className="flex items-center justify-center gap-2">
                    <div>{formatDate(el.updatedAt)}</div>
                    {/* <GoEye /> */}
                    <div>{el.viewCnt}</div>
                  </div>
                </div>
              </li>
            </Link>
          ))}
          {/* } */}
        </ul>
        {data.length !== undefined && (
          <Pagination
            tab={pageTab}
            curPage={datas.page}
            totalPage={datas.totalPages}
          />
        )}
      </div>
    </>
  );
};

export default ArticlePage;

export async function loader({ params }) {
  try {
    const data = await readArticlePosts(params.id);
    return data;
  } catch (error) {
    console.error("Error fetching posts:", error);

    // loader-fetch-요청실패
    return "연결실패";
  }
}
