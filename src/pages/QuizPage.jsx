import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import useQuizStore from "../../stores/quizStore";
import ImageUploadForm from "./ImageUploadForm";
import QuizCard from "../components/common/QuizCard";
import "swiper/css";
import "swiper/css/pagination";

const QuizPage = () => {
  const { quizzes } = useQuizStore();
  return (
    <div className="quiz-page">
      <h1>📝 퀴즈</h1>
      <div className="upload-image">
        <ImageUploadForm />
      </div>
      <div className="quiz-card">
        {quizzes.length > 0 && (
          <Swiper
            modules={[Pagination]}
            pagination={{ clickable: true }}
            spaceBetween={20}
            slidesPerView={1}
          >
            {quizzes.map((quizItem, idx) => (
              <SwiperSlide key={idx}>
                <QuizCard
                  index={idx + 1}
                  quiz={quizItem.quiz}
                  answer={quizItem.answer}
                  imageUrl={quizItem.imageUrl}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </div>
    </div>
  );
};

export default QuizPage;
