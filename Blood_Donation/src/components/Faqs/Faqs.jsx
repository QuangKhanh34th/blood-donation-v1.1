import React from "react";
import styles from "./styles.module.scss";
import FaqItem from "./FaqsItem";
import { Button } from "../Button/Button";

export const Faqs = () => {
  const { faqsContainer, faqsTitle, faqItemContainer } = styles;

  return (
    <div className={faqsContainer}>
      <div className={faqsTitle}>Lưu ý quan trọng</div>

      <div className={faqItemContainer}>
        <FaqItem question="Ai có thể tham gia hiến máu?">
          <ul>
            <li>Nam: ≥ 45 kg</li>
            <li>Nữ: ≥ 45 kg</li>
            <li>Độ tuổi: Từ 18 đến 60 tuổi</li>
            <li>
              Không mắc các bệnh truyền nhiễm như HIV, viêm gan B, viêm gan C,
              và các virus lây qua đường máu
            </li>
            <li>
              Không sử dụng ma túy, rượu bia trong 48 giờ trước khi hiến máu
            </li>
            <li>
              Không mắc các bệnh mãn tính như tim mạch, huyết áp, hen suyễn, hở
              van, dị ứng, dạ dày...
            </li>
            <li>
              Chỉ nên hiến tối đa 250ml - 350ml/lần (tùy thuộc vào tình trạng
              sức khỏe)
            </li>
          </ul>
        </FaqItem>
      </div>

      <div className={faqItemContainer}>
        <FaqItem question="Ai không nên tham gia hiến máu?">
          <ul>
            <li>Người mắc các bệnh truyền nhiễm</li>
            <li>Người có tiền sử bệnh lý nghiêm trọng</li>
            <li>Người đang trong thời gian điều trị bệnh</li>
            <li>Người có hành vi nguy cơ cao lây nhiễm HIV</li>
          </ul>
        </FaqItem>
      </div>

      <div className={faqItemContainer}>
        <FaqItem question="Máu của tôi sẽ được xét nghiệm làm những gì?">
          <ul>
            <li>Xét nghiệm HIV</li>
            <li>Xét nghiệm viêm gan B, C</li>
            <li>Xét nghiệm giang mai</li>
            <li>Xét nghiệm các bệnh truyền nhiễm khác</li>
          </ul>
        </FaqItem>
      </div>
      <Button content="Tìm hiểu thêm" to="/information" />
    </div>
  );
};
