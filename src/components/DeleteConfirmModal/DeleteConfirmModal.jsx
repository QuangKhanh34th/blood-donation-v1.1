import React, { useEffect, useRef, useState } from "react";
import { Modal } from "antd";
import styles from "./styles.module.scss";

const {
  modalContent,
  footerBtn,
  noButton,
  yesButton,
  footerButtons,
    modalTitle,
} = styles;

const DeleteConfirmModal = ({ visible, onCancel, onConfirm }) => {
  const [countdown, setCountdown] = useState(5);
  const countdownRef = useRef(null);

  useEffect(() => {
    if (visible) {
      setCountdown(5);
      countdownRef.current = setInterval(() => {
        setCountdown((prev) => {
          if (prev === 1) {
            clearInterval(countdownRef.current);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => clearInterval(countdownRef.current);
  }, [visible]);

  return (
    <Modal className={modalTitle}
      title="Xác nhận xóa"
      open={visible}
      onCancel={onCancel}
      footer={null}
      
    >
      <p className={modalContent}>
        Bạn có chắc chắn muốn xóa dữ liệu này không?
      </p>
      <div className={footerButtons}>
        <button
          onClick={onCancel}
          className={`${footerBtn} ${noButton}`}
        >
          Không
        </button>
        <button
          onClick={onConfirm}
          disabled={countdown > 0}
          className={`${footerBtn} ${yesButton}`}
        >
          {countdown > 0 ? `Đợi ${countdown}s` : "Xóa"}
        </button>
      </div>
    </Modal>
  );
};

export default DeleteConfirmModal;
