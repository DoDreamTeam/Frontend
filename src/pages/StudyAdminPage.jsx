import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import StudyInfoEdit from '../components/study/adminpage/StudyInfoEdit';
import StudyApplyMember from '../components/study/adminpage/StudyApplyMember';
import StudyMember from '../components/study/adminpage/StudyMember';
import useModal from '../hooks/useModal';
import StudyNoticeEdit from '../components/study/adminpage/StudyNoticeEdit';

const StudyAdminPage = () => {
  const { studyId } = useParams();
  const navigate = useNavigate();
  const [members, setMembers] = useState([]);
  const { openModal, closeModal, Modal: ConfirmModal } = useModal();

  const updateMembers = (newMembers) => {
    setMembers(newMembers);
  };

  const handleDeleteStudy = async () => {
    try {
      const response = await api.delete(`/api/study/${studyId}`);
      if (response.status === 204) {
        alert('스터디가 삭제되었습니다.');
        closeModal();
        navigate('/study');
      } else {
        alert('스터디 삭제에 실패했습니다. 다시 시도해주세요.');
        closeModal();
      }
    } catch (error) {
      alert('스터디 삭제에 실패했습니다. 다시 시도해주세요.');
      closeModal();
    }
  };

  const openDeleteModal = () => {
    openModal();
  };

  return (
    <div className="w-full max-w-screen-lg mb-6">
      <div className="w-full max-w-screen-lg mb-6">
        <StudyInfoEdit studyId={studyId} />
      </div>
      <div className="w-full max-w-screen-lg mb-6 border-t border-gray-180 pt-5">
        <StudyNoticeEdit studyId={studyId} />
      </div>
      <div className="w-full max-w-screen-lg mb-6 border-t border-gray-180 pt-5">
        <StudyApplyMember studyId={studyId} updateMembers={updateMembers} />
      </div>
      <div className="w-full max-w-screen-lg mb-6 border-t border-gray-180 pt-5">
        <StudyMember studyId={studyId} members={members} />
      </div>

      <div className="flex justify-center mt-20">
        <button
          onClick={openDeleteModal}
          className="px-3 py-1 bg-red-600 text-white rounded-lg hover:bg-red-700"
        >
          스터디 삭제
        </button>
      </div>

      <ConfirmModal>
        <div className="text-2xl font-semibold m-6">
          정말 스터디를 삭제하시겠습니까?
        </div>
        <div className="flex justify-around mt-4 w-full">
          <button
            className="w-3/4 bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 m-4"
            onClick={handleDeleteStudy}
          >
            삭제
          </button>
          <button
            className="w-3/4 bg-gray-200 text-black py-2 px-4 rounded hover:bg-gray-400 m-4"
            onClick={closeModal}
          >
            취소
          </button>
        </div>
      </ConfirmModal>
    </div>
  );
};

export default StudyAdminPage;
