import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../api/api";
import StudyInfo from "../components/study/mainpage/StudyInfo";
import StudyNotice from "../components/study/mainpage/StudyNotice";
import StudyQuestionList from "../components/study/mainpage/StudyQuestionList";
import useModal from "../hooks/useModal";

const StudyPage = () => {
  const { studyId } = useParams();
  const navigate = useNavigate();
  const { openModal, Modal, closeModal } = useModal();

  const [isParticipate, setIsParticipate] = useState(false);

  useEffect(() => {
    closeModal();
    const fetchStudyInfo = async () => {
      const response = await api.get(`/study/participate/${studyId}`);
      if (response.data === "ROLE_MEMBER" || response.data === "ROLE_LEADER") {
        setIsParticipate(true);
      }
    };
    fetchStudyInfo();

    if (!isParticipate) {
      openModal();
    }
  }, [isParticipate]);

  const close = () => {
    closeModal();
    navigate("/");
  };

  return (
    <>
      {isParticipate ? (
        <div className="max-w-screen-lg mx-auto flex flex-col w-full">
          <StudyInfo studyId={studyId} />
          <StudyNotice studyId={studyId} />
          <StudyQuestionList studyId={studyId} />
        </div>
      ) : (
        <Modal>
          <div className="text-center p-4">
            <h2 className="text-xl font-semibold">
              스터디에 접근할 수 없습니다.
            </h2>
            <p className="mt-2">
              스터디에 참여하지 않고 있습니다. 스터디에 참여하는 사람만 접근할
              수 있습니다.
            </p>
            <button
              onClick={close}
              className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-md"
            >
              닫기
            </button>
          </div>
        </Modal>
      )}
    </>
  );
};

export default StudyPage;
