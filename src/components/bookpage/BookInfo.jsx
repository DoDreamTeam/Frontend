import React from "react";
import defaultProfile from "../../assets/default_profile.jpg";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../context/UserProvider";
import { MdEdit, MdDelete } from "react-icons/md";
import BookmarkButton from "../ui/BookmarkButton";
import useModal from "../../hooks/useModal";
import useAlert from "../../hooks/useAlert";

const BookInfo = ({ bookData, onBookmarkToggle }) => {
  const { userInfo } = useUser();
  const navigate = useNavigate();
  const { openModal, closeModal, Modal } = useModal();
  const { showAlert, Alert } = useAlert();

  const { title, username, userProfile, userId, bookmarked } = bookData;

  // 문제집 삭제
  const handleDelete = async () => {
    try {
      const response = await api.delete(`/books/${bookData.id}`);
      if (response.status === 204) {
        navigate("/book");
        closeModal();
        showAlert("정상적으로 문제집이 삭제되었습니다.");
      }
    } catch (error) {
      console.error("Delete Book Error: ", error);
    }
  };

  return (
    <div className="flex justify-between items-start w-full mb-16">
      <div className="flex flex-col">
        <div className="flex items-center mb-6">
          <div className="mr-2 text-3xl font-semibold">{title}</div>
          {userInfo?.userName !== username && (
            <BookmarkButton
              bookId={bookData.id}
              isBookmarked={bookmarked}
              onBookmarkToggle={onBookmarkToggle}
              bookOwnerName={username}
            />
          )}
          {userInfo?.userName === username && (
            <div className="flex justify-center mt-2">
              <button className="mx-1">
                <MdEdit
                  className="hover:text-blue-400"
                  onClick={() => navigate(`/book/${bookData.id}/edit`)}
                />
              </button>
              <button className="mx-1">
                <MdDelete className="hover:text-blue-400" onClick={openModal} />
              </button>
            </div>
          )}
        </div>
        <div className="flex items-center">
          <img
            src={userProfile || defaultProfile}
            alt="Profile"
            className="w-8 h-8 rounded-full cursor-pointer border-2 border-gray-300 mr-2"
          />
          <div
            className="hover:underline cursor-pointer"
            onClick={() => navigate(`/mypage/${userId}`)}
          >
            {username}
          </div>
        </div>
      </div>
      {userInfo?.userName === username && (
        <div className="ml-auto">
          <button
            className="bg-blue-400 text-white text-xs py-2 px-2 rounded hover:bg-blue-600"
            onClick={() => navigate(`/book/${bookData.id}/questions/add`)}
          >
            문제 추가하기
          </button>
        </div>
      )}

      {/* 삭제 모달 */}
      <Modal style="w-120 text-center">
        <div className="text-2xl font-semibold m-6">
          정말 문제집을 삭제하시겠습니까?
        </div>
        <div className="text-xs text-gray-500">
          삭제하면 더 이상 이 문제집을 풀던 사람들이 이용할 수 없습니다.
        </div>
        <div className="flex justify-around mt-4 w-full">
          <button
            className="w-3/4 bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 m-4"
            onClick={handleDelete}
          >
            삭제
          </button>
          <button
            className="w-3/4 bg-gray-200 text-black py-2 px-4 rounded hover:bg-gray-400 m-4"
            onClick={closeModal}
          >
            취소
          </button>
        </div>
      </Modal>

      {/* 삭제 확인 alert */}
      <Alert />
    </div>
  );
};

export default BookInfo;
