import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../api/api";
import { useMutation } from "@tanstack/react-query";
import { categoryNames } from "../../utils/categoryUtils";

const CreateStudyForm = () => {
    const navigate = useNavigate();
    const [title, setTitle] = useState("");
    const [category, setCategory] = useState("");
    const [description, setDescription] = useState("");
    const [content, setContent] = useState("");
    const [isDeleted, setIsDeleted] = useState(false);

    const isFormValid = title && category && description;

    const createStudy = async (studyData) => {
        const response = await api.post("/study", studyData);
        return response.data;
    };

    const createNotice = async ({studyId, content, isDeleted}) => {
        const noticeResponse = await api.post(`/study/${studyId}/notice`, { content, isDeleted });
        return noticeResponse.data;
    };

    const createStudyMutation = useMutation({
        mutationFn: createStudy,
    });

    const createNoticeMutation = useMutation({
        mutationFn: createNotice,
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (isFormValid) {
            const categoryKey = Object.keys(categoryNames).find(
                (key) => categoryNames[key] === category
            );

            const studyData = {
                title,
                category: categoryKey || "",
                description,
            };

            const noticeData = {
                content,
                isDeleted,
            };

            try {
                const createdStudy = await createStudyMutation.mutateAsync(studyData);

                if (createdStudy && createdStudy.id) {
                    await createNoticeMutation.mutateAsync({
                        studyId: createdStudy.id,
                        ...noticeData
                    });

                    navigate(`/study/${createdStudy.id}`, {
                        state: {
                            id: createdStudy.id,
                            title: createdStudy.title,
                            username: createdStudy.username,
                            content: noticeData.content,
                            isDeleted: noticeData.isDeleted,
                        },
                    });
                } else {
                    console.error("Error: createdStudy does not have an id");
                }
            } catch (error) {
                console.error("Error: ", error);
            }
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="mb-12">
                <label className="block mb-4 text-xl font-semibold">
                    스터디 제목<span className="text-red-600 font-bold">*</span>
                </label>
                <input
                    type="text"
                    placeholder="특수문자 포함 20자 이내로 작성해주세요."
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="border border-gray-300 rounded-md p-2 pr-10 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-xs"
                />
                <p className="text-xs text-gray-400 p-2">
                    사용 가능한 특수문자는 (_/-/@/.)입니다.
                </p>
            </div>

            <div className="mb-12">
                <label className="block mb-4 text-xl font-semibold">
                    스터디 카테고리<span className="text-red-600 font-bold">*</span>
                </label>
                <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    <option value="" disabled>
                        선택
                    </option>
                    <option value={categoryNames.CATEGORY_CS}>
                        {categoryNames.CATEGORY_CS}
                    </option>
                    <option value={categoryNames.CATEGORY_CERT}>
                        {categoryNames.CATEGORY_CERT}
                    </option>
                    <option value={categoryNames.CATEGORY_ETC}>
                        {categoryNames.CATEGORY_ETC}
                    </option>
                </select>
            </div>

            <div className="mb-12">
                <label className="block mb-4 text-xl font-semibold">
                    스터디 설명<span className="text-red-600 font-bold">*</span>
                </label>
                <input
                    type="text"
                    placeholder="간단한 스터디 설명을 적어주세요. (100글자 이내)"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="border border-gray-300 rounded-md p-2 pr-10 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-xs"
                />
                <p className="text-xs text-gray-400 p-2">
                    사용 가능한 특수문자는 (_/-/@/.)입니다.
                </p>
            </div>

            <div className="mb-12">
                <label className="block mb-4 text-xl font-semibold">
                    공지사항
                </label>
                <textarea
                    name="content"
                    className="border border-gray-300 rounded-md p-2 pr-10 w-full h-24 focus:outline-none focus:ring-2
                     focus:ring-blue-500 placeholder:text-xs resize-none"
                    rows="3"
                    maxLength={100}
                    placeholder="공지사항을 적어주세요.(100 글자 이내)"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                />
            </div>

            <div className="flex justify-center">
                <button
                    type="submit"
                    className={`w-full text-white
                         bg-blue-600 px-4 py-2 rounded-md mr-2 ${!isFormValid && "opacity-50 cursor-not-allowed"
                        }`}
                    disabled={!isFormValid}
                >
                    스터디 만들기
                </button>
                <button
                    type="button"
                    onClick={() => navigate("/study")}
                    className="w-full border hover:bg-gray-100 px-4 py-2 rounded-md"
                >
                    취소
                </button>
            </div>
        </form>
    );
};

export default CreateStudyForm;
