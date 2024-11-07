import { useEffect, useState } from 'react';
import api from '../../../api/api';
import { MdEdit, MdCancel } from 'react-icons/md';

const StudyNoticeEdit = ({ studyId }) => {
  const [notice, setNotice] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotice = async () => {
      try {
        const response = await api.get(`/study/${studyId}/notice`);
        setNotice(response.data);
        setContent(response.data.content || '');
      } catch (error) {
        console.error('공지사항 조회 실패', error);
      } finally {
        setLoading(false);
      }
    };
    fetchNotice();
  }, [studyId]);

  const handleEditClick = () => {
    setIsEditing((prev) => !prev);
  };

  const handleSave = async () => {
    try {
      const updateRequest = { content };
      const response = await api.put(
        `/study/${studyId}/notice/${notice.id}`,
        updateRequest
      );
      setNotice(response.data);
      alert('공지사항이 수정되었습니다.');
      setIsEditing(false);
    } catch (error) {
      console.error('공지사항 수정 실패', error);
      alert('공지사항 수정에 실패했습니다.');
    }
  };

  if (loading) {
    return <p>공지사항을 불러오는 중입니다...</p>;
  }

  return (
    <div className="mt-4">
      <div className="flex items-center mb-10">
        <div className="mr-5 text-3xl font-semibold">공지사항</div>
        <button onClick={handleEditClick} className="cursor-pointer">
          {isEditing ? <MdCancel size={25} /> : <MdEdit size={25} />}
        </button>
      </div>

      {notice === null || !notice.content ? (
        <div className="text-gray-500 text-center flex items-center justify-center flex-col">
          <div className="text-lg text-gray-700 mb-4">
            공지사항이 없습니다! 멤버들에게 하고 싶은 말이 있다면 작성해주세요
            (❁´◡`❁)
          </div>
          <div
            className={`transition-all duration-700 ease-in-out transform ${
              isEditing ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
            } overflow-hidden`}
          >
            <div className="mt-10">
              <div className="mb-2 text-xl font-semibold text-gray-700">
                공지사항 내용
              </div>
              <div className="flex items-center mb-4">
                <textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="mr-2 text-lg w-full rounded-lg border-b-2 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-lg"
                  rows={4}
                  placeholder="공지사항 내용을 입력해주세요."
                />
              </div>
            </div>

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
      ) : (
        <>
          <div className="flex flex-col mb-6">
            <div className="mb-4 text-lg text-gray-700">
              {notice.content || '공지사항 내용이 없습니다.'}
            </div>
          </div>
          <div
            className={`transition-all duration-700 ease-in-out transform ${
              isEditing ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
            } overflow-hidden`}
          >
            <div className="mt-10">
              <div className="mb-2 text-xl font-semibold text-gray-700">
                공지사항 내용
              </div>
              <div className="flex items-center mb-4">
                <textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="mr-2 text-lg w-full rounded-lg border-b-2 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows={4}
                  placeholder="공지사항 내용을 수정해주세요."
                />
              </div>
            </div>

            <div className="mt-6">
              <button
                onClick={handleSave}
                className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition"
              >
                저장
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default StudyNoticeEdit;
