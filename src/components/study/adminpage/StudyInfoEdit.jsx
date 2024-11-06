import { useEffect, useState } from 'react';
import api from '../../../api/api';
import { MdEdit, MdCancel } from 'react-icons/md';

const StudyInfoEdit = ({ studyId }) => {
  const [studyInfo, setStudyInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [newDescription, setNewDescription] = useState(''); // 수정된 설명을 위한 별도 상태 추가

  useEffect(() => {
    const fetchStudyInfo = async () => {
      try {
        const response = await api.get(`study/${studyId}`);
        setStudyInfo(response.data);
        setTitle(response.data.title); // 기존 title 설정
        setDescription(response.data.description || ''); // 기존 description 설정 (빈 값 처리)
        setNewDescription(response.data.description || ''); // 기존 description 값 설정
      } catch (error) {
        console.error('Error fetching studyInfo:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchStudyInfo();
  }, [studyId]);

  const handleEditClick = () => {
    setIsEditing((prev) => !prev);
  };

  const handleSave = async () => {
    // 제목이 비어있으면 경고 표시
    if (title.trim() === '') {
      alert('스터디 제목은 반드시 입력해야 합니다!');
      return;
    }

    // 설명이 수정된 경우에만 업데이트
    const updatedDescription =
      newDescription !== description ? newDescription : description;

    try {
      const studyUpdateRequest = {
        title,
        description: updatedDescription, // 수정된 설명만 반영
      };
      const response = await api.patch(`/study/${studyId}`, studyUpdateRequest);

      // 서버에서 반환된 새로운 study 정보를 받아서 상태 업데이트
      setStudyInfo(response.data);
      setDescription(response.data.description); // 최신 description을 반영
      setIsEditing(false);
      alert('스터디 정보가 업데이트 되었습니다!');
    } catch (error) {
      console.error('Error updating study:', error);
      alert('스터디 정보 수정에 실패했습니다!');
    }
  };

  if (loading) {
    return <p>스터디 정보를 불러오는 중입니다...</p>;
  }

  return (
    <div>
      {/* 기존 제목 출력 */}
      <div className="flex items-center mb-10">
        <div className="mr-5 text-3xl font-semibold">{studyInfo.title}</div>
        {/* 수정 아이콘 */}
        <button onClick={handleEditClick} className="cursr-pointero">
          {isEditing ? (
            <MdCancel size={25} color="black" />
          ) : (
            <MdEdit size={25} color="black" />
          )}
        </button>
      </div>

      {/* 기존 설명 출력 */}
      <div className="flex items-center mb-4">
        <div className="mr-2 text-lg text-gray-700">
          {description ||
            '한줄 소개가 없습니다! 한줄 소개로 스터디를 소개해주세요 (❁´◡`❁)'}
        </div>
      </div>

      {/* 수정 창은 기존 내용 아래에 나타나게 추가 */}
      <div
        className={`transition-all duration-700 ease-in-out transform ${
          isEditing ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
        } overflow-hidden`}
      >
        <div className="mt-10">
          {/* 제목 수정 */}
          <div className="mb-2 text-xl font-semibold text-gray-700">
            스터디 제목
          </div>
          <div className="flex items-center mb-4">
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="mr-2 text-lg rounded-lg w-full border-b-2 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* 설명 수정 */}
          <div className="mb-2 text-xl font-semibold text-gray-700">
            한줄소개
          </div>
          <div className="flex items-center mb-4">
            <textarea
              value={newDescription} // 수정된 description을 사용
              onChange={(e) => setNewDescription(e.target.value)}
              className="mr-2 text-lg w-full rounded-lg border-b-2 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={2}
              maxLength={50}
              placeholder="저희 스터디는 열심히해요 !"
            />
          </div>
        </div>

        {/* 수정 버튼 */}
        <div className="mt-6">
          <button
            onClick={handleSave}
            className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition"
          >
            저장
          </button>
        </div>
      </div>
    </div>
  );
};

export default StudyInfoEdit;
