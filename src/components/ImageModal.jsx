import React from "react";
import ReactDOM from "react-dom";

/**
 * 이미지 모달 컴포넌트
 * @param {string} imageUrl - 보여줄 이미지 URL
 * @param {Function} onClose - 모달 닫기 함수
 */

const ImageModal = ({ imageUrl, onClose }) => {
  const modalRoot = document.getElementById("modal-root");

  if (!modalRoot) {
    console.warn(
      "modal-root가 없습니다. index.html에 <div id='modal-root'></div>를 추가하세요."
    );
    return null;
  }

  return ReactDOM.createPortal(
    <div className="image-modal-overlay" onClick={onClose}>
      <img
        src={imageUrl}
        alt="퀴즈 이미지"
        className="image-modal-content"
        onClick={(e) => e.stopPropagation()}
      />
    </div>,
    document.getElementById("modal-root")
  );
};

export default ImageModal;
