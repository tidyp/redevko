import {
  MdKeyboardArrowLeft,
  MdKeyboardArrowRight,
  MdKeyboardDoubleArrowLeft,
  MdKeyboardDoubleArrowRight,
} from "react-icons/md";
import { useNavigate } from "react-router-dom";

const Pagination = ({ tab, curPage, totalPage }) => {
  const totalPages = totalPage === 0 ? 1 : totalPage
  const navigate = useNavigate();

  // 페이지이동
  const handlePageChange = (item) => {
    navigate(`/${tab}/${item}`);
  };

  return (
    <div className="box-border flex w-full flex-col items-center justify-center gap-4">
      <div className="flex w-full items-center justify-center gap-8 pb-8">
        <button
          onClick={() => handlePageChange(curPage - 1)}
          disabled={curPage === 1}
          className={`rounded-md px-4 py-2 ${
            curPage === 1
              ? "cursor-not-allowed bg-gray-300 text-gray-500"
              : "focus:shadow-outline-blue bg-black text-white hover:bg-blue-600 focus:outline-none active:bg-blue-800"
          }`}
        >
          <MdKeyboardArrowLeft />
        </button>
        <span className="text-lg">
          Page {curPage}/{totalPages}
        </span>
        <button
          onClick={() => handlePageChange(curPage + 1)}
          disabled={curPage === totalPages}
          className={`rounded-md px-4 py-2 ${
            curPage === totalPages
              ? "cursor-not-allowed bg-gray-300 text-gray-500"
              : "focus:shadow-outline-blue bg-black text-white hover:bg-blue-600 focus:outline-none active:bg-blue-800"
          }`}
        >
          <MdKeyboardArrowRight />
        </button>
      </div>
    </div>
  );
};

export default Pagination;
