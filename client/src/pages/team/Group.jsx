import React from "react";
import { Link } from "react-router-dom";
import { formatDateDash } from "../../utils/utils";

const Group = ({
  id,
  title,
  members,
  category,
  content,
  location,
  startDate,
  endDate,
  workPosition,
}) => {
  return (
    <Link to={`/${category}/detail/${id}`}>
      <div className="m-2">
        <div className="flex h-[20rem] flex-col gap-8 overflow-hidden rounded-xl bg-neutral-50 p-8 text-left text-base ">
          <header className="flex flex-col gap-2">
            <div className="flex items-center gap-8">
              <span className="rounded-xl bg-rose-200 px-4">{category}</span>
              <span className="font-semibold">{title}</span>
            </div>
            <div className="flex items-center justify-start gap-8 ">
              <div className="rounded-full bg-blue-200 px-4">
                D-
                {Math.round(((new Date(endDate) - new Date(startDate)) /
                  1000 /
                  60 /
                  60 /
                  24), 0)}
              </div>
              <div className="flex flex-col">
                <span>마감일: {formatDateDash(endDate)}</span>
                {/* <span>시작일: {formatDateDash(startDate)}</span> */}
              </div>
            </div>
            <div className="flex gap-2">
              <span>{location}</span>
              <span>{members}</span>
            </div>
          </header>
          <body>{content}</body>
          <footer>{workPosition}</footer>
        </div>
      </div>
    </Link>
  );
};

export default Group;
