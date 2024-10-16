import React from "react";
import BookBanner from "../components/bookmain/BookBanner";
import BookSearch from "../components/bookmain/BookSearch";
import { useNavigate } from "react-router-dom";
import BookList from "../components/bookmain/BookList";

const books = [
  {
    id: 1,
    title: "정보처리기사 필기",
    author: "testA",
    bookmarkCount: 200,
    category: "CS",
    createdAt: "2023-10-01",
  },
  {
    id: 2,
    title: "삼성전자 면접 대비",
    author: "testB",
    bookmarkCount: 170,
    category: "자격증",
    createdAt: "2023-09-15",
  },
  {
    id: 3,
    title: "면접 대비 네트워크 공부",
    author: "testC",
    bookmarkCount: 140,
    category: "자격증",
    createdAt: "2023-08-10",
  },
  {
    id: 4,
    title: "정보처리기사 실기",
    author: "testA",
    bookmarkCount: 70,
    category: "기타",
    createdAt: "2023-07-20",
  },
  {
    id: 5,
    title: "데이터베이스 설계",
    author: "testD",
    bookmarkCount: 120,
    category: "CS",
    createdAt: "2023-09-10",
  },
  {
    id: 6,
    title: "웹 개발 기초",
    author: "testE",
    bookmarkCount: 80,
    category: "기타",
    createdAt: "2023-09-25",
  },
  {
    id: 7,
    title: "자격증 시험 준비",
    author: "testF",
    bookmarkCount: 90,
    category: "자격증",
    createdAt: "2023-10-05",
  },
  {
    id: 8,
    title: "모바일 앱 개발",
    author: "testG",
    bookmarkCount: 150,
    category: "CS",
    createdAt: "2023-08-20",
  },
  {
    id: 9,
    title: "네트워크 기초",
    author: "testH",
    bookmarkCount: 200,
    category: "기타",
    createdAt: "2023-06-30",
  },
  {
    id: 10,
    title: "정보 보안",
    author: "testI",
    bookmarkCount: 130,
    category: "CS",
    createdAt: "2023-07-15",
  },
  {
    id: 11,
    title: "소프트웨어 공학",
    author: "testJ",
    bookmarkCount: 160,
    category: "CS",
    createdAt: "2023-09-05",
  },
  {
    id: 12,
    title: "시스템 설계",
    author: "testK",
    bookmarkCount: 110,
    category: "자격증",
    createdAt: "2023-08-25",
  },
  {
    id: 13,
    title: "프론트엔드 개발",
    author: "testL",
    bookmarkCount: 95,
    category: "기타",
    createdAt: "2023-10-10",
  },
  {
    id: 14,
    title: "백엔드 개발",
    author: "testM",
    bookmarkCount: 85,
    category: "CS",
    createdAt: "2023-09-30",
  },
  {
    id: 15,
    title: "기계 학습",
    author: "testN",
    bookmarkCount: 75,
    category: "자격증",
    createdAt: "2023-09-20",
  },
  {
    id: 16,
    title: "운영 체제",
    author: "testO",
    bookmarkCount: 140,
    category: "CS",
    createdAt: "2023-08-05",
  },
];

const BookMain = () => {
  const navigate = useNavigate();

  return (
    <div>
      {/* 문제집 설명 Banner */}
      <BookBanner />

      {/* 검색창 및 버튼 */}
      <div className="w-full max-w-screen-lg flex justify-end mb-10">
        <div className="flex items-center w-full max-w-md space-x-2">
          <button
            className="bg-[#ACC7FF] text-white px-2 py-2 rounded-lg text-sm w-[50%] hover:bg-[#6686FA]"
            onClick={() => navigate("/book/create")}
          >
            문제집 만들기
          </button>
          <BookSearch />
        </div>
      </div>

      {/* 문제집 리스트 */}
      <BookList books={books} />
    </div>
  );
};

export default BookMain;
