import React, { useEffect, useState } from "react";
import SolveQuestionForm from "../components/questionEvaluate/SolveQuestionForm";
import { useNavigate, useParams } from "react-router-dom";
import api from "../api/api";

const QuestionPage = () => {
  const { id, questionId } = useParams();
  const [question, setQuestion] = useState("");
  const [bookTitle, setBookTitle] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchQuestion = async () => {
      try {
        const response = await api.get(`/books/${id}/questions/${questionId}`);
        setQuestion(response.data.question);
      } catch (error) {
        console.error("Error fetching question:", error);
      }
    };

    const fetchBookTitle = async () => {
      try {
        const response = await api.get(`/books/${id}`);
        setBookTitle(response.data.title);
      } catch (error) {
        console.error("Error fetching book title:", error);
      }
    };

    fetchQuestion();
    fetchBookTitle();
  }, [id, questionId]);

  return (
    <div className="w-full mb-16">
      <div
        className="text-xl text-black font-bold mb-16 text-left hover:text-gray-500 cursor-pointer hover:underline"
        onClick={() => navigate(`/book/${id}/questions`)}
      >
        {bookTitle}
      </div>

      <div className="text-3xl text-blue-600 font-bold mb-4 text-left">Q.</div>
      {question && (
        <div className="mb-16">
          <div className="text-xl">{question}</div>
        </div>
      )}

      <SolveQuestionForm bookId={id} questionId={questionId} />
    </div>
  );
};

export default QuestionPage;
