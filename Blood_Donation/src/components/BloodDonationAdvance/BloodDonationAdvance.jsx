import React from "react";
import styles from "./styles.module.scss";

export const BloodDonationAdvance = () => {
  const {
    container,
    title,
    content,
    grid,
    card,
    icon,
    cardTitle,
    description,
  } = styles;

  const sections = [
    {
      icon: "✅",
      title: "Nên:",
      items: [
        "Ăn nhẹ và uống nước đầy đủ (500-1000ml) trước khi hiến máu.",
        "Đề xuất mức đường trong máu không quá thấp (4-6 mmol/l).",
        "Nằm hoặc ngồi nghỉ ngơi 10 phút sau khi hiến máu.",
        "Nắm giữ tư thế thẳng, không cúi đầu quá mức.",
        "Chườm lạnh nếu cảm thấy chóng mặt, buồn nôn.",
        "Chườm ấm nếu cảm thấy lạnh, run tay.",
      ],
    },
    {
      icon: "❌",
      title: "Không nên:",
      items: [
        "Uống rượu, trà đặc, cà phê trong vòng 24h trước khi hiến máu.",
        "Làm việc nặng nhọc hoặc vận động mạnh sau khi hiến máu.",
      ],
    },
    {
      icon: "⚠️",
      title: "Lưu ý:",
      items: [
        "Nên ăn uống đầy đủ trước khi hiến máu.",
        "Lượng máu hiến mỗi lần không quá 250ml - 350ml.",
        "Liên hệ nhân viên y tế nếu có dấu hiệu bất thường sau khi hiến máu.",
      ],
    },
  ];

  return (
    <div className={container}>
      <h1 className={title}>Nhiều lợi ích khi hiến máu</h1>
      <div className={content}>
        <div className={grid}>
          {sections.map((section, index) => (
            <div key={index} className={card}>
              <span className={icon}>{section.icon}</span>
              <h2 className={cardTitle}>{section.title}</h2>
              <ul className={description}>
                {section.items.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
