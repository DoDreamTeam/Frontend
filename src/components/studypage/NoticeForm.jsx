import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

const NoticeForm = ({ noticeData, studyId, userRole }) => {
    const [content, setContent] = useState(noticeData?.content || "");
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: async (content) => {
            const response = await api.post(`/study/${studyId}/notice`, {
                notice: content,
            });
            return response.data;
        },
        onSuccess: () => {
            // 공지사항 작성 성공 후 쿼리 무효화
            queryClient.invalidateQueries(["notice", studyId]);
        },
        onError: () => {
            console.log("NOTICE ERROR!");
        },
    });

    const handleNoticeSubmit = () => {
        if (content.trim().length <= 200) {
            mutation.mutate(content);
        } else {
            alert("글자수는 200자 이하여야 합니다.");
        }
    }

    const isAuthorized = userRole === "ROLE_LEADER";

    return (
        <div className="bg-blue-100 p-4 rounded-lg shadow-md">
            <div className="flex items-center justify-between mb-2">
                <div className="flex items-center">
                    <span className="text-red-500 mr-2">📌</span>
                    <h2 className="text-lg font-semibold text-gray-800">공지사항 확인하세요.</h2>
                </div>
                {isAuthorized && (
                    <div className="flex items-center space-x-2">
                        <button className="text-gray-500 hover:text-gray-800" onClick={handleNoticeSubmit}>✏️</button>
                        <button className="text-gray-500 hover:text-gray-800" onClick={() => setContent("")}>🗑️</button>
                    </div>
                )}
            </div>

            <div className="bg-white border border-blue-400 p-4 rounded-lg text-gray-700">
                <textarea
                    className="w-full h-20 p-2 border rounded"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    readOnly={!isAuthorized}
                    maxLength="200"
                />
                <p className="text-sm text-gray-600 mt-1">조건: 글자수 200자 제한, 방장만 입력 가능, 공지사항은 1개뿐</p>
            </div>

            <div className="mt-2">
                <button className="text-blue-500 text-sm hover:underline">&gt; 댓글[0]</button>
            </div>
        </div>
    );
}

export default NoticeForm;