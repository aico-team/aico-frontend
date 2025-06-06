import React from "react";
import ImageUploadForm from "./ImageUploadForm";

const QuizPage = () => {
  return (
    <div>
      <h1>퀴즈</h1>
      <div className="upload-image">
        <ImageUploadForm />
      </div>
    </div>
  );
};

export default QuizPage;
