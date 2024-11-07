import { useEffect, useState } from 'react';
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from 'react-icons/md';
import api from '../../../api/api';
import StudyNoticeComment from './StudyNoticeComment'; // StudyNoticeComment 컴포넌트 임포트

const StudyNotice = ({ studyId }) => {
  const [notice, setNotice] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isCommentsOpen, setIsCommentsOpen] = useState(false);

  useEffect(() => {
    const fetchNotice = async () => {
      try {
        const response = await api.get(`/study/${studyId}/notice`);
        setNotice(response.data);
      } catch (error) {
        console.error('공지사항 조회 실패', error);
      } finally {
        setLoading(false);
      }
    };
    fetchNotice();
  }, [studyId]);

  const handleToggleComments = () => {
    setIsCommentsOpen((prev) => !prev);
  };

  if (loading) {
    return <p>공지사항을 불러오는 중입니다...</p>;
  }

  return (
    <div className="p-5">
      <div className="border-2 border-gray-100 p-6 rounded-2xl shadow-xl">
        <div className="mb-4 text-xl font-semibold text-black">
          📌 공지사항을 확인하세요.
        </div>

        <div className="p-4 rounded-lg mb-6">
          <div className="text-base text-black">
            {notice?.content || '공지사항 내용이 없습니다.'}
          </div>
        </div>
      </div>

      {/* 댓글 목록 토글 버튼 */}
      <div className="mt-4">
        <button
          onClick={handleToggleComments}
          className="flex items-center text-black hover:text-blue-800"
        >
          {isCommentsOpen ? (
            <MdKeyboardArrowUp size={24} className="mr-2" />
          ) : (
            <MdKeyboardArrowDown size={24} className="mr-2" />
          )}
          댓글 목록
        </button>
      </div>

      <div
        className={`mt-4 overflow-hidden transition-all duration-700 ease-in-out transform ${
          isCommentsOpen ? 'h-auto opacity-100' : 'h-0 opacity-0'
        }`}
        style={{
          height: isCommentsOpen ? 'auto' : '0',
        }}
      >
        {isCommentsOpen && notice && (
          <StudyNoticeComment noticeId={notice.id} />
        )}
      </div>
    </div>
  );
};

export default StudyNotice;
