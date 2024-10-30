import React from "react";
import { Route, Routes } from "react-router-dom";
import {
  AddQuestion,
  BookMain,
  BookPageNoQuestion,
  BookPageWithQuestion,
  CreateBook,
  CreateStudy,
  EditQuestion,
  Main,
  MainSearch,
  MyBooks,
  MyPage,
  MyQuestions,
  MyStudies,
  OAuthVertification,
  QuestionPage,
  StudyAdminPage,
  StudyMain,
  StudyPage,
  StudyQuestionPage,
  SubmitPage,
} from "./pages";
import Layout from "./components/layouts/Layout";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/authentication/ProtectedRoute";

const App = () => {
  return (
    <AuthProvider>
      <Layout>
        <Routes>
          {/* 비회원도 접근 가능 */}
          <Route path="/" element={<Main />} />
          <Route path="/search" element={<MainSearch />} />
          <Route path="/oauth/:provider" element={<OAuthVertification />} />
          <Route path="/book" element={<BookMain />} />
          <Route
            path="/book/:id/questions"
            element={<BookPageWithQuestion />}
          />
          <Route
            path="/book/:id/questions/:questionId"
            element={<QuestionPage />}
          />
          <Route path="/study" element={<StudyMain />} />
          <Route path="/mypage/:userId" element={<MyPage />} />

          {/* 회원만 접근 가능*/}
          <Route
            path="/book/create"
            element={<ProtectedRoute element={<CreateBook />} isMemberOnly />}
          />
          <Route
            path="/book/:id"
            element={
              <ProtectedRoute element={<BookPageNoQuestion />} isMemberOnly />
            }
          />
          <Route
            path="/book/:id/questions/add"
            element={<ProtectedRoute element={<AddQuestion />} isMemberOnly />}
          />
          <Route
            path="/book/:id/questions/:questionId/edit"
            element={<ProtectedRoute element={<EditQuestion />} isMemberOnly />}
          />
          <Route
            path="/submit/:id"
            element={<ProtectedRoute element={<SubmitPage />} isMemberOnly />}
          />
          <Route
            path="/study/create"
            element={<ProtectedRoute element={<CreateStudy />} isMemberOnly />}
          />
          <Route
            path="/study/:studyId"
            element={<ProtectedRoute element={<StudyPage />} isMemberOnly />}
          />
          <Route
            path="/study/:studyId/:memberId"
            element={
              <ProtectedRoute element={<StudyQuestionPage />} isMemberOnly />
            }
          />
          <Route
            path="/:userId/books"
            element={<ProtectedRoute element={<MyBooks />} isMemberOnly />}
          />
          <Route
            path="/:userId/questions"
            element={<ProtectedRoute element={<MyQuestions />} isMemberOnly />}
          />
          <Route
            path="/:userId/studies"
            element={<ProtectedRoute element={<MyStudies />} isMemberOnly />}
          />

          {/* 추후 수정 예정 : 스터디 관리자만 접근 가능 */}
          <Route
            path="/study/:studyId/admin"
            element={
              <ProtectedRoute element={<StudyAdminPage />} isMemberOnly />
            }
          />
        </Routes>
      </Layout>
    </AuthProvider>
  );
};

export default App;
