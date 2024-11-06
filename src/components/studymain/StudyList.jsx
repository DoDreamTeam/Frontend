import React, { useState } from "react";
import usePagination from "../../hooks/usePagination";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import StudyCard from "../ui/StudyCard";
import { useQuery } from "@tanstack/react-query";
import api from "../../api/api";
import { categoryNames } from "../../utils/categoryUtils";
import { CgLayoutGrid } from "react-icons/cg";
import Pagination from "../ui/Pagination";

const StudyList = ({ searchResults }) => {
  const itemsPerPage = 12; // 한 페이지에 12개의 아이템
  const [category, setCategory] = useState("전체");
  const [sortOrder, setSortOrder] = useState("최신순");
  const { currentPage, setPage } = usePagination(0);

  const getStudyList = async (page) => {
    const categoryParam = category !== "전체" ? `&category=${category}` : "";
    const response = await api.get(
      `/study?page=${page}&size=${itemsPerPage}${categoryParam}`
    );
    console.log(response);
    return response.data;
  };

  const { data, isLoading, error } = useQuery({
    queryKey: ["study", currentPage, category],
    queryFn: () => getStudyList(currentPage),
  });

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const studys = searchResults || data?.content || [];

  // 필터링된 스터디 리스트
  const filteredStudys = studys.sort((a, b) => {
    if (sortOrder === "최신순") {
      return new Date(b.createdAt) - new Date(a.createdAt);
    } else {
      return b.userCount - a.userCount;
    }
  });

  return (
    <div className="mb-6 max-w-screen-lg mx-auto">
      {/* 카테고리 필터 버튼 */}
      <div className="flex mb-4">
        {["전체", "CATEGORY_CS", "CATEGORY_CERT", "CATEGORY_ETC"].map((cat) => (
          <button
            key={cat}
            className={`py-2 px-4 mx-1 rounded ${
              category === cat ? "font-semibold" : "text-gray-400"
            }`}
            onClick={() => setCategory(cat)}
          >
            {categoryNames[cat]}
          </button>
        ))}
      </div>

      {/* 스터디 카드 리스트 */}
      <div className="grid grid-cols-4 gap-4">
        {filteredStudys.length > 0 ? (
          filteredStudys.map((study) => (
            <StudyCard
              id={study.id}
              title={study.title}
              description={study.description}
              username={study.username}
              userCount={study.userCount}
              profileImage={study.profileImage}
              status={study.status}
              category={study.category}
            />
          ))
        ) : (
          <p className="col-span-4 text-center text-gray-500">
            검색 결과와 일치하는 스터디가 없습니다.
          </p>
        )}
      </div>

      {/* 페이지네이션 */}
      {searchResults ? null : (
        <Pagination
          currentPage={currentPage}
          totalPages={data.page.totalPages}
          setPage={setPage}
        />
      )}
    </div>
  );
};

export default StudyList;
