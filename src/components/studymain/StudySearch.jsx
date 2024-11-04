import React, { useState } from 'react';
import SearchInput from '../ui/SearchInput';
import api from '../../api/api';

const StudySearch = ({ setSearchResults }) => {
    const [keyword, setKeyword] = useState([]);

    const handleSearchKeyword = (e) => {
        setKeyword(e.target.value);
    }

    const handleSearch = async () => {
        if (keyword.trim()) {
            const response = await api.get(`/search?keyword=${keyword}`);
            setSearchResults(response.data.content)
        } else {
            setSearchResults(null);
        }
    };

    return (
        <div className="w-full flex items-center">
            <SearchInput
                value={keyword}
                onChange={handleSearchKeyword}
                onSearch={handleSearch}
                placeholder="스터디 제목을 검색할 수 있습니다."
                className="flex-1" // 추가: flex-grow
            />
        </div>
    );
};

export default StudySearch;