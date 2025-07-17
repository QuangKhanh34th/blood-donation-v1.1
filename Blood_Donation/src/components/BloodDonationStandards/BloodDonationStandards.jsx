import React from 'react';
import styles from './styles.module.scss';

export const BloodDonationStandards = () => {
  const { bloodDonationContainer, bloodDonationTitle, bloodDonationContent, bloodDonationImagePlaceholder, heartPlaceholder, bloodDonationStandardsGrid, standardCard, standardIcon, standardTitle, standardDescription } = styles;
  const standards = [
    {
      icon: "🌐",
      title: "Mạng lưới máu để cứu người",
      description: "Khỏe mạnh, không mắc các bệnh truyền nhiễm như HIV, viêm gan B, viêm gan C, và các virus lây qua đường máu"
    },
    {
      icon: "🍷",
      title: "Không sử dụng ma túy, rượu bia",
      description: "Trong 48 giờ trước khi hiến máu"
    },
    {
      icon: "⚖️",
      title: "Cân nặng",
      description: "Nam: ≥ 45 kg  Nữ: ≥ 45 kg"
    },
    {
      icon: "👴",
      title: "Độ tuổi",
      description: "Từ 18 đến 60 tuổi"
    },
    {
      icon: "❤️",
      title: "Sức khỏe",
      description: "Không mắc các bệnh mãn tính như tim mạch, huyết áp, hen suyễn, hở van, dị ứng, dạ dày..."
    },
    {
      icon: "💉",
      title: "Lượng máu hiến",
      description: "Chỉ nên hiến tối đa 250ml - 350ml/ lần (tùy thuộc vào tình trạng sức khỏe)"
    },
    {
      icon: "⏳",
      title: "Thời gian giữa các lần hiến",
      description: "Kể từ lần hiến máu gần nhất, phải cách ít nhất 12 tuần đối với Nam và Nữ"
    },
    {
      icon: "🧪",
      title: "Kiểm tra trước khi hiến",
      description: "Kiểm tra test nhanh âm tính với các bệnh như HIV, viêm gan B nguy hiểm..."
    }
  ];

  return (
    <div className={bloodDonationContainer}>
      <h1 className={bloodDonationTitle}>Tiêu chuẩn tham gia hiến máu</h1>
      <div className={bloodDonationContent}>
        <div className={bloodDonationImagePlaceholder}>
          <span className={heartPlaceholder}>❤️</span>
        </div>
        <div className={bloodDonationStandardsGrid}>
          {standards.map((standard, index) => (
            <div key={index} className={standardCard}>
              <span className={standardIcon}>{standard.icon}</span>
              <h2 className={standardTitle}>{standard.title}</h2>
              <p className={standardDescription}>{standard.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};