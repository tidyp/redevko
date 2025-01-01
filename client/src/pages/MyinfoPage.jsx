import { API_URL } from '../config';

import React, { useState } from "react";
import { useLoaderData } from "react-router-dom";
import { readUserinfo, updateUserinfo } from "../api/apiUser";
import cookie from "react-cookies";
import Button from "../components/Button";

const MyinfoPage = () => {
  const data = useLoaderData();
  const [userInfo, setUserInfo] = useState({
    profileImage: data.users[0].profileImage,
    username: data.users[0].userName,
    selfDescription: data.users[0].selfDescription,
    interestArea: data.users[0].interestArea,
    workPosition: data.users[0].workPosition,
  });
  const [imageFile, setImageFile] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);

  // 이미지
  const handleInputChangeImage = (e) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };

      reader.readAsDataURL(file);
      setImageFile(file);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserInfo((prevUserInfo) => ({
      ...prevUserInfo,
      [name]: value,
    }));
  };

  // 회원정보 수정
  const handleEditSubmit = async (e) => {
    e.preventDefault();

    const useruuid = cookie.load("uuid");

    try {
      const formData = new FormData();
      formData.append("id", useruuid);
      formData.append("profileImage", imageFile);
      formData.append("username", userInfo.username);
      // formData.append("email", userInfo.email);
      const res = await fetch(`${API_URL}user/${useruuid}`, {
        method: "PUT",
        body: formData,
      });
      // await updateUserinfo({
      //   id: useruuid,
      //   username: userInfo.username,
      //   profileImage: imageFile,
      // });
    } catch (error) {
      console.error("Failed to update user profile", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center gap-8">
      <h1 className="mt-10 text-2xl">내 정보</h1>
      <div className="w-20">
        {!previewImage && (
          <img
            className="rounded-full"
            src={userInfo.profileImage}
            alt="Preview"
          />
        )}
        {previewImage && (
          <img
            className="rounded-full"
            src={previewImage || userInfo.profileImage}
            alt="Preview"
          />
        )}
      </div>

      {/* <input
        type="file"
        name="profileImage"
        onChange={handleInputChangeImage}
      /> */}

      <input
        id="hiddenInput"
        className="hidden"
        type="file"
        name="profileImage"
        onChange={handleInputChangeImage}
      />
      <button
        className="mt-8 rounded-full border bg-black px-8 py-2 text-white shadow-2xl"
        type="button"
        onClick={() => document.getElementById("hiddenInput").click()}
      >
        프로필 파일 선택
      </button>

      <form
        encType="multipart/form-data"
        className="mt-8 flex flex-col gap-8"
        onSubmit={handleEditSubmit}
      >
        <div className="flex w-[30rem] items-center justify-between text-xl">
          <label>username:</label>
          <input
            className="border-b-[1px] border-[#e5e5e5]"
            type="text"
            name="username"
            value={userInfo.username}
            onChange={handleInputChange}
          />
        </div>
        <div className="flex w-[30rem] items-center justify-between text-xl">
          <label>email:</label>
          <input
            className="border-b-[1px] border-[#e5e5e5]"
            type="email"
            name="email"
            value={userInfo.email}
            onChange={handleInputChange}
          />
        </div>
        <div className="flex w-[30rem] items-center justify-between text-xl">
          <label>selfDescription:</label>
          <input
            className="border-b-[1px] border-[#e5e5e5]"
            type="text"
            name="selfDescription"
            value={userInfo.selfDescription}
            onChange={handleInputChange}
          />
        </div>
        <div className="flex w-[30rem] items-center justify-between text-xl">
          <label>workPosition:</label>
          <input
            className="border-b-[1px] border-[#e5e5e5]"
            type="text"
            name="workPosition"
            value={userInfo.workPosition}
            onChange={handleInputChange}
          />
        </div>
        {/* <div className="flex w-[30rem] items-center justify-between text-xl">
          <label>interestArea:</label>
          <input
            className="border-b-[1px] border-[#e5e5e5]"
            type="text"
            name="interestArea"
            value={userInfo.interestArea}
            onChange={handleInputChange}
          />
        </div> */}

        <div className="flex flex-col">
          <button
            className="mt-8 rounded-full border bg-black px-2 py-2 text-white "
            type="submit"
          >
            회원정보 수정
          </button>
          <button
            className="mt-8 rounded-full border bg-white px-2 py-2 text-black "
            type="submit"
          >
            회원탈퇴
          </button>
        </div>
      </form>
    </div>
  );
};

export default MyinfoPage;

export async function loader({ params }) {
  try {
    const data = await readUserinfo(params.id);
    return data;
  } catch (error) {
    return "연결실패";
  }
}
