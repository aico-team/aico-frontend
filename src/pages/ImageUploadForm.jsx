import React, { useEffect, useState } from "react";
import useQuizStore from "../../stores/quizStore";
import "../styles/ImageUploadForm.css";

const ImageUploadForm = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(""); //이미지 프리뷰
  const { uploadQuizImage, isUploading } = useQuizStore();

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && isValidImage(file)) {
      setSelectedFile(file);

      const url = URL.createObjectURL(file);
      setImagePreview(url);
      console.log(url);
    } else {
      alert("지원되지 않는 파일 형식입니다. PNG/JPG/JPEG/WEBP만 가능합니다.");
    }
  };

  //이미지 업로드 후 Blob URL 해제, 메모리 누수 방지
  useEffect(() => {
    if (imagePreview) {
      return () => URL.revokeObjectURL(imagePreview);
    }
  }, [imagePreview]);

  const isValidImage = (file) => {
    const allowedTypes = ["image/png", "image/jpeg", "image/jpg", "image/webp"];
    return allowedTypes.includes(file.type);
  };

  const handleSubmit = async () => {
    if (!selectedFile) return;
    await uploadQuizImage(selectedFile);
  };

  return (
    <div className="image-upload-form">
      <label htmlFor="fileInput" className="upload-box">
        {imagePreview ? (
          <img src={imagePreview} alt="미리보기" className="preview-image" />
        ) : (
          <div className="upload-instruction">
            <span>+</span>
            <p>사진 파일을 업로드 해주세요</p>
            <small>PNG (.png) / JPEG (.jpeg and .jpg) / WEBP (.webp)</small>
          </div>
        )}

        <input
          type="file"
          id="fileInput"
          accept="image/png, image/jpeg, image/jpg, image/webp"
          onChange={handleFileChange}
          hidden
        />
      </label>

      {imagePreview && (
        <div className="submit-section">
          <button onClick={handleSubmit} disabled={isUploading}>
            {isUploading ? "업로드 중..." : "퀴즈 생성하기"}
          </button>
        </div>
      )}
    </div>
  );
};

export default ImageUploadForm;
