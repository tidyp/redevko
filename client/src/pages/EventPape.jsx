import { useState, useEffect } from "react";
import { readEventPosts } from "../api/apiDevko";
import { Link, Outlet, useLoaderData } from "react-router-dom";

import {
  FaRegArrowAltCircleLeft,
  FaRegArrowAltCircleRight,
} from "react-icons/fa";

import Button from "../components/Button";

import cookie from "react-cookies";

import Modal from "../components/Modal";
import OnelineList from "../components/OnelineList";
import EventList from "../components/EventList";

import { formatDateEvent } from "../utils/utils";

const EventPape = () => {
  const data = useLoaderData();
  console.log(data)
  const filterData = data;
  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const [selectday, setSelectday] = useState(null);
  const [today, setToday] = useState(new Date());
  const [eventData, setEventData] = useState([]);
  const [selectEvent, setSelectEvent] = useState([]);

  const isLogin = cookie.load("uuid");
  const [isOpen, setIsOpen] = useState(false);
  const handleOpen = () => {
    setIsOpen((prev) => !prev);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    const events = [];
    filterData.forEach((data) => {
      const startDate = new Date(data.startDate);
      const endDate = new Date(data.endDate);

      for (
        let currentDate = startDate;
        currentDate <= endDate;
        currentDate.setDate(currentDate.getDate() + 1)
      ) {
        events.push(
          transformData({ ...data, startDate: currentDate.toISOString() }),
        );
      }
    });
    setEventData(events);
  }, [filterData]);

  console.log(data);
  function transformData(data) {
    return {
      year: new Date(data.startDate).getFullYear(),
      month: new Date(data.startDate).getMonth() + 1,
      day: new Date(data.startDate).getDate(),
      endDate: formatDateEvent(data.endDate),
      title: data.title,
      content: data.content,
      location: data.location,
      section: data.section,
      category: data.category,
      postId: data.id,
    };
  }

  const generateCalendar = () => {
    const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    const lastDayOfMonth = new Date(
      today.getFullYear(),
      today.getMonth() + 1,
      0,
    );

    const startingDayOfWeek = firstDayOfMonth.getDay();
    const totalDays = lastDayOfMonth.getDate();
    let calendar = [];
    let dayCounter = 1;
    for (let i = 0; i < 6; i++) {
      let week = [];
      for (let j = 0; j < 7; j++) {
        if ((i === 0 && j < startingDayOfWeek) || dayCounter > totalDays) {
          week.push(null);
        } else {
          const dayData = eventData.find(
            (item) =>
              item.year === today.getFullYear() &&
              item.month === today.getMonth() + 1 &&
              item.day === dayCounter,
          );
          week.push({ day: dayCounter, data: dayData });
          dayCounter++;
        }
      }

      if (!week.every((day) => day === null)) {
        calendar.push(week);
      }
    }

    return calendar;
  };

  const handlePrevMonth = () => {
    setToday(new Date(today.getFullYear(), today.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setToday(new Date(today.getFullYear(), today.getMonth() + 1, 1));
  };
  const handleDayEvent = (day) => {
    setSelectday(day.day);

    const newSelectEvent = eventData.filter((event) => event.day === day.day);
    setSelectEvent(newSelectEvent);
  };

  return (
    <>
      <Outlet />
      <div className="mt-16 flex w-full flex-col items-center justify-center gap-2 ">
        <div className="flex w-[80rem] items-center justify-center gap-8 px-4 text-3xl font-bold py-8">
          <h2>EVENT</h2>
        </div>
        <div className="my- flex w-[80rem] items-center justify-end px-4">
          {/* <ul className="flex items-start gap-2 text-left text-xl font-semibold">
            <li>전체</li>
            <li>채용공고</li>
            <li>직업교육</li>
          </ul> */}
          {isOpen && !isLogin && (
            <Modal>
              <div className="flex flex-col items-center justify-center">
                <p className="py-10">로그인이 필요합니다</p>
                <Link className="flex flex-col gap-2 px-12" to="/login">
                  <button className="rounded-xl bg-black p-4 text-white">
                    로그인하러가기
                  </button>
                </Link>
                <button
                  className="rounded-xl bg-white p-4 text-black "
                  onClick={handleClose}
                >
                  취소
                </button>
              </div>
            </Modal>
          )}
          {isLogin ? (
            <>
              <Link to="write">
                <Button color="bg-black" px="8" onClick={handleOpen}>
                  글 작성
                </Button>
              </Link>
            </>
          ) : (
            <>
              <Button color="bg-black" px="8" onClick={handleOpen}>
                글 작성
              </Button>
            </>
          )}
        </div>
        <div className="flex w-[82rem] flex-col items-start justify-center gap-4">
          <div className="mt-2 flex w-full flex-col rounded bg-white ">
            <div className="mt-2 flex justify-between border-b p-2">
              <span className="text-lg font-bold">
                {today.toLocaleString("default", {
                  month: "long",
                  year: "numeric",
                })}
              </span>

              <div>
                <button onClick={handlePrevMonth} className="p-1">
                  <FaRegArrowAltCircleLeft />
                </button>
                <button onClick={handleNextMonth} className="p-1">
                  <FaRegArrowAltCircleRight />
                </button>
              </div>
            </div>

            <table>
              <thead>
                <tr>
                  {dayNames.map((el, index) => (
                    <th
                      key={index}
                      className={`w-auto border-r p-2 text-xs ${
                        index === dayNames.length - 1 ? "border-r-0" : ""
                      }`}
                    >
                      <span>{el}</span>
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {generateCalendar().map((week, index) => (
                  <tr className="h-20 text-center" key={`row-${index}`}>
                    {week.map((day, dayEventPape) => (
                      <td
                        className="w-44 border-2 p-4"
                        key={`day-${index}-${dayEventPape}`}
                      >
                        <div className="flex items-center justify-center">
                          <div>
                            <span
                              onClick={() => handleDayEvent(day)}
                              className={`flex h-16 w-16 cursor-pointer items-center justify-center overflow-auto  border transition duration-500 hover:bg-blue-200 ${
                                day && day.data
                                  ? "rounded-full border-none"
                                  : "border-none"
                              }`}
                            >
                              <span className={`relative`}>
                                {day !== null ? day.day : ""}
                                {day && day.data && (
                                  <sup
                                    className={`absolute ml-1 rounded-full bg-rose-400 p-1`}
                                  ></sup>
                                )}
                              </span>
                            </span>
                          </div>
                        </div>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex w-full flex-col items-center justify-center mb-4 text-xl">
            {!selectday && selectEvent.length <= 0 && (
              <h2>달력을 눌러 일정을 확인하세요.</h2>
            )}
            {selectday && selectEvent.length <= 0 && (
              <h2>{selectday}일 행사일정이 없습니다.</h2>
            )}
            {selectEvent.length > 0 && (
              <h2 className="text-xl px-4 rounded-full bg-black text-white"><span className="text-2xl">{selectday}</span>일 행사일정</h2>
            )}
          </div>
          <div className="flex w-full flex-col gap-2">
            {selectEvent.map((el, index) => (
              <EventList {...el} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default EventPape;

export async function loader({ params }) {
  try {
    const data = await readEventPosts(params.id);
    return data;
  } catch (error) {
    return "연결실패";
  }
}
