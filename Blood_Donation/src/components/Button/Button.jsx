import React from "react";
import styles from "./styles.module.scss";
import { useNavigate } from "react-router-dom";

export const Button = ({ content = "Tìm kiếm", to, onClick }) => {
  const { buttonContainer, button } = styles;
  const navigate = useNavigate();
  const handleClick = async () => {
    if (onClick) {
      await onClick(); //  gọi logic từ ngoài (validate, điều hướng)
    } else if (to) {
      navigate(to); // chỉ fallback khi không có onClick
    }
  };

  return (
    <div className={buttonContainer}>
      <button className={button} onClick={handleClick}>
        {content}
      </button>
    </div>
  );
};
