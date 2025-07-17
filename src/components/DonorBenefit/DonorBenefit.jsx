import React, { useState } from "react";
import styles from "./styles.module.scss";
import benefitImage from "../../assets/benefit_image.jpg"; // ảnh minh họa

const DonorBenefits = () => {
  const { title, description, rightTitle } = styles;

  const [index, setIndex] = useState(0);

  const handleNext = () => setIndex((prev) => (prev === 0 ? 1 : 0));
  const handlePrev = () => setIndex((prev) => (prev === 0 ? 1 : 0));

  return (
    <div className={styles["donor-benefits-container"]}>
      <div className={styles["left-panel"]}>
        <h2 className={title}>Quyền lợi của người hiến máu</h2>
        <p className={description}>
          Người hiến máu tình nguyện sẽ được những quyền lợi sau:
        </p>
        <img
          src={benefitImage}
          alt="Lợi ích hiến máu"
          className={styles["image"]}
        />
      </div>

      <div className={styles["right-panel"]}>
        <div className={styles["content-wrapper"]}>
          {index === 0 && (
            <>
              <h3 className={rightTitle}>ĐƯỢC BỒI DƯỠNG TRỰC TIẾP</h3>
              <ul className={styles.list}>
                <li>
                  Ăn nhẹ, nước uống tại chỗ: tương đương 1 chai trà xanh không độ,
                  1 hộp cháo 66g, 1 hộp bánh Goute 35,5g.
                </li>
                <li>
                  Hỗ trợ chi phí đi lại (bằng tiền mặt): <strong>50.000đ</strong>
                </li>
                <li>
                  🎁 Nhận quà tặng giá trị tương đương:
                  <ul className={styles.subList}>
                    <li>100.000đ khi hiến máu 250ml</li>
                    <li>150.000đ khi hiến máu 350ml</li>
                    <li>180.000đ khi hiến máu 450ml</li>
                  </ul>
                </li>
              </ul>
            </>
          )}

          {index === 1 && (
            <>
              <h3 className={rightTitle}>
                ĐƯỢC CẤP GIẤY CHỨNG NHẬN HIẾN MÁU TÌNH NGUYỆN
              </h3>
              <ul className={styles.list}>
                <li>
                  Giấy chứng nhận hiến máu tình nguyện được cấp cho người hiến máu
                  tình nguyện sau khi hiến máu.
                </li>
                <li>
                  Giấy chứng nhận này có giá trị trong việc xác nhận người hiến
                  máu đã tham gia hoạt động hiến máu tình nguyện.
                </li>
                <li>
                  Giấy chứng nhận hiến máu tình nguyện có thể được sử dụng để nhận
                  các quyền lợi khác như ưu đãi trong việc khám chữa bệnh, học
                  tập, công tác, v.v.
                </li>
              </ul>
            </>
          )}
        </div>

        <div className={styles["button-wrapper"]}>
          <button onClick={handlePrev} className={styles.arrow}>←</button>
          <button onClick={handleNext} className={styles.arrow}>→</button>
        </div>
      </div>
    </div>
  );
};

export default DonorBenefits;
