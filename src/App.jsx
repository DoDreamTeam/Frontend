import React from 'react';
import { Route, Routes } from 'react-router-dom';
import {
  AddQuestion,
  AddToStudy,
  BookMain,
  BookPage,
  CreateBook,
  CreateStudy,
  EditBook,
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
} from './pages';
import Layout from './components/layouts/Layout';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/authentication/ProtectedRoute';

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
          <Route path="/book/:id" element={<BookPage />} />
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
            path="/book/:id/edit"
            element={<ProtectedRoute element={<EditBook />} isMemberOnly />}
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
            path="/book/:bookId/questions/:questionId/submit/:id"
            element={<ProtectedRoute element={<SubmitPage />} isMemberOnly />}
          />
          <Route
            path="/book/:bookId/questions/:questionId/submit/:id/add"
            element={<ProtectedRoute element={<AddToStudy />} isMemberOnly />}
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
            path="/study/:studyId/:userAnswerId"
            element={
              <ProtectedRoute element={<StudyQuestionPage />} isMemberOnly />
            }
          />
          <Route
            path="/study/:studyId/admin"
            element={
              <ProtectedRoute element={<StudyAdminPage />} isMemberOnly />
            }
          />
          <Route
            path="/mybooks"
            element={<ProtectedRoute element={<MyBooks />} isMemberOnly />}
          />
          <Route
            path="/myquestions"
            element={<ProtectedRoute element={<MyQuestions />} isMemberOnly />}
          />
          <Route
            path="/mystudies"
            element={<ProtectedRoute element={<MyStudies />} isMemberOnly />}
          />
        </Routes>
      </Layout>
    </AuthProvider>
  );
};

export default App;
