import { API_URL } from '../config';
import { useImperativeHandle, useState } from "react";
import cookie from "react-cookies";
import { useNavigate } from "react-router-dom";

const AddInfoPage = () => {
  const googleID = cookie.load("googleId");
  const naverID = cookie.load("naverId");
  const googleImage = cookie.load("googleImage");
  const naverImage = cookie.load("naverImage");
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    workPosition: "",
    interestArea: "",
    interestPosition: "",
    selfDescription: "",
    userName: "",
    notification: false,
    googleId: googleID,
    naverId: naverID,
    googleImage: googleImage,
    naverImage: naverImage,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async () => {
    cookie.remove("googleImage", { path: "/" });
    cookie.remove("googleId", { path: "/" });
    cookie.remove("naverImage", { path: "/" });
    cookie.remove("naverID", { path: "/" });
    try {
      const res = await fetch(
        `${API_URL}additionalInfo/step3`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        },
      );

      if (res.ok) {
        const jsonData = await res.json();

        cookie.save("uuid", jsonData.uuid);
        cookie.save("userName", jsonData.userName);
        cookie.save("userImage", jsonData.userImage);
        navigate("/");
      } else {
        console.error("Error submitting form:", res);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };
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

  return (
    <div className="flex h-fit flex-col items-center justify-center gap-8 p-4 mt-28">
      <h1 className="text-2xl">내 정보</h1>
      <div className="w-20">
        {!googleImage && !naverImage && (
          <img
            className="1 rounded-full"
            // src={userInfo.profileImage}
            src={`https://api.dicebear.com/7.x/bottts-neutral/svg?seed=${Math.floor(
              Math.random() * 16,
            )}`}
            alt="Preview"
          />
        )}
        {googleImage && (
          <img
            className="2 rounded-full"
            src={googleImage || formData.userImage}
            alt="Preview"
          />
        )}
        {naverImage && (
          <img
            className="4 rounded-full"
            src={naverImage || formData.userImage}
            alt="Preview"
          />
        )}
      </div>
      <input
        className="hidden"
        type="file"
        name="profileImage"
        onChange={handleInputChangeImage}
      />

      <form className="mt-8 flex flex-col gap-8">
        <div className="flex w-[30rem] items-center justify-between text-xl ">
          <label>Name:</label>
          <input
            className="border-b-[1px] border-[#e5e5e5]"
            type="text"
            name="userName"
            value={formData.userName}
            onChange={handleChange}
          />
        </div>
        {/* <div className="flex w-[30rem] items-center justify-between text-xl ">
          <label>email:</label>
          <input
            className="border-b-[1px] border-[#e5e5e5]"
            type="email"
            name="email"
            value={userInfo.email}
            onChange={handleChange}
          />
        </div> */}
        <div className="flex w-[30rem] items-center justify-between text-xl ">
          <label>Self Description:</label>
          <input
            className="border-b-[1px] border-[#e5e5e5]"
            type="text"
            name="selfDescription"
            value={formData.selfDescription}
            onChange={handleChange}
          />
        </div>
        <div className="flex w-[30rem] items-center justify-between text-xl ">
          <label>Work Position:</label>
          <input
            className="border-b-[1px] border-[#e5e5e5]"
            type="text"
            name="workPosition"
            value={formData.workPosition}
            onChange={handleChange}
          />
        </div>
        {/* <div className="flex w-[30rem] items-center justify-between text-xl ">
          <label>interestArea:</label>
          <input
            className="border-b-[1px] border-[#e5e5e5]"
            type="text"
            name="interestArea"
            value={formData.interestArea}
            onChange={handleChange}
          />
        </div> */}
        <div className="flex w-[30rem] items-center justify-between text-xl ">
          <label>Interest Position:</label>
          <input
            className="border-b-[1px] border-[#e5e5e5]"
            type="text"
            name="interestPosition"
            value={formData.interestPosition}
            onChange={handleChange}
          />
        </div>
        {/* <div className="flex w-[30rem] items-center  gap-12 text-xl ">
          <label>Email Notification:</label>
          <label>
            Send
            <input
              className="h-6 w-12"
              type="checkbox"
              name="notification"
              checked={formData.notification}
              onChange={handleChange}
            />
          </label>
        </div> */}

        <div
          onClick={handleSubmit}
          className="flex cursor-pointer items-center justify-center rounded-full  bg-black p-2 mt-12 text-white"
        >
          완료
        </div>
      </form>
    </div>
  );
};

export default AddInfoPage;
