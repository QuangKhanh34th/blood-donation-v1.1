import React, { useState } from "react";
import styles from "./styles.module.scss";
import { Button } from "../../components/Button/Button";

export const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // Clear error as user types
    setErrors({ ...errors, [name]: "" });
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) {
      newErrors.name = "Vui lòng nhập họ và tên";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = "Vui lòng nhập email";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Email không hợp lệ";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Vui lòng nhập lời nhắn";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      alert("Gửi thành công!");
      // Reset form nếu cần
      setFormData({ name: "", email: "", message: "" });
      setErrors({ name: "", email: "", message: "" });
    }
  };

  const isFormValid =
    formData.name.trim() &&
    formData.email.trim() &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email) &&
    formData.message.trim();

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.left}>
          <h2>Liên hệ</h2>
          <ul className={styles.infoList}>
            <li>
              <span>Email:</span>
              <p>gmv@intelin.vn</p>
            </li>
            <li>
              <span>TT Hiến Máu Nhân Đạo:</span>
              <p>028 3868 5509</p>
              <p>028 3868 5507</p>
            </li>
            <li>
              <span>Bệnh viện BTH:</span>
              <p>028 39571342</p>
              <p>028 39557858</p>
            </li>
            <li>
              <span>TT truyền máu Chợ Rẫy:</span>
              <p>028 39555885</p>
            </li>
          </ul>
        </div>

        <div className={styles.right}>
          <h2>Gửi lời nhắn</h2>
          <p className={styles.desc}>
            Mọi thắc mắc về hiến máu tình nguyện, vui lòng gửi email tới{" "}
            <b>gmv@intelin.vn</b> hoặc điền thông tin bên dưới:
          </p>

          <form className={styles.form} onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              placeholder="Họ và tên"
              value={formData.name}
              onChange={handleChange}
              className={errors.name ? styles.inputError : ""}
            />
            {errors.name && <span className={styles.error}>{errors.name}</span>}

            <input
              type="text" // <-- Đổi từ "email" sang "text" để tránh cảnh báo mặc định của trình duyệt
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className={`${errors.email ? styles.inputError : ""}`}
            />
            {errors.email && (
              <span className={styles.error}>{errors.email}</span>
            )}

            <textarea
              name="message"
              placeholder="Lời nhắn"
              rows="4"
              value={formData.message}
              onChange={handleChange}
              className={errors.message ? styles.inputError : ""}
            />
            {errors.message && (
              <span className={styles.error}>{errors.message}</span>
            )}

            <Button
              content="Gửi"
              type="submit"
              className={`${styles.submitButton} ${!isFormValid ? styles.disabled : ""}`}
              disabled={!isFormValid}
            />
          </form>
        </div>
      </div>
    </div>
  );
};
