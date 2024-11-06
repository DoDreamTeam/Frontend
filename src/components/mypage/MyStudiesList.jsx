import React, { useEffect, useState } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import api from '../../api/api';
import { Link, useNavigate } from 'react-router-dom';
import { IoMdPeople } from 'react-icons/io';
import { FaRegFaceSadCry } from 'react-icons/fa6';

const MyStudiesList = () => {
  const [studies, setStudies] = useState([]);
  const [currentStudyPage, setCurrentStudyPage] = useState(0);
  const [totalPagesStudy, setTotalPagesStudy] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const navigate = useNavigate();

  useEffect(() => {
    fetchStudies();
  }, [currentStudyPage]);

  const fetchStudies = async () => {
    try {
      const response = await api.get('/study/my', {
        params: { page: currentStudyPage, size: itemsPerPage },
      });
      if (response.data.content) {
        setStudies(response.data.content);
        setTotalPagesStudy(response.data.page.totalPages);
        setItemsPerPage(response.data.page.size);
      } else {
        setStudies([]);
        setTotalPagesStudy(0);
      }
    } catch (error) {
      console.error('스터디를 가져오는 중 오류 발생:', error);
    }
  };

  const handlePageChange = (pageNumber) => {
    setCurrentStudyPage(pageNumber);
  };

  const handleStudyClick = (studyId) => {
    navigate(`/study/${studyId}`);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8 mt-8">
        <div className="text-xl font-semibold">내가 참여 중인 스터디</div>
      </div>

      {studies.length === 0 ? (
        <div className="text-gray-500 text-center flex items-center justify-center flex-col">
          <div className="flex items-center">
            참여중인 스터디가 없습니다.
            <FaRegFaceSadCry className="ml-2 text-xl" />
          </div>
          <Link
            to="/study"
            className="mt-4 text-gray-500 font-semibold underline hover:text-gray-500 text-base
         hover:text-[17px] transition-all duration-300 ease-in-out"
          >
            스터디 보러가기
          </Link>
        </div>
      ) : (
        <>
          <div className="flex flex-col gap-6">
            {studies.map((study, index) => (
              <div
                key={study.id}
                className="relative p-4"
                style={{ display: 'flex', alignItems: 'center' }}
              >
                <div className="absolute top-1/2 left-0 ml-7 text-center transform -translate-y-1/2">
                  {currentStudyPage * itemsPerPage + index + 1}
                </div>

                <span
                  className="absolute top-1/2 left-20 cursor-pointer hover:underline transform -translate-y-1/2 ml-9"
                  onClick={() => handleStudyClick(study.id)}
                >
                  {study.title}
                </span>

                <div className="absolute top-1/2 right-80 flex items-center space-x-2 transform -translate-y-1/2">
                  <img
                    src={study.profileImage}
                    className="w-6 h-6 rounded-full"
                  />
                </div>

                <div className="absolute top-1/2 left-[700px] w-30 text-center transform -translate-y-1/2">
                  <div>{study.username}</div>
                </div>

                <div className="absolute top-1/2 right-5 flex items-center space-x-2 transform -translate-y-1/2">
                  <IoMdPeople className="text-gray-600" />
                  <div>{study.userCount}</div>
                </div>
              </div>
            ))}
          </div>

          {/* 페이지 네비게이션 */}
          <div className="flex justify-center mt-8 mb-10">
            <button
              onClick={() => handlePageChange(currentStudyPage - 1)}
              disabled={currentStudyPage === 0}
            >
              <FaChevronLeft className="text-gray-500 text-sm" />
            </button>
            {Array.from({ length: totalPagesStudy }).map((_, index) => (
              <button
                key={index}
                onClick={() => handlePageChange(index)}
                className={`mx-1 ${
                  index === currentStudyPage
                    ? 'font-bold text-blue-400'
                    : 'text-gray-500'
                }`}
              >
                {index + 1}
              </button>
            ))}
            <button
              onClick={() => handlePageChange(currentStudyPage + 1)}
              disabled={currentStudyPage === totalPagesStudy - 1}
            >
              <FaChevronRight className="text-gray-500 text-sm" />
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default MyStudiesList;
