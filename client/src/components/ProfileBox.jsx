import { useState, useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import LoadingSpinner from "./LoadingSpinner";

import { API_URL } from '../config';

const ProfileBox = () => {
  const { id } = useParams();
  const [userData, setUserData] = useState(null);
  const [userPoint, setUserPoint] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res1 = await fetch(`${API_URL}profile/${id}`);
        const res2 = await fetch(
          `${API_URL}profile/${id}/point`,
        );
        const data1 = await res1.json();
        const data2 = await res2.json();
        setUserData(data1.userrows);
        setUserPoint(data2);
      } catch (error) {
        console.error("Error fetching user profile data:", error);
      }
    };

    fetchData();
  }, [id]);

  if (!userData) {
    return (
      <div className="flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  const notWorking = () => {
    alert("서비스 준비중 입니다.");
  };

  const data = userData[0];

  return (
    <>
      <div className="box-border flex h-auto w-[30rem] flex-col items-center justify-center gap-2 rounded-2xl bg-neutral-50 p-4">
        <div className="text-base font-semibold text-black">
          {data.userName}
        </div>
        <div className="flex h-auto flex-col gap-5 self-stretch px-2.5">
          <header className="flex flex-row items-center justify-center gap-6">
            <div className="w-24">
              <img
                className="w-32 rounded-full"
                src={data.profileImage}
                alt=""
              />
            </div>
            <div className="w-full">
              <p className="font-semibold">intersting</p>
              <p> {data.interestArea}</p>
              <p>
                <p className="font-semibold">Position </p>
                <p>{data.workPosition}</p>
              </p>
              <p>{data.googleEmail}</p>
              <p>{data.naverEmail}</p>
            </div>
          </header>
          <section className="flex items-center justify-center gap-2">
            <button
              onClick={notWorking}
              className="w-full rounded-md bg-black px-1 py-1 tracking-widest text-white"
            >
              1:1챗
            </button>
            <button
              onClick={notWorking}
              className="w-full rounded-lg bg-black px-1 py-1 tracking-widest text-white"
            >
              팔로우
            </button>
          </section>
          <section>
            <p className="font-semibold">소개</p>
            <p>{data.selfDescription}</p>
          </section>
          <footer>
            <p className="flex font-semibold">커뮤니티 활동</p>
            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-lg bg-neutral-100 p-4">
                <p>postPoint</p>
                <p className="text-xl font-semibold">{userPoint.postPoint}</p>
              </div>
              <div className="rounded-lg bg-neutral-100 p-4">
                <p>commentPoint</p>
                <p className="text-xl font-semibold">
                  {userPoint.commentPoint}
                </p>
              </div>
              <div className="rounded-lg bg-neutral-100 p-4">
                <p>teamPoint</p>
                <p className="text-xl font-semibold">{userPoint.teamPoint}</p>
              </div>
              <div className="rounded-lg bg-neutral-100 p-4">
                <p>totalPoint</p>
                <p className="text-xl font-semibold">{userPoint.totalPoint}</p>
              </div>
            </div>
          </footer>
        </div>
      </div>
    </>
  );
};

export default ProfileBox;
