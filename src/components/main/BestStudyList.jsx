import React from "react";
import StudyCard from "../ui/StudyCard";

const BestStudyList = () => {
  const studies = [
    {
      title: "2024 정처기 실기 2회 대비",
      creator: "testA",
      participants: 10,
      category: "자격증",
      description: "정처기 실기 빠르게 벼락치기 할 사람들",
      status: "참여하기",
    },
    {
      title: "프로그래밍 면접 준비",
      creator: "testB",
      participants: 7,
      category: "기타",
      description: "면접 기출 문제를 분석하고 토론해요.",
      status: "승인 대기중",
    },
    {
      title: "모의 면접 스터디",
      creator: "testA",
      participants: 5,
      category: "기타",
      description: "면접 준비 같이 하실 분",
      status: "참여중",
    },
    {
      title: "자료구조 스터디",
      creator: "testC",
      participants: 5,
      category: "CS",
      description: "자료구조와 알고리즘을 함께 공부해요.",
      status: "참여하기",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {studies.map((study, index) => (
        <div className="flex justify-center" key={index}>
          <StudyCard
            title={study.title}
            creator={study.creator}
            participants={study.participants}
            category={study.category}
            description={study.description}
            status={study.status}
          />
        </div>
      ))}
    </div>
  );
};

export default BestStudyList;
