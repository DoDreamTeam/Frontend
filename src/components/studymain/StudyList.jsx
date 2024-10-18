import React, { useState } from 'react';
import usePagination from '../../hooks/usePagination';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import StudyCard from '../ui/StudyCard';

const StudyList = ({ studys }) => {
    const [category, setCategory] = useState("전체");
    const [sortOrder, setSortOrder] = useState("최신순");
    const itemsPerPage = 12;            // 한 페이지에 12개의 아이템

    // 필터링된 문제집 리스트
    const filteredStudys = studys
        .filter((study) => {
            if (category === "전체") return true;
            return study.category === category;
        })
        .sort((a, b) => {
            if (sortOrder === "최신순") {
                return new Date(b.createdAt) - new Date(a.createdAt);
            } else {
                return b.participants - a.participants;
            }
        });
    
    const {
        currentPage,
        currentItems,
        totalPages,
        paginate,
        goToPrevPage,
        goToNextPage,
    } = usePagination(filteredStudys, itemsPerPage);

    return (
        <div>
            {/* 카테고리 필터 버튼 */}
            <div className="flex mb-4">
                {["전체", "CS", "자격증", "기타"].map((cat) => (
                    <button
                        key={cat}
                        className={`py-2 px-4 mx-1 rounded ${category === cat ? "font-semibold" : "text-gray-400"
                            }`}
                        onClick={() => setCategory(cat)}
                    >
                        {cat}
                    </button>
                ))}
            </div>

            {/* 스터디 카드 리스트 */}
            <div className="grid grid-cols-4 gap-4">
                {currentItems.map((study) => (
                    <StudyCard
                        key={study.id}
                        title={study.title}
                        creator={study.creator}
                        participants={study.participants}
                        category={study.category}
                    />
                ))}
            </div>

            {/* 페이지네이션 */}
            <div className="flex justify-center mt-8 mb-10">
                <button onClick={goToPrevPage} disabled={currentPage === 1}>
                    <FaChevronLeft className="text-gray-500 text-sm" />
                </button>
                {Array.from({ length: totalPages }).map((_, index) => (
                    <button
                        key={index}
                        onClick={() => paginate(index + 1)}
                        className={`mx-1 ${index + 1 === currentPage
                                ? "font-bold text-blue-400"
                                : "text-gray-500"
                            }`}
                    >
                        {index + 1}
                    </button>
                ))}
                <button onClick={goToNextPage} disabled={currentPage === totalPages}>
                    <FaChevronRight className="text-gray-500 text-sm" />
                </button>
            </div>
        </div>
    );
};

export default StudyList;


