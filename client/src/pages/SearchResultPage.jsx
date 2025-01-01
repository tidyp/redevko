// import postsData from "../../data/posts.json";

import { searchResult } from "../api/apiDevko";
import { useLoaderData, Link, useParams } from "react-router-dom";

const SearchResultPage = () => {
  const result = useLoaderData();
  const query = useParams();

  const isData = result.currPageRows.length > 0;
  const numData = result.currPageRows.length;

  return (
    <div className="mt-8 flex flex-col items-center justify-center gap-2">
      <ul className="w-[80rem] items-start justify-start text-start">
        {!isData && <p className="p-8 text-xl">검색 결과가 없습니다</p>}
        {isData && (
          <p className="flex justify-between p-8 text-xl">
            <span>#{query.id}</span>
            <span>{numData}개의 검색 결과를 찾았습니다.</span>
          </p>
        )}
        {isData &&
          result.currPageRows.map((el) => {
            return (
              <>
                <li key={el.title} className="group mb-4 w-full">
                  <Link to={`/${el.category}/detail/${el.id}`}>
                    <div className="flex transform items-center justify-between rounded-lg border bg-white p-4 transition-all duration-300 ease-in-out hover:scale-105 group-hover:bg-gray-100 group-hover:shadow-lg">
                      <img
                        className="w-8 rounded-full"
                        src={el.profileImage}
                        alt=""
                      />
                      <span className="text-blue-700">{el.category}</span>
                      <span className="text-blue-700">{el.userName || "Dekvo"}</span>

                      <span className="mb-2 text-xl font-semibold">
                        {el.title}
                      </span>
                      <span className="text-gray-700">{el.content}</span>
                      <span className="text-gray-700">{el.createdAt}</span>
                    </div>
                  </Link>
                </li>
              </>
            );
          })}
      </ul>
      <div className="flex w-full items-center justify-center">
        {/* TODO: pagination */}
        page {result.page}/{result.totalPages}
      </div>
    </div>
  );
};

export default SearchResultPage;

export async function loader({ params }) {
  const { id } = params;
  try {
    const res = await searchResult(id);
    return res;
  } catch (error) {
    console.error("Error fetching posts:", error);
    // loader-fetch-요청실패
    return "연결실패";
  }
}
