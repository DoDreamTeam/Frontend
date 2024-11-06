import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../../../api/api';

const StudyQuestion = () => {
  const { studyId, userAnswerId } = useParams();
  const [submissionDetails, setSubmissionDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSubmissionDetails = async () => {
      try {
        const response = await api.get(`/study/answer/${userAnswerId}`);
        setSubmissionDetails(response.data);
      } catch (error) {
        console.error('Error fetching submission details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSubmissionDetails();
  }, [userAnswerId]);

  if (loading) {
    return <p>제출한 내용을 불러오는 중입니다...</p>;
  }

  return (
    <div className="w-full mb-16">
      {submissionDetails ? (
        <div>
          <div className="text-2xl text-blue-600 font-bold mb-6 text-left">
            질문
          </div>
          <div className="text-xl mb-14">{submissionDetails.question}</div>

          <hr className="my-4 mb-14" />

          <div className="text-2xl text-blue-600 font-bold mb-6 text-left">
            모범 답안
          </div>
          <div className="text-xl mb-14">{submissionDetails.modelAnswer}</div>

          <hr className="my-4 mb-14" />

          <div className="text-2xl text-blue-600 font-bold mb-6 text-left">
            {submissionDetails.userName} 의 답안
          </div>
          <div className="text-xl mb-16">{submissionDetails.answer}</div>
        </div>
      ) : (
        <p>제출한 내용을 찾을 수 없습니다.</p>
      )}
    </div>
  );
};

export default StudyQuestion;
