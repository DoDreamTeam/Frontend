import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../../api/api';
import { formatDate } from '../../../utils/formatDateUtils';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import useModal from '../../../hooks/useModal';

const StudyApplyMember = ({ studyId, updateMembers }) => {
  const [members, setMembers] = useState([]);
  const [currentMemberPage, setCurrentMemberPage] = useState(0);
  const [totalPagesMembers, setTotalPagesMembers] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [selectedMemberId, setSelectedMemberId] = useState(null);
  const [actionType, setActionType] = useState(null); // 'approve' or 'reject'
  const navigate = useNavigate();
  const { openModal, closeModal, Modal } = useModal();

  useEffect(() => {
    fetchMembers();
  }, [currentMemberPage]);

  const fetchMembers = async () => {
    try {
      const response = await api.get(`/study/${studyId}/members/application`, {
        params: { page: currentMemberPage, size: itemsPerPage },
      });
      if (response.data.content) {
        setMembers(response.data.content);
        setTotalPagesMembers(response.data.page.totalPages);
        setItemsPerPage(response.data.page.size);
      } else {
        setMembers([]);
        setTotalPagesMembers(0);
      }
    } catch (error) {
      console.error('신청한 유저를 불러오는 중 오류 발생', error);
    }
  };

  const handleApprove = async () => {
    try {
      const response = await api.patch(
        `/study/${studyId}/members/${selectedMemberId}`,
        { role: 'ROLE_MEMBER' }
      );
      if (response.status === 200) {
        updateMembers((prevMembers) =>
          prevMembers.map((member) =>
            member.id === selectedMemberId
              ? { ...member, role: 'ROLE_MEMBER' }
              : member
          )
        );
        fetchMembers();
        closeModal();
      }
    } catch (error) {
      alert('승인 처리 중 오류가 발생했습니다.');
    }
  };

  const handleReject = async () => {
    try {
      const response = await api.delete(
        `/study/${studyId}/members/${selectedMemberId}`
      );
      if (response.status === 204) {
        updateMembers((prevMembers) => {
          return prevMembers.filter((member) => member.id !== selectedMemberId);
        });
        closeModal();
      }
    } catch (error) {
      alert('거절 처리 중 오류가 발생했습니다.');
    }
  };

  const handlePageChange = (pageNumber) => {
    setCurrentMemberPage(pageNumber);
  };

  const handleMemberClick = (userId) => {
    navigate(`/mypage/${userId}`);
  };

  const openApproveModal = (memberId) => {
    setSelectedMemberId(memberId);
    setActionType('approve');
    openModal();
  };

  const openRejectModal = (memberId) => {
    setSelectedMemberId(memberId);
    setActionType('reject');
    openModal();
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8 mt-8">
        <div className="text-xl font-semibold">스터디 가입 승인하기</div>
      </div>

      {members.length === 0 ? (
        <div className="text-gray-500 text-center flex items-center justify-center flex-col">
          <div className="flex items-center">가입 신청한 유저가 없습니다.</div>
        </div>
      ) : (
        <>
          <div className="flex flex-col gap-6">
            {members.map((member, index) => (
              <div
                key={member.id}
                className="flex justify-between p-4 border-b border-gray-300"
                style={{ alignItems: 'center' }}
              >
                <div className="mr-8 ml-7">
                  {currentMemberPage * itemsPerPage + index + 1}
                </div>
                <div
                  className="flex items-center cursor-pointer mr-auto ml-5"
                  onClick={() => handleMemberClick(member.userId)}
                >
                  <img
                    src={member.profileImage}
                    className="w-8 h-8 rounded-full"
                  />
                  <div className="ml-4 mr-20">
                    <div>{member.username}</div>
                  </div>
                </div>

                <div className="flex items-center space-x-4 mr-8">
                  <div className="text-sm text-gray-500">
                    {formatDate(member.joinDate)}
                  </div>
                </div>

                <div className="flex items-center justify-center space-x-4">
                  <button
                    onClick={() => openApproveModal(member.id)} // 승인 시 모달 열기
                    className="px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 drop-shadow-lg"
                  >
                    승인
                  </button>
                  <button
                    onClick={() => openRejectModal(member.id)} // 거절 시 모달 열기
                    className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 drop-shadow-lg"
                  >
                    거절
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-center mt-8 mb-10">
            <button
              onClick={() => handlePageChange(currentMemberPage - 1)}
              disabled={currentMemberPage === 0}
            >
              <FaChevronLeft className="text-gray-500 text-sm" />
            </button>
            {Array.from({ length: totalPagesMembers }).map((_, index) => (
              <button
                key={index}
                onClick={() => handlePageChange(index)}
                className={`mx-1 ${
                  index === currentMemberPage
                    ? 'font-bold text-blue-400'
                    : 'text-gray-500'
                }`}
              >
                {index + 1}
              </button>
            ))}
            <button
              onClick={() => handlePageChange(currentMemberPage + 1)}
              disabled={currentMemberPage === totalPagesMembers - 1}
            >
              <FaChevronRight className="text-gray-500 text-sm" />
            </button>
          </div>
        </>
      )}

      {/* 승인/거절 모달 */}
      <Modal style="w-120 text-center">
        <div className="text-2xl font-semibold m-6">
          정말 이 작업을 진행하시겠습니까?
        </div>
        <div className="flex justify-around mt-4 w-full">
          {actionType === 'approve' && (
            <>
              <button
                className="w-3/4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 m-4"
                onClick={handleApprove}
              >
                승인
              </button>
              <button
                className="w-3/4 bg-gray-200 text-black py-2 px-4 rounded hover:bg-gray-400 m-4"
                onClick={closeModal}
              >
                취소
              </button>
            </>
          )}
          {actionType === 'reject' && (
            <>
              <button
                className="w-3/4 bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 m-4"
                onClick={handleReject}
              >
                거절
              </button>
              <button
                className="w-3/4 bg-gray-200 text-black py-2 px-4 rounded hover:bg-gray-400 m-4"
                onClick={closeModal}
              >
                취소
              </button>
            </>
          )}
        </div>
      </Modal>
    </div>
  );
};

export default StudyApplyMember;
