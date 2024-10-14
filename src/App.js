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
  MyBooks,
  MyPage,
  MyQuestions,
  MyStudies,
  QuestionPage,
  StudyAdminPage,
  StudyMain,
  StudyPage,
  StudyQuestionPage,
  SubmitPage,
} from "./pages";
import Layout from "./components/layouts/Layout";

const App = () => {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Main />} />

        {/* 문제집 */}
        <Route path="/book" element={<BookMain />} />
        <Route path="/book/create" element={<CreateBook />} />
        <Route path="/book/:id" element={<BookPageNoQuestion />} />
        <Route path="/book/:id/questions" element={<BookPageWithQuestion />} />
        <Route
          path="/book/:id/questions/:questionId"
          element={<QuestionPage />}
        />
        <Route path="/submit/:id" element={<SubmitPage />} />
        <Route path="/book/:id/questions/add" element={<AddQuestion />} />
        <Route
          path="/book/:id/questions/:questionId/edit"
          element={<EditQuestion />}
        />

        {/* 스터디 */}
        <Route path="/study" element={<StudyPage />} />
        <Route path="/study/create" element={<CreateStudy />} />
        <Route path="/study/:studyId" element={<StudyMain />} />
        <Route
          path="/study/:studyId/:memberId"
          element={<StudyQuestionPage />}
        />
        <Route path="/study/:studyId/admin" element={<StudyAdminPage />} />

        {/* 마이페이지 */}
        <Route path="/:userId" element={<MyPage />} />
        <Route path="/:userId/books" element={<MyBooks />} />
        <Route path="/:userId/questions" element={<MyQuestions />} />
        <Route path="/:userId/studies" element={<MyStudies />} />
      </Routes>
    </Layout>
  );
};

export default App;
