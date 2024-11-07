import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../../api/api';
import { formatDate } from '../../../utils/formatDateUtils';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import useModal from '../../../hooks/useModal';

const StudyMember = ({ studyId, members: propMembers }) => {
  const [localMembers, setLocalMembers] = useState([]);
  const [currentMemberPage, setCurrentMemberPage] = useState(0);
  const [totalPagesMembers, setTotalPagesMembers] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [selectedMemberId, setSelectedMemberId] = useState(null);
  const [actionType, setActionType] = useState(null);
  const [loading, setLoading] = useState(true);
  const { openModal, closeModal, Modal } = useModal();
  const navigate = useNavigate();

  useEffect(() => {
    if (itemsPerPage === 0) {
      setItemsPerPage(10);
    }
    fetchMembers();
  }, [currentMemberPage, itemsPerPage]);

  useEffect(() => {
    fetchMembers();
    if (propMembers) {
      setLocalMembers(propMembers);
    }
  }, [propMembers]);

  const fetchMembers = async () => {
    try {
      setLoading(true);
      const response = await api.get(`/study/${studyId}/members`, {
        params: { page: currentMemberPage, size: itemsPerPage },
      });
      if (response.data.content) {
        setLocalMembers(response.data.content);
        setTotalPagesMembers(response.data.page.totalPages);
        setItemsPerPage(response.data.page.size);
      } else {
        setLocalMembers([]);
        setTotalPagesMembers(0);
      }
    } catch (error) {
      console.error('스터디 멤버를 불러오는 중 오류 발생', error);
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (pageNumber) => {
    setCurrentMemberPage(pageNumber);
  };

  const handleMemberClick = (userId) => {
    navigate(`/mypage/${userId}`);
  };

  const openDeleteModal = (memberId) => {
    setActionType('delete');
    setSelectedMemberId(memberId);
    openModal();
  };

  const openChangeModal = (memberId) => {
    setActionType('change');
    setSelectedMemberId(memberId);
    openModal();
  };

  const handleDeleteMember = async () => {
    try {
      await api.delete(`/study/${studyId}/members/${selectedMemberId}`);
      closeModal();
      fetchMembers();
    } catch (error) {
      console.error('회원 삭제 중 오류 발생', error);
      closeModal();
    }
  };

  const handleChangeMember = async () => {
    try {
      await api.patch(`/study/${studyId}/members/leader/${selectedMemberId}`);
      closeModal();
      navigate(`/study/${studyId}`);
    } catch (error) {
      console.error('리더 변경 중 오류 발생', error);
      closeModal();
    }
  };

  if (loading) {
    return (
      <div className="text-center py-10">
        <div className="text-xl text-gray-500">로딩 중...</div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8 mt-8">
        <div className="text-xl font-semibold">스터디 회원 리스트</div>
      </div>

      {localMembers.length === 0 ? (
        <div className="text-gray-500 text-center flex items-center justify-center flex-col">
          <div className="flex items-center">
            스터디 회원 리스트가 없습니다.
          </div>
        </div>
      ) : (
        <>
          <div className="flex flex-col gap-6">
            {localMembers.map((member, index) => (
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
                    onClick={() => openDeleteModal(member.id)}
                    className="px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 drop-shadow-lg"
                  >
                    탈퇴
                  </button>
                  <button
                    onClick={() => openChangeModal(member.id)}
                    className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 drop-shadow-lg"
                  >
                    변경
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

      <Modal>
        {actionType === 'delete' && (
          <div className="text-2xl font-semibold m-6">
            정말 이 회원을 삭제하시겠습니까?
          </div>
        )}
        {actionType === 'change' && (
          <div className="text-2xl font-semibold m-6">
            변경 작업을 진행하시겠습니까?
          </div>
        )}
        <div className="flex justify-around mt-4 w-full">
          <button
            className="w-3/4 bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 m-4"
            onClick={
              actionType === 'delete' ? handleDeleteMember : handleChangeMember
            }
          >
            {actionType === 'delete' ? '삭제' : '변경'}
          </button>
          <button
            className="w-3/4 bg-gray-200 text-black py-2 px-4 rounded hover:bg-gray-400 m-4"
            onClick={closeModal}
          >
            취소
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default StudyMember;
