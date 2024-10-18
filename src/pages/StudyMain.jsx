import React from "react";
import { useNavigate } from "react-router-dom";
import StudyBanner from "../components/studymain/StudyBanner";
import StudySearch from "../components/studymain/StudySearch";
import StudyList from "../components/studymain/StudyList";

const studys = [
  {
    id: 1,
    title: "정보처리기사 필기",
    creator: "testAA",
    participants: 200,
    category: "CS",
    createdAt: "2023-10-01",
  },
  {
    id: 2,
    title: "삼성전자 면접 대비",
    creator: "testBB",
    participants: 170,
    category: "자격증",
    createdAt: "2023-09-15"
  },
  {
    id: 3,
    title: "면접 대비 네트워크 공부",
    creator: "testCC",
    participants: 140,
    category: "자격증",
    createdAt: "2023-08-10",
  },
  {
    id: 4,
    title: "정보처리기사 실기",
    creator: "testAA",
    participants: 70,
    category: "기타",
    createdAt: "2023-07-20",
  },
  {
    id: 5,
    title: "데이터베이스 설계",
    creator: "testDD",
    participants: 120,
    category: "CS",
    createdAt: "2023-09-10",
  },
  {
    id: 6,
    title: "웹 개발 기초",
    creator: "testEE",
    participants: 80,
    category: "기타",
    createdAt: "2023-09-25",
  },
  {
    id: 7,
    title: "자격증 시험 준비",
    creator: "testFF",
    participants: 90,
    category: "자격증",
    createdAt: "2023-10-05",
  },
  {
    id: 8,
    title: "모바일 앱 개발",
    creator: "testGG",
    participants: 150,
    category: "CS",
    createdAt: "2023-08-20",
  },
  {
    id: 9,
    title: "네트워크 기초",
    creator: "testHH",
    participants: 200,
    category: "기타",
    createdAt: "2023-06-30",
  },
  {
    id: 10,
    title: "정보 보안",
    creator: "testII",
    participants: 130,
    category: "CS",
    createdAt: "2023-07-15",
  },
  {
    id: 11,
    title: "소프트웨어 공학",
    creator: "testJJ",
    participants: 160,
    category: "CS",
    createdAt: "2023-09-05",
  },
  {
    id: 12,
    title: "시스템 설계",
    creator: "testKK",
    participants: 110,
    category: "자격증",
    createdAt: "2023-08-25",
  },
  {
    id: 13,
    title: "프론트엔드 개발",
    creator: "testLL",
    participants: 95,
    category: "기타",
    createdAt: "2023-10-10",
  },
  {
    id: 14,
    title: "백엔드 개발",
    creator: "testMM",
    participants: 85,
    category: "CS",
    createdAt: "2023-09-30",
  },
  {
    id: 15,
    title: "기계 학습",
    creator: "testNN",
    participants: 75,
    category: "자격증",
    createdAt: "2023-09-20",
  },
  {
    id: 16,
    title: "운영 체제",
    creator: "testOO",
    participants: 140,
    category: "CS",
    createdAt: "2023-08-05",
  },
];

const StudyMain = () => {
  const navigate = useNavigate();

  return (
    <div>
      {/* 스터디 설명 Banner */}
      <StudyBanner />

      {/* 검색창 및 버튼 */}
      <div className="w-full max-w-screen-lg flex justify-end mb-10">
        <div className="flex items-center w-full max-w-md space-x-2">
          <button
            className="bg-[#ACC7FF] text-white px-2 py-2 rounded-lg text-sm w-[50%] hover:bg-[#6686FA]"
            onClick={() => navigate("/study/create")}
          >
            스터디 만들기
          </button>
          <StudySearch />
        </div>
      </div>

      {/* 문제집 리스트 */}
      <StudyList studys={studys} />
    </div>
  );
};

export default StudyMain;
