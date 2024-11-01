import React, { useState } from "react";

const CommentForm = ({
  placeholder = "댓글을 입력하세요...",
  buttonText = "작성",
  onSubmit,
}) => {
  const [comment, setComment] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSubmit) {
      onSubmit(comment);
      setComment(""); // 입력 필드 초기화
    }
  };

  const handleChange = (e) => {
    setComment(e.target.value);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-[#E3E8F3] p-4 rounded shadow-md flex flex-col"
    >
      <div className="flex justify-between items-center mt-2">
        <textarea
          name="comment"
          className="flex-grow border border-gray-300 rounded-l p-2 resize-none placeholder:text-sm mr-3"
          rows="3"
          maxLength={255}
          placeholder={placeholder}
          value={comment}
          onChange={handleChange}
        />
        <button
          type="submit"
          className="bg-[#86AEFF] text-white rounded px-4 py-2 hover:bg-blue-500 h-[88px]"
        >
          {buttonText}
        </button>
      </div>

      <span
        className={`text-sm m-1 ${
          comment.length > 255 ? "text-red-500" : "text-gray-600"
        }`}
      >
        {comment.length}/255
      </span>
    </form>
  );
};

export default CommentForm;
