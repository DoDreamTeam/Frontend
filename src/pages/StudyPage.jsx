import React from "react";
import StudyInfo from "../components/studypage/StudyInfo";
import api from "../api/api";
import { useQuery } from "@tanstack/react-query";
import { useLocation, useParams } from "react-router-dom";
import Notice from "../components/studypage/Notice";

const StudyPage = () => {
  const { studyId, noticeId } = useParams();
  const location = useLocation();
  console.log("studyId:", studyId, "noticeId:", noticeId);

  // Check if noticeId is expected in this path
  const isNoticePage = location.pathname.includes("/notice/");

  if (!studyId || (isNoticePage && !noticeId)) {
    return <p>Error: Missing study or notice ID</p>;
  }

  // 스터디 정보 가져오기
  const getStudyInfo = async () => {
    const response = await api.get(`/study/${studyId}`);
    return response.data;
  };

  // 공지사항 정보 가져오기
  const getNoticeInfo = async () => {
    const response = await api.get(`/study/${studyId}/notice/${noticeId}`)
    return response.data;
  }

  if (!studyId || !noticeId) {
    return <p>Error: Missing study or notice ID</p>;
  }

  const { data: studyData, isLoading: isStudyLoading, error: studyError } = useQuery(
    ["study", studyId],
    getStudyInfo
  );

  const { data: noticeData, isLoading: isNoticeLoading, error: noticeError } = useQuery(
    ["notice", studyId, noticeId],
    getNoticeInfo,
    { enabled: isNoticePage && !!noticeId } // Only run this query if noticeId is defined
  );

  if (isStudyLoading || isNoticeLoading) return <p>Loading...</p>;
  if (studyError) return <p>Error: {studyError.message}</p>;
  if (noticeError) return <p>Error: {noticeError.message}</p>;

  return (
    <div className="max-w-screen-lg mx-auto flex flex-col w-full">
      <StudyInfo studyData={studyData} />

      {isNoticePage && noticeData && (
        <Notice noticeData={noticeData} studyId={studyId} noticeId={noticeId} userRole={studyData.userRole} />
      )}
      <br />

    </div>
  );
};

export default StudyPage;
