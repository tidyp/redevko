import { useEffect, useState } from "react";
import axios from "axios";
import cookie from "react-cookies";
import Button from "../components/Button";
import Modal from "../components/Modal";
import {
  redirect,
  useLoaderData,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { readDetailPost, updatePost } from "../api/apiDevko";

import { formatDateDash } from "../utils/utils";

const categories = [
  { id: "discuss", label: "Discuss" },
  { id: "questions", label: "Q&A" },
  { id: "event", label: "Event" },
  { id: "teams", label: "Group" },
];

const EditPostForm = () => {
  const data = useLoaderData();
  const { discussDetail, discussComments } = useLoaderData();
  const postData = discussDetail[0];
  console.log(postData)

  const loca = useLocation();
  const postId = loca.pathname.split("/")[3]

  const tab =
    loca.pathname.split("/")[1] !== "write"
      ? loca.pathname.split("/")[1]
      : "discuss";
  const username = cookie.load("uuid");
  const navigate = useNavigate("/");
  const [newTag, setNewTag] = useState("");
  const [isEmpty, setIsEmpty] = useState(true);

  // submit form
  const [formData, setFormData] = useState({
    userId: username,
    title: postData.title,
    content: postData.content,
    category: postData.category,
    tags: postData.tagName,
    startDate: formatDateDash(new Date()),
    endDate: "",
    location: "",
    section: "",
    link: "",
    members: "",
    workPosition: "",
  });

  useEffect(() => {}, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };



  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // 공백 예외처리
      if (
        !formData ||
        !formData.category ||
        !formData.title ||
        !formData.content
      ) {
        setIsEmpty(false);
        return;
      }


      const res = await updatePost({ postId, ...formData });
      navigate("../");
    } catch (error) {
      console.error("Error creating post:", error);
    }
    navigate("../");
  };

  const handleCancel = () => {
    navigate("../");
  };

  const handleTag = () => {
    setFormData((prevData) => ({
      ...prevData,
      tags: "#",
    }));
  };
  return (
    <Modal>
      <div className="flex w-[50rem] flex-col items-center p-8">
        {/* <h2>Create a New Post</h2> */}
        {!isEmpty && (
          <p className="text-lg text-rose-600">모든 항목을 작성해주세요.</p>
        )}
        <form
          className="flex w-full flex-col gap-3 px-4"
          onSubmit={handleSubmit}
        >
          <div className="flex items-center justify-start gap-2">
            {categories.map((category) => (
              <button
                key={category.id}
                type="button"
                className={`rounded-md border px-4 py-2 ${
                  formData.category === category.id
                    ? "bg-gray-200  text-gray-700"
                    : "border-spacing-4 bg-white text-gray-700"
                }`}
                onClick={() => {
                  handleChange({
                    target: { name: "category", value: category.id },
                  });
                }}
              >
                {category.label}
              </button>
            ))}
          </div>

          {/* title */}
          <div className="flex items-center justify-between gap-2">
            <input
              type="text"
              name="title"
              placeholder="제목을 입력하세요"
              className="w-full rounded-lg border bg-gray-200 p-2"
              required
              value={formData.title}
              onChange={handleChange}
            />
          </div>

          {(formData.category === "calendars" || formData.category === "teams") && (
            <>
              <div className="flex w-full items-center justify-between gap-2">
                <div className="flex  w-full items-center justify-between">
                  <input
                    type="date"
                    name="startDate"
                    className="w-full rounded-lg border bg-gray-200 p-2"
                    required
                    value={formData.startDate}
                    onChange={handleChange}
                  />
                </div>
                <div className="flex  w-full items-center justify-between">
                  <input
                    type="date"
                    name="endDate"
                    className="w-full rounded-lg border bg-gray-200 p-2"
                    required
                    value={formData.endDate}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="flex  w-full items-center justify-between">
                <input
                  type="text"
                  name="location"
                  placeholder="장소을 입력하세요"
                  className="w-full rounded-lg border bg-gray-200 p-2"
                  required
                  value={formData.location}
                  onChange={handleChange}
                />
              </div>
              <div className="flex  w-full items-center justify-between">
                <input
                  type="text"
                  name="section"
                  placeholder="이벤트 구분"
                  className="w-full rounded-lg border bg-gray-200 p-2"
                  required
                  value={formData.section}
                  onChange={handleChange}
                />
              </div>
            </>
          )}

          {formData.category === "calendars" && (
            <div className="flex  w-full items-center justify-between">
              <input
                type="text"
                name="link"
                placeholder="링크을 입력하세요"
                className="w-full rounded-lg border bg-gray-200 p-2"
                required
                value={formData.link}
                onChange={handleChange}
              />
            </div>
          )}

          {formData.category === "teams" && (
            <>
              <div className="flex  w-full items-center justify-between">
                <input
                  type="text"
                  name="members"
                  placeholder="팀원수을 입력하세요"
                  className="w-full rounded-lg border bg-gray-200 p-2"
                  required
                  value={formData.members}
                  onChange={handleChange}
                />
              </div>
              <div className="flex  w-full items-center justify-between">
                <input
                  type="text"
                  name="workPosition"
                  placeholder="포지션을 입력하세요"
                  className="w-full rounded-lg border bg-gray-200 p-2"
                  required
                  value={formData.workPosition}
                  onChange={handleChange}
                />
              </div>
            </>
          )}

          {/* {formData.category !== "calendars" && ( */}
          <div className="flex items-center justify-between gap-2">
            <textarea
              name="content"
              placeholder="내용을 입력하세요"
              className="h-96 w-full rounded-md border bg-gray-200 p-2"
              required
              value={formData.content}
              onChange={handleChange}
            />
          </div>
          {/* )} */}

          {formData.category && (
            <div className="flex items-center justify-between gap-2">
              <input
                name="tags"
                placeholder="태그를 입력하세요(#으로 구분)"
                className="w-full rounded-md border bg-gray-200 p-2"
                required
                value={formData.tags}
                onChange={handleChange}
                onClick={handleTag}
              />
            </div>
          )}

          {/* <div className="flex justify-between gap-4 bg-gray-200 p-2">
          <div className="flex">
            {formData.tags.length > 0 &&
              formData.tags.map((tag, index) => (
                <>
                  <div
                    className="flex w-auto items-center justify-center gap-4 bg-gray-200 px-4"
                    name="tags"
                    key={`tag-${index}`}
                    value={tag}
                  >
                    {tag}
                  </div>
                </>
              ))}
          </div>
          <select
            className="rounded-lg border bg-gray-200 p-2"
            onChange={(e) => setNewTag(e.target.value)}
            onClick={handleAddTag}
            value={newTag}
          >
            <option value="">태그를 선택해주세요</option>
            <option value="javascript">javascript</option>
            <option value="node">node</option>
            <option value="react">react</option>
            <option value="next">next</option>
            <option value="express">express</option>
            <option value="nest">nest</option>
          </select>
        </div> */}

          <div className="mt-6 flex justify-end gap-4">
            <Button color="bg-black" px="4" onClick={handleCancel}>
              취소하기
            </Button>
            <Button color="bg-black" px="4" onClick={handleSubmit}>
              수정하기
            </Button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default EditPostForm;
export async function loader({ request }) {
  const category = request.url.split("/")[3];
  const id = request.url.split("/")[5];
  try {
    const data = await readDetailPost(category, id);
    // const comments = await readDiscussComments(params.id);
    return data;
  } catch (error) {
    console.error("Error fetching posts:", error);
    // loader-fetch-요청실패
    return "연결실패";
  }
}
