import { useEffect, useState } from "react";
import { getSideBar } from "../api/apiSidebar";
import PopTags from "./PopTags";
import TopWriters from "./TopWriters";
import LoadingSpinner from "./LoadingSpinner";

const Sidebar = () => {
  const [tagrows, setTagRows] = useState([]);

  const fetchData = async () => {
    try {
      const res = await getSideBar();
      const { tagrows, topcommentrows, toppostrows, topteamrows } = res;

      setTagRows(tagrows);
      
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };


  useEffect(() => {
    fetchData();
  }, []);

  const sorttags = tagrows.sort((a, b) => b.tagCnt - a.tagCnt);
  return (
    <div className="flex flex-col gap-4">
      <PopTags popTag={sorttags} />
      <TopWriters/>
    </div>
  );
};

export default Sidebar;
