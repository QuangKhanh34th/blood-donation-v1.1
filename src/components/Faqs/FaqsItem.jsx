import React, { useState } from "react";
import styles from "./styles.module.scss";

const FaqItem = ({ question, children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleItem = () => setIsOpen(!isOpen);

  return (
    <div className={styles.faqItem}>
      <div className={styles.title} onClick={toggleItem}>
        <span>{question}</span>
        <svg
          className={`${styles.arrowIcon} ${isOpen ? styles.rotate : ""}`}
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M6 9l6 6 6-6"
            stroke="#333"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      <div className={`${styles.content} ${isOpen ? styles.open : ""}`}>
        {children}
      </div>
    </div>
  );
};

export default FaqItem;
