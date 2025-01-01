import { useEffect, useState } from "react";
import { getSideBar } from "../api/apiSidebar";
import LoadingSpinner from "./LoadingSpinner";

//

const TopWriters = () => {
  const [isToppostrows, setisToppostrows] = useState();

  const fetchData = async () => {
    try {
      const res = await getSideBar();
      const { toppostrows, topcommentrows, topteamrows } = res;

      setisToppostrows(toppostrows);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // const writersSplice = writers.sort().slice(0, 5);

  return (
    <div className="box-border flex h-auto w-64 flex-col items-center justify-center gap-3.5 rounded-2xl bg-neutral-50 p-8">
      <div className="text-base font-semibold text-black">Top Writers</div>
      {!isToppostrows && <LoadingSpinner />}
      <div className="flex h-auto flex-col gap-5 self-stretch px-2.5">
        {isToppostrows?.length > 0 &&
          isToppostrows.map((el, index) => (
            <div
              key={index}
              className="flex flex-row items-center justify-center gap-4 "
            >
              <div>
                <img
                  src={el.profileImage}
                  alt={el.profileImage}
                  className="h-10 w-10 rounded-full"
                />
              </div>
              <div className="ml-3">
                <p className="font-bold">RANK: {index + 1}</p>
                <p className="font-bold">{el.userName}</p>
                {/* <p className="text-gray-600">{`Score: ${el.postCNT.toLocaleString()}`}</p> */}
                {/* <p className="text-gray-600">{`Score: ${el.userScore.toLocaleString()}`}</p> */}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default TopWriters;
