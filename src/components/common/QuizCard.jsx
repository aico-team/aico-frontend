import React, { useState, useEffect } from "react";
import { useSwiper } from "swiper/react";
import ImageModal from "../ImageModal";
import "../../styles/QuizCard.css";

const QuizCard = ({ index, quiz, answer, imageUrl }) => {
  const [userInput, setUserInput] = useState("");
  const [showImage, setShowImage] = useState();
  const [showAnswer, setShowAnswer] = useState();
  const swiper = useSwiper();

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") {
        setShowImage(false);
      }
    };

    if (showImage) {
      window.addEventListener("keydown", handleEsc);
    }

    return () => {
      window.removeEventListener("keydown", handleEsc);
    };
  }, [showImage]);

  const handleShowImage = () => {
    setShowImage((prev) => !prev);
  };

  const handleShowAnswer = () => {
    setShowAnswer((prev) => !prev);
  };

  const handleCorrect = () => {
    alert("🎉 정답입니다!");
    bttnReset();
  };

  const handleWrong = () => {
    alert("📌 오답노트에 저장되었습니다!");
    bttnReset();
  };

  const bttnReset = () => {
    setShowAnswer(false);
    setUserInput("");
    swiper.slideNext();
  };

  return (
    <div className="quiz-card">
      <div className="quiz-num">{`Quiz${index}`}</div>
      <p className="quiz-question">{quiz}</p>

      <input
        className="input-ans"
        type="text"
        placeholder="정답을 입력하세요."
        value={userInput}
        onChange={(e) => setUserInput(e.target.value)}
      />
      <div className="showBttn-wrapper">
        <button className="show-img-bttn" onClick={handleShowImage}>
          이미지 보기
        </button>
        <button className="show-ans-bttn" onClick={handleShowAnswer}>
          {showAnswer ? "정답 숨기기" : "정답 보기"}
        </button>
      </div>

      {showImage && (
        <ImageModal imageUrl={imageUrl} onClose={() => setShowImage(false)} />
      )}

      {showAnswer && (
        <>
          <p className="quiz-answer">
            정답: <strong>{answer}</strong>
          </p>
          <div className="answer-actions">
            <button className="correct-bttn" onClick={handleCorrect}>
              정답
            </button>
            <button className="wrong-bttn" onClick={handleWrong}>
              보관
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default QuizCard;
