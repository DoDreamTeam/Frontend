import React from "react";
import StudyCard from "../ui/StudyCard";
import { useQuery } from "@tanstack/react-query";
import api from "../../api/api";

const BestStudyList = () => {
  const getPopularStudies = async () => {
    const response = await api.get("/study/popular");
    return response.data.content;
  };

  const {
    data: studies = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["popularStudies"],
    queryFn: getPopularStudies,
  });

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {studies.map((study, index) => (
        <div className="flex justify-center" key={index}>
          <StudyCard
            id={study.id}
            title={study.title}
            username={study.username}
            userCount={study.userCount}
            participants={study.status}
            category={study.category}
            status={study.status}
            profileImage={study.profileImage}
          />
        </div>
      ))}
    </div>
  );
};

export default BestStudyList;
