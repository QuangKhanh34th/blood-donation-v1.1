import React from "react";
import FaqItem from "../../components/Faqs/FaqsItem";
import styles from "./styles.module.scss";
import ScrollToTopButton from "../../components/ScrollToTopButton/ScrollToTopButton";
const Information = () => {
  const { faqsContainer, faqsTitle, faqItemContainer } = styles;
  return (
    <div className={faqsContainer}>
      <div className={faqsTitle}>Thông tin quan trọng cho người hiến máu và người nhận máu</div>
      <div className={faqItemContainer}>
        <FaqItem question="Trước khi hiến máu tôi cần chuẩn bị gì?">
          <ul>
            <li>Ngủ đủ giấc, tránh thức khuya</li>
            <li>Không uống rượu bia trong vòng 24–48 giờ trước khi hiến</li>
            <li>Ăn nhẹ trước khi hiến máu, tránh để bụng đói</li>
            <li>Mang theo giấy tờ tùy thân như CMND hoặc CCCD</li>
          </ul>
        </FaqItem>
      </div>

      <div className={faqItemContainer}>
        <FaqItem question="Sau khi hiến máu tôi nên làm gì?">
          <ul>
            <li>Nghỉ ngơi tại chỗ ít nhất 10–15 phút sau khi hiến</li>
            <li>Uống nước và ăn nhẹ theo hướng dẫn của nhân viên y tế</li>
            <li>Tránh vận động mạnh hoặc làm việc nặng trong 24 giờ</li>
            <li>Tránh hút thuốc, rượu bia trong ngày hiến máu</li>
          </ul>
        </FaqItem>
      </div>

      <div className={faqItemContainer}>
        <FaqItem question="Tôi có thể hiến máu bao lâu một lần?">
          <ul>
            <li>Hiến máu toàn phần: mỗi 12 tuần (3 tháng) một lần</li>
            <li>Nam: tối đa 4 lần/năm</li>
            <li>Nữ: tối đa 3 lần/năm</li>
          </ul>
        </FaqItem>
      </div>

      <div className={faqItemContainer}>
        <FaqItem question="Việc hiến máu có ảnh hưởng đến sức khỏe không?">
          <ul>
            <li>Không, nếu bạn đủ điều kiện sức khỏe để hiến máu</li>
            <li>Thể tích máu mất đi sẽ được cơ thể tái tạo nhanh chóng</li>
            <li>Hiến máu còn giúp kiểm tra sức khỏe miễn phí định kỳ</li>
          </ul>
        </FaqItem>
      </div>
      <div className={faqItemContainer}>
        <FaqItem question="Hiến máu có đau không?">
          <ul>
            <li>Bạn chỉ cảm thấy đau nhẹ khi kim chích vào, giống như tiêm</li>
            <li>Quá trình hiến máu thường kéo dài khoảng 5–10 phút</li>
            <li>Không gây tổn thương lâu dài hay để lại sẹo</li>
          </ul>
        </FaqItem>
      </div>

      <div className={faqItemContainer}>
        <FaqItem question="Những lợi ích khi tham gia hiến máu?">
          <ul>
            <li>Kiểm tra sức khỏe định kỳ miễn phí</li>
            <li>Giúp cơ thể tái tạo máu tốt hơn</li>
            <li>Góp phần cứu sống người khác trong lúc nguy cấp</li>
            <li>Nhận giấy chứng nhận hiến máu và quà tặng tri ân</li>
          </ul>
        </FaqItem>
      </div>

      <div className={faqItemContainer}>
        <FaqItem question="Sau khi hiến máu bao lâu thì máu được tái tạo lại?">
          <ul>
            <li>Hồng cầu được tái tạo trong vòng vài tuần</li>
            <li>Thể tích huyết tương hồi phục trong vòng 24–48 giờ</li>
            <li>Cơ thể sẽ tự điều chỉnh và cân bằng nhanh chóng</li>
          </ul>
        </FaqItem>
      </div>

      <div className={faqItemContainer}>
        <FaqItem question="Tôi có thể hiến máu ở đâu?">
          <ul>
            <li>Tại các bệnh viện lớn có khoa huyết học</li>
            <li>Tại các điểm hiến máu cố định của Hội Chữ thập đỏ</li>
            <li>Các sự kiện, chương trình hiến máu lưu động</li>
          </ul>
        </FaqItem>
      </div>

      <div className={faqItemContainer}>
        <FaqItem question="Tôi có thể hiến máu nếu đang dùng thuốc không?">
          <ul>
            <li>
              Phụ thuộc vào loại thuốc, bạn nên thông báo với nhân viên y tế
            </li>
            <li>Thuốc cảm, kháng sinh, thuốc dị ứng cần được cân nhắc kỹ</li>
            <li>Nên tạm hoãn hiến máu nếu đang điều trị bệnh cấp tính</li>
          </ul>
        </FaqItem>
      </div>
      <div className={faqItemContainer}>
        <FaqItem question="Hiến máu có thể truyền bệnh cho người hiến không?">
          <ul>
            <li>
              Không. Quy trình hiến máu an toàn, kim và túi máu chỉ dùng một lần
            </li>
            <li>Các thiết bị đều được vô trùng và loại bỏ sau khi sử dụng</li>
          </ul>
        </FaqItem>
      </div>

      <div className={faqItemContainer}>
        <FaqItem question="Sau bao lâu tôi có thể tập thể dục trở lại?">
          <ul>
            <li>Bạn nên nghỉ ngơi hoàn toàn trong ngày hiến máu</li>
            <li>Sang ngày hôm sau có thể tập nhẹ nhàng nếu cảm thấy khỏe</li>
            <li>Tránh các hoạt động cần dùng nhiều sức trong 24–48 giờ</li>
          </ul>
        </FaqItem>
      </div>

      <div className={faqItemContainer}>
        <FaqItem question="Có cần đăng ký trước khi hiến máu không?">
          <ul>
            <li>Không bắt buộc, nhưng nên đăng ký để được hỗ trợ tốt hơn</li>
            <li>
              Đăng ký trước giúp ban tổ chức chuẩn bị đầy đủ trang thiết bị
            </li>
          </ul>
        </FaqItem>
      </div>

      <div className={faqItemContainer}>
        <FaqItem question="Tôi bị huyết áp thấp/cao có hiến máu được không?">
          <ul>
            <li>
              Nếu huyết áp ổn định và trong giới hạn cho phép, bạn vẫn có thể
              hiến
            </li>
            <li>Sẽ được kiểm tra và tư vấn tại chỗ bởi nhân viên y tế</li>
            <li>
              Không nên tự quyết định, hãy hỏi ý kiến bác sĩ tại điểm hiến
            </li>
          </ul>
        </FaqItem>
      </div>

      <div className={faqItemContainer}>
        <FaqItem question="Phụ nữ đang cho con bú hoặc mang thai có được hiến máu không?">
          <ul>
            <li>
              Không. Phụ nữ mang thai hoặc đang cho con bú không nên hiến máu
            </li>
            <li>
              Cần chờ ít nhất 6 tháng sau sinh để đảm bảo sức khỏe cho cả mẹ và
              bé
            </li>
          </ul>
        </FaqItem>
      </div>
      <ScrollToTopButton />
    </div>
  );
};
export default Information;
