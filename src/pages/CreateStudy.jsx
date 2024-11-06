import React from "react";
import CreateStudyForm from "../components/createStudy/CreateStudyForm";

const CreateStudy = () => {
  return (
    <div className="w-full mb-16">
      <div className="text-3xl text-blue-600 font-bold mb-16 text-left">
        스터디 만들기
      </div>

      {/* 스터디 만들기 form */}
      <CreateStudyForm />
    </div>
  );
};

export default CreateStudy;
