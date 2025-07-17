import React from "react";
import styles from "./styles.module.scss";
import NewsForm from "../../components/NewsForm/NewsForm";
import { useNavigate } from "react-router-dom";
import news1 from "../../assets/news1.png";
import news2 from "../../assets/news2.png";
import news3 from "../../assets/news3.png";
import news4 from "../../assets/news4.png";
import news5 from "../../assets/news5.png";
import news6 from "../../assets/news6.png";
import news7 from "../../assets/news7.png";
import news8 from "../../assets/news8.png";
import news9 from "../../assets/news9.png";
import news10 from "../../assets/news10.png";
import news11 from "../../assets/news11.png";
import news12 from "../../assets/news12.png";
import ScrollToTopButton from "../../components/ScrollToTopButton/ScrollToTopButton";

export const News = () => {
  const { container, list } = styles;
  const navigate = useNavigate();

  const newsData = [
    {
      id: 1,
      image: news1,
      title: "Hiến máu nhân đạo tại Hà Nội",
      summary: "Sự kiện hiến máu thu hút hơn 500 người tham gia...",
    },
    {
      id: 2,
      image: news2,
      title: "Thành phố Hồ Chí Minh tổ chức Ngày hội đỏ",
      summary: "Ngày hội hiến máu được tổ chức tại Nhà Văn hóa Thanh Niên...",
    },
    {
      id: 3,
      image: news3,
      title: "Sinh viên ĐH Bách Khoa tham gia hiến máu hè 2025",
      summary:
        "Hơn 300 sinh viên đăng ký hiến máu trong chiến dịch hè tình nguyện...",
    },
    {
      id: 4,
      image: news4,
      title: "Tiếp sức mùa thi kết hợp hiến máu tại TP.HCM",
      summary:
        "Tình nguyện viên không chỉ hỗ trợ sĩ tử mà còn tích cực tham gia hiến máu...",
    },
    {
      id: 5,
      image: news5,
      title: "Ngày hội hiến máu vì sức khỏe cộng đồng",
      summary:
        "Khám bệnh miễn phí và tiếp nhận gần 600 đơn vị máu từ người dân...",
    },
    {
      id: 6,
      image: news6,
      title: "Hiến máu tại bãi biển Mỹ Khê thu hút đông đảo du khách",
      summary:
        "Chiến dịch hiến máu kết hợp bảo vệ môi trường gây ấn tượng mạnh...",
    },
    {
      id: 7,
      image: news7,
      title: "Gây quỹ và hiến máu ủng hộ trẻ em vùng lũ",
      summary:
        "Sự kiện nhân ái thu hút hàng ngàn người tham gia chia sẻ giọt máu đào...",
    },
    {
      id: 8,
      image: news8,
      title: "Tổ chức lớp học tuyên truyền về hiến máu cho trẻ em",
      summary:
        "Giáo dục sớm về tinh thần nhân đạo và lòng yêu thương cộng đồng...",
    },
    {
      id: 9,
      image: news9,
      title: "Ngày hội văn hóa kết hợp vận động hiến máu",
      summary:
        "Hoạt động giao lưu và kêu gọi hiến máu trong cộng đồng dân tộc thiểu số...",
    },
    {
      id: 10,
      image: news10,
      title: "Cuộc thi tuyên truyền về hiến máu cho thanh thiếu niên",
      summary:
        "Khuyến khích giới trẻ lan tỏa thông điệp 'Một giọt máu - Một tấm lòng'...",
    },
    {
      id: 11,
      image: news11,
      title: "Chương trình 'Giọt hồng yêu thương' tại miền Tây",
      summary:
        "Hơn 700 người dân vùng sông nước tham gia hiến máu cứu người...",
    },
    {
      id: 12,
      image: news12,
      title: "Hiến máu nhân đạo tại trường THPT Nguyễn Du",
      summary:
        "Học sinh lớp 12 lần đầu tham gia hiến máu, lan tỏa thông điệp sẻ chia...",
    },
  ];

  return (
    <div className={container}>
      <div className={list}>
        {newsData.map((news) => (
          <NewsForm
            key={news.id}
            image={news.image}
            title={news.title}
            summary={news.summary}
            onClick={() => navigate(`/news/${news.id}`)}
          />
        ))}
      </div>
      <ScrollToTopButton />
    </div>
  );
};
