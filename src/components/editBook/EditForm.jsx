import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../api/api";
import { categoryNames } from "../../utils/categoryUtils";

const EditForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");

  // 문제집 정보를 가져오는 함수
  const getBookInfo = async () => {
    const response = await api.get(`/books/${id}`);
    return response.data;
  };

  const { data, isLoading, error } = useQuery({
    queryKey: ["book", id],
    queryFn: getBookInfo,
  });

  // data가 변경될 때마다 상태 업데이트
  useEffect(() => {
    if (data) {
      setTitle(data.title);
      setCategory(data.category); // 기존 카테고리 값으로 초기화
    }
  }, [data]);

  // 카테고리 한글 -> 영문으로 변환하는 함수
  const mapCategoryToServerValue = (categoryName) => {
    switch (categoryName) {
      case "CS":
        return "CATEGORY_CS";
      case "자격증":
        return "CATEGORY_CERT";
      case "기타":
        return "CATEGORY_ETC";
      default:
        return data?.category || ""; // 카테고리가 변경되지 않으면 기존 값을 사용
    }
  };

  // 문제집 수정
  const updateBookMutation = useMutation({
    mutationFn: () => {
      // 한글 카테고리를 서버에서 사용하는 영문 카테고리로 변환
      const mappedCategory = mapCategoryToServerValue(category);

      return api.patch(`/books/${id}`, {
        title,
        category: mappedCategory, // 변환된 카테고리 값 전송
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["book", id]); // 수정 후 캐시 무효화
      navigate(`/book/${id}`); // 수정 후 문제집 상세 페이지로 이동
    },
    onError: (error) => {
      console.error("Update Book Error: ", error);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    updateBookMutation.mutate();
  };

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <form onSubmit={handleSubmit} className="mb-20">
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
          onChange={handleCategoryChange} // 카테고리 값 변경 시 처리
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

      <div className="flex justify-center">
        <button
          type="submit"
          className={`w-full text-white bg-blue-600 px-4 py-2 rounded-md mr-2`}
        >
          문제집 수정하기
        </button>
        <button
          type="button"
          onClick={() => navigate(`/book/${id}`)}
          className="w-full border hover:bg-gray-100 px-4 py-2 rounded-md"
        >
          취소
        </button>
      </div>
    </form>
  );
};

export default EditForm;
