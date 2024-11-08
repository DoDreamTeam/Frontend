import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MdEdit } from 'react-icons/md';
import { getUserId } from '../../mypage/GetUserId';
import api from '../../../api/api';

const StudyInfo = ({ studyId }) => {
  const [studyInfo, setStudyInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [logInUserId, setLogInUserId] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const userId = getUserId();
    setLogInUserId(userId);

    const fetchStudyInfo = async () => {
      try {
        const response = await api.get(`study/${studyId}`);
        setStudyInfo(response.data);
      } catch (error) {
        console.error('Error fetching studyInfo:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchStudyInfo();
  }, [studyId]);

  const handleGoToAdminPage = () => {
    navigate(`/study/${studyId}/admin`);
  };

  if (loading) {
    return <p>스터디 정보를 불러오는 중입니다...</p>;
  }

  return (
    <div>
      <div className="flex items-center mb-10">
        <div className="mr-5 text-3xl font-semibold">{studyInfo.title}</div>
        {logInUserId === String(studyInfo.userId) && (
          <button onClick={handleGoToAdminPage} className="cursor-pointer">
            <MdEdit size={25} color="black" />
          </button>
        )}
      </div>
      <div className="flex items-center">
        {studyInfo.profileImage ? (
          <img
            src={studyInfo.profileImage}
            alt={`${studyInfo.username}'s profile`}
            className="w-8 h-8 rounded-full mr-4 cursor-pointer"
          />
        ) : (
          <div className="w-10 h-10 rounded-full bg-black mr-4" />
        )}
        <div
          className="text-l font-semibold cursor-pointer"
          onClick={() => navigate(`/mypage/${studyInfo.userId}`)}
        >
          {studyInfo.username}
        </div>
      </div>
      <div className="flex items-center mb-4">
        <div className="mr-2 text-lg text-gray-700 mt-10 mb-10">
          {studyInfo.description || '한줄 소개가 없습니다! (❁´◡`❁)'}
        </div>
      </div>
    </div>
  );
};

export default StudyInfo;
