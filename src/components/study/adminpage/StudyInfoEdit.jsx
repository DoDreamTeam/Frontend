import { useEffect, useState } from 'react';
import { MdEdit, MdCancel } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import api from '../../../api/api';
import { IoReturnUpBackOutline } from 'react-icons/io5';

const StudyInfoEdit = ({ studyId }) => {
  const navigate = useNavigate();
  const [studyInfo, setStudyInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [newDescription, setNewDescription] = useState('');

  useEffect(() => {
    const fetchStudyInfo = async () => {
      try {
        const response = await api.get(`study/${studyId}`);
        setStudyInfo(response.data);
        setTitle(response.data.title);
        setDescription(response.data.description || '');
        setNewDescription(response.data.description || '');
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
    if (title.trim() === '') {
      alert('스터디 제목은 반드시 입력해야 합니다!');
      return;
    }

    const updatedDescription =
      newDescription !== description ? newDescription : description;

    try {
      const studyUpdateRequest = {
        title,
        description: updatedDescription,
      };
      const response = await api.patch(`/study/${studyId}`, studyUpdateRequest);

      setStudyInfo(response.data);
      setDescription(response.data.description);
      setIsEditing(false);
      alert('스터디 정보가 업데이트 되었습니다!');
    } catch (error) {
      console.error('Error updating study:', error);
      alert('스터디 정보 수정에 실패했습니다!');
    }
  };

  const handleGoBack = () => {
    navigate(`/study/${studyId}`);
  };

  if (loading) {
    return <p>스터디 정보를 불러오는 중입니다...</p>;
  }

  return (
    <div>
      <div className="flex items-center mb-10">
        <div className="mr-5 text-3xl font-semibold">{studyInfo.title}</div>
        <button onClick={handleEditClick} className="cursor-pointer">
          {isEditing ? (
            <MdCancel size={25} color="black" />
          ) : (
            <MdEdit size={25} color="black" />
          )}
        </button>

        <button onClick={handleGoBack} className="ml-6 rounded-lg transition ">
          <IoReturnUpBackOutline size={40} />
        </button>
      </div>

      <div className="flex items-center mb-4">
        <div className="mr-2 text-lg text-gray-700">
          {description ||
            '한줄 소개가 없습니다! 한줄 소개로 스터디를 소개해주세요 (❁´◡`❁)'}
        </div>
      </div>
      <div
        className={`transition-all duration-700 ease-in-out transform ${
          isEditing ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
        } overflow-hidden`}
      >
        <div className="mt-10">
          <div className="mb-2 text-xl font-semibold text-gray-700">
            스터디 제목
          </div>
          <div className="flex items-center mb-4">
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="mr-2 text-lg rounded-lg w-full border-b-2 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 mt-4"
              required
            />
          </div>

          <div className="mb-2 text-xl font-semibold text-gray-700 mt-10">
            한줄소개
          </div>
          <div className="flex items-center mb-4">
            <textarea
              value={newDescription}
              onChange={(e) => setNewDescription(e.target.value)}
              className="mr-2 text-lg w-full rounded-lg border-b-2 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 mt-4"
              rows={2}
              maxLength={50}
              placeholder="저희 스터디는 열심히해요 !"
            />
          </div>
        </div>

        <div className="mt-6 mb-6 flex items-center space-x-4">
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
