import React, { useEffect, useState } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import api from '../../api/api';
import { useNavigate } from 'react-router-dom';
import { IoMdPeople } from 'react-icons/io';

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

      setStudies(response.data.content);
      setTotalPagesStudy(response.data.page.totalPages);
      setItemsPerPage(response.data.page.size);
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

      <div className="flex flex-col gap-4">
        {studies.map((study, index) => (
          <div
            key={study.id}
            className="flex justify-between p-2 border-t border-gray-300 pt-5"
          >
            <div className="mr-8 ml-7 text-center">
              {currentStudyPage * itemsPerPage + index + 1}
            </div>
            <span
              className="flex-grow mx-12 cursor-pointer hover:underline"
              onClick={() => handleStudyClick(study.id)}
              style={{ display: 'inline-block' }}
            >
              {study.title}
            </span>
            <div className="flex items-center">
              <IoMdPeople className="mr-1" />
              <div className="mr-8 w-32 text-right">{study.userCount}</div>
            </div>
          </div>
        ))}
      </div>

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
    </div>
  );
};

export default MyStudiesList;
