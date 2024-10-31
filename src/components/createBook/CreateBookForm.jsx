import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/api";
import { useMutation } from "@tanstack/react-query";
import { categoryNames } from "../../utils/categoryUtils";

const CreateBookForm = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [visibility, setVisibility] = useState("공개");

  const isFormValid = title && category && visibility;

  const createBook = async (bookData) => {
    const response = await api.post("/books", bookData);
    return response.data;
  };

  const createBookMutation = useMutation({
    mutationFn: createBook,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isFormValid) {
      const categoryKey = Object.keys(categoryNames).find(
        (key) => categoryNames[key] === category
      );

      const bookData = {
        title,
        category: categoryKey || "",
        secret: visibility === "비공개",
      };

      try {
        const createdBook = await createBookMutation.mutateAsync(bookData);
        navigate(`/book/${createdBook.id}`, {
          state: {
            id: createdBook.id,
            title: createdBook.title,
            username: createdBook.username,
          },
        });
      } catch (error) {
        console.error("Error: ", error);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-12">
        <label className="block mb-4 text-xl font-semibold">
          문제집 제목<span className="text-red-600 font-bold">*</span>
        </label>
        <input
          type="text"
          placeholder="특수문자 포함 20자 이내로 작성해주세요."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border border-gray-300 rounded-md p-2 pr-10 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-xs"
        />
        <p className="text-xs text-gray-400 p-2">
          사용 가능한 특수문자는 (_/-/@/.)입니다.
        </p>
      </div>

      <div className="mb-12">
        <label className="block mb-4 text-xl font-semibold">
          문제집 카테고리<span className="text-red-600 font-bold">*</span>
        </label>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="" disabled>
            선택
          </option>
          <option value={categoryNames.CATEGORY_CS}>
            {categoryNames.CATEGORY_CS}
          </option>
          <option value={categoryNames.CATEGORY_CERT}>
            {categoryNames.CATEGORY_CERT}
          </option>
          <option value={categoryNames.CATEGORY_ETC}>
            {categoryNames.CATEGORY_ETC}
          </option>
        </select>
      </div>

      <div className="mb-12">
        <label className="block mb-4 text-xl font-semibold">
          공개 여부<span className="text-red-600 font-bold">*</span>
        </label>
        <select
          value={visibility}
          onChange={(e) => setVisibility(e.target.value)}
          className="border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="공개">공개</option>
          <option value="비공개">비공개</option>
        </select>
      </div>

      <div className="flex justify-center">
        <button
          type="submit"
          className={`w-full text-white bg-blue-600 px-4 py-2 rounded-md mr-2 ${
            !isFormValid && "opacity-50 cursor-not-allowed"
          }`}
          disabled={!isFormValid}
        >
          문제집 만들기
        </button>
        <button
          type="button"
          onClick={() => navigate("/book")}
          className="w-full border hover:bg-gray-100 px-4 py-2 rounded-md"
        >
          취소
        </button>
      </div>
    </form>
  );
};

export default CreateBookForm;
