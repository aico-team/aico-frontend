import React, { useEffect, useState } from "react";
import useWrongNoteStore from "../../stores/wrongNoteStore";
import ImageModal from "../components/ImageModal";
import "../styles/WrongNotePage.css";

const WrongNotePage = () => {
  const { wrongQuizzes, fetchWrongQuizzes, deleteWrongQuizzes, isLoading } =
    useWrongNoteStore();

  const [showAnswers, setShowAnswers] = useState({});
  const [showModalUrl, setShowModalUrl] = useState(null);

  useEffect(() => {
    fetchWrongQuizzes();
  }, [fetchWrongQuizzes]);

  const toggleAnswer = (quizId) => {
    setShowAnswers((prev) => ({ ...prev, [quizId]: !prev[quizId] }));
  };

  if (isLoading) return <div>불러오는 중...</div>;
  if (wrongQuizzes.length === 0) return <div>저장된 오답이 없습니다.</div>;

  return (
    <div className="wrong-note-page">
      <h1>📋 오답 노트</h1>
      {wrongQuizzes.map((file, fileIdx) => (
        <div key={fileIdx} className="wrong-file-section">
          <div className="file-info">
            <p
              className="file-name clickable"
              onClick={() => setShowModalUrl(file.imageUrl)}
            >
              📁 {file.originalFileName}
            </p>
          </div>

          <div className="wrong-quizzes-list">
            {file.quizzes.map((quiz) => (
              <div key={quiz.id} className="wrong-quiz-item">
                <p className="quiz-question">{quiz.quiz}</p>
                <p className="quiz-date">
                  저장일: {new Date(quiz.createdAt).toLocaleDateString()}
                </p>

                <div className="show-bttn-wrapper">
                  <button
                    className="toggle-answer-bttn"
                    onClick={() => toggleAnswer(quiz.id)}
                  >
                    {showAnswers[quiz.id] ? "정답 숨기기" : "정답 보기"}
                  </button>
                  {showAnswers[quiz.id] && (
                    <div className="quiz-answer-box">
                      <p className="quiz-answer">{quiz.answer}</p>
                    </div>
                  )}
                </div>

                <div className="answer-actions">
                  <button
                    className="delete-bttn"
                    onClick={() => {
                      const confirmDelete =
                        window.confirm("정말 삭제하시겠습니까?");
                      if (confirmDelete) {
                        deleteWrongQuizzes(quiz.id);
                      }
                    }}
                  >
                    삭제
                  </button>
                </div>
              </div>
            ))}

            {showModalUrl && (
              <ImageModal
                imageUrl={showModalUrl}
                onClose={() => setShowModalUrl(null)}
              />
            )}
          </div>
        </div>
      ))}{" "}
    </div>
  );
};

export default WrongNotePage;
