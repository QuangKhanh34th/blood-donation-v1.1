// src/pages/News/NewsDetail.jsx
import React from "react";
import { useParams } from "react-router-dom";
import styles from "./styles.module.scss";
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
import NewsDetailForm from "../../components/NewsDetailForm.jsx/NewsDetailForm";
import { Button } from "../../components/Button/Button";
import ScrollToTopButton from "../../components/ScrollToTopButton/ScrollToTopButton";

const newsData = [
  {
    id: 1,
    image: news1,
    title: "Hiến máu nhân đạo tại Hà Nội",
    content: `Ngày 15/5, tại Cung Văn hóa Hữu nghị Việt Xô, sự kiện hiến máu nhân đạo đã thu hút hơn 500 người tham gia.
Hoạt động này do Viện Huyết học - Truyền máu Trung ương phối hợp cùng các tổ chức xã hội tổ chức.
Ngay từ sáng sớm, hàng dài người đã xếp hàng trật tự để đăng ký hiến máu. Các tình nguyện viên được hướng dẫn kiểm tra sức khỏe kỹ càng trước khi hiến máu.
Ngoài hoạt động chính, chương trình còn có các gian hàng tuyên truyền, tư vấn dinh dưỡng, chăm sóc sức khỏe hậu hiến máu.
Buổi chiều diễn ra buổi tọa đàm chia sẻ trải nghiệm từ các cá nhân từng được truyền máu, làm tăng thêm giá trị nhân văn của sự kiện.
Nhiều người xúc động chia sẻ rằng họ từng thoát khỏi cửa tử nhờ những đơn vị máu quý giá được hiến tặng vô điều kiện.
Kết thúc ngày, hơn 450 đơn vị máu đã được tiếp nhận, góp phần không nhỏ vào ngân hàng máu quốc gia.
Chương trình cũng ghi nhận sự tham gia của nhiều người đã hiến máu hơn 20 lần, được trao tặng giấy khen và kỷ niệm chương đầy trân trọng.`,
  },
  {
    id: 2,
    image: news2,
    title: "Thành phố Hồ Chí Minh tổ chức Ngày hội đỏ",
    content: `Ngày hội đỏ được tổ chức tại Nhà Văn hóa Thanh Niên TP.HCM đã trở thành một ngày hội thực sự của lòng nhân ái.
Không khí náo nhiệt với sự tham gia của hàng trăm người trẻ tuổi, công nhân, và các nghệ sĩ nổi tiếng.
Họ không chỉ đến để hiến máu mà còn tham gia vào các hoạt động bên lề như thi vẽ tranh cổ động, biểu diễn ca nhạc, và thi kiến thức về y tế cộng đồng.
Ban tổ chức còn dựng một khu triển lãm ảnh ghi lại hành trình của những bệnh nhân cần truyền máu và những người hiến máu tiêu biểu.
Buổi tối là chương trình văn nghệ “Giọt máu trao đi - Hy vọng ở lại” với sự góp mặt của nhiều ca sĩ, nghệ sĩ tên tuổi, lan tỏa thông điệp yêu thương đến cộng đồng.
Một điểm mới của chương trình năm nay là phần “Góc chia sẻ hy vọng”, nơi người hiến và người nhận máu có thể để lại lời nhắn cho nhau một cách ẩn danh đầy xúc động.
Tổng cộng đã có 620 người tham gia hiến máu trong sự kiện kéo dài suốt 12 giờ này, một con số kỷ lục của chương trình trong 5 năm trở lại đây.`,
  },
  {
    id: 3,
    image: news3,
    title: "Sinh viên ĐH Bách Khoa tham gia hiến máu hè 2025",
    content: `Hơn 300 sinh viên Đại học Bách Khoa TP.HCM đã đăng ký tham gia chương trình hiến máu hè 2025.
Sự kiện được tổ chức tại khuôn viên trường, tạo điều kiện thuận lợi cho sinh viên tham gia giữa kỳ nghỉ hè.
Nhiều nhóm sinh viên đã lên kế hoạch cùng tham gia để cổ vũ tinh thần đồng đội.
Một số bạn còn chuẩn bị áo nhóm với khẩu hiệu như “Hiến máu cứu người - Đừng ngại ngần”, tạo nên không khí sôi nổi và đoàn kết.
Bên cạnh hiến máu, nhà trường tổ chức hội thảo “Máu và sự sống” để nâng cao nhận thức của sinh viên về vai trò của máu trong y học hiện đại.
Chương trình cũng vinh danh các cá nhân và nhóm sinh viên có thành tích hiến máu nhiều lần, góp phần khích lệ tinh thần nhân đạo trong giới trẻ.
Sinh viên Nguyễn Minh Quân, người đã hiến máu 8 lần dù mới 22 tuổi, được mời phát biểu truyền cảm hứng và nhận bằng khen từ ban tổ chức.
Kết thúc buổi lễ, nhiều bạn trẻ đã bày tỏ mong muốn sự kiện sẽ được tổ chức đều đặn mỗi học kỳ, như một phần của văn hóa sinh viên Bách Khoa.`,
  },
  {
    id: 4,
    image: news4,
    title: "Tiếp sức mùa thi kết hợp hiến máu tại TP.HCM",
    content: `Trong chiến dịch “Tiếp sức mùa thi” tại TP.HCM, các tình nguyện viên không chỉ hỗ trợ sĩ tử mà còn cùng nhau đăng ký hiến máu nhân đạo.
Chương trình lần này diễn ra tại hơn 20 điểm thi lớn trong thành phố, mỗi điểm đều có khu vực tiếp nhận máu do các bác sĩ và điều dưỡng hỗ trợ.
Những hình ảnh các bạn trẻ trong đồng phục xanh, vừa phát nước, phát bánh cho thí sinh, vừa tranh thủ giờ nghỉ để hiến máu đã để lại ấn tượng mạnh.
Ngoài ra, các mạnh thường quân còn tặng phiếu ăn uống miễn phí cho người tham gia hiến máu như một lời cảm ơn chân thành.
Sự kiện nhận được sự hỗ trợ truyền thông lớn từ báo chí và mạng xã hội, thu hút hàng ngàn lượt chia sẻ và lời động viên.
Chỉ sau 2 ngày phát động, hơn 200 đơn vị máu đã được tiếp nhận, góp phần kịp thời bổ sung kho dự trữ máu trong dịp hè.
Một số thí sinh sau khi hoàn thành bài thi cũng tình nguyện ở lại hiến máu, tạo nên hình ảnh đẹp về trách nhiệm xã hội của thế hệ trẻ.
Chương trình hứa hẹn sẽ được duy trì hàng năm như một phần của chiến dịch “Mùa hè xanh” tại các trường đại học lớn trong thành phố.

`,
  },
  {
    id: 5,
    image: news5,
    title: "Ngày hội hiến máu vì sức khỏe cộng đồng",
    content: `Ngày hội hiến máu vì sức khỏe cộng đồng được tổ chức tại Trung tâm Y tế Quận 7 đã thu hút hàng trăm người dân tham dự.
Từ người trẻ đến người lớn tuổi, ai cũng háo hức và sẵn sàng góp phần nhỏ bé của mình cho cộng đồng.
Chương trình không chỉ dừng lại ở hiến máu mà còn mở rộng thành một ngày hội chăm sóc sức khỏe toàn diện.
Có hơn 10 gian hàng tư vấn miễn phí về sức khỏe tim mạch, huyết áp, dinh dưỡng và tâm lý học đường.
Trẻ em đi cùng cha mẹ được tham gia khu trò chơi và học hỏi về cách giữ gìn sức khỏe qua các trò tương tác thú vị.
Ngoài ra, mọi người còn được nhận phiếu khám định kỳ tại trung tâm y tế và những món quà kỷ niệm nhỏ như huy hiệu, sổ tay y tế cá nhân.
Một tiết mục đặc biệt là “Thử thách 60 phút” – mời mọi người đo huyết áp, nhịp tim trước và sau khi tham gia các hoạt động vận động nhẹ như nhảy dây, đi bộ tại chỗ.
Kết quả cho thấy tác động tích cực của vận động tới sức khỏe, và tạo động lực cho người dân thực hành sống lành mạnh hơn mỗi ngày.`,
  },
  {
    id: 6,
    image: news6,
    title: "Trung tâm y tế Quận 1 kêu gọi hiến máu khẩn cấp",
    content: `Ngày 20/5, Trung tâm Y tế Quận 1 phát đi lời kêu gọi hiến máu khẩn cấp do lượng máu dự trữ tại các bệnh viện đang cạn kiệt nghiêm trọng, đặc biệt nhóm máu O và A.
Thông tin này nhanh chóng lan rộng trên mạng xã hội và được các nhóm thiện nguyện chia sẻ mạnh mẽ, tạo nên một làn sóng ủng hộ chưa từng có.
Chỉ sau 6 tiếng kể từ thông báo, hơn 300 người đã đến Trung tâm để đăng ký hiến máu, bất chấp thời tiết oi bức và thời gian gấp rút.
Một số người còn mang theo đồ ăn, nước uống tự chuẩn bị để chia sẻ với các tình nguyện viên khác đang chờ đến lượt.
Nhân viên y tế làm việc không ngơi nghỉ, liên tục tiếp nhận, kiểm tra, xét nghiệm và truyền tải thông tin sức khỏe cho từng người.
Bên ngoài, loa phát thanh không ngừng cảm ơn người dân, đồng thời nhắc nhở giữ trật tự, tránh chen lấn, bảo đảm an toàn phòng dịch.
Sau 2 ngày, tổng cộng 740 đơn vị máu đã được tiếp nhận, vượt chỉ tiêu đề ra và góp phần cứu sống hàng chục bệnh nhân nguy kịch tại các bệnh viện tuyến đầu.
Ban lãnh đạo trung tâm cũng phát biểu tri ân sâu sắc đến người dân, và tuyên bố sẽ duy trì kênh “Cảnh báo thiếu máu” để kêu gọi đúng lúc trong tương lai.`,
  },
  {
    id: 7,
    image: news7,
    title:
      "Truyền thông chung tay lan tỏa thông điệp “Mỗi giọt máu cho đi, một cuộc đời ở lại",
    content: `Chiến dịch truyền thông mang tên “Mỗi giọt máu cho đi, một cuộc đời ở lại” do Bộ Y tế phát động đã chính thức khởi động từ đầu tháng 5, nhận được sự hưởng ứng rộng rãi.
Các kênh truyền hình quốc gia, đài phát thanh và nền tảng mạng xã hội đồng loạt thay ảnh đại diện, đăng tải video xúc động và thông điệp kêu gọi cộng đồng tham gia hiến máu.
Nhiều người nổi tiếng như ca sĩ Mỹ Tâm, cầu thủ Quang Hải, và diễn viên Thu Trang cũng lên tiếng ủng hộ chiến dịch, đồng thời trực tiếp hiến máu để làm gương.
Trên TikTok, hashtag #HienMau2025 nhanh chóng lọt top xu hướng với hàng triệu lượt xem và hàng trăm clip ghi lại khoảnh khắc xúc động khi hiến máu.
Ngoài ra, một số trường học còn tổ chức các buổi ngoại khóa với chủ đề "Giọt máu hồng - Kết nối yêu thương", mời học sinh tham gia trò chơi, kịch ngắn và vẽ tranh tuyên truyền.
Đặc biệt, chiến dịch lần này còn ứng dụng công nghệ AI để cá nhân hóa lời kêu gọi trên Facebook, khiến nhiều người cảm thấy thông điệp trở nên gần gũi hơn bao giờ hết.
Báo cáo từ Bộ Y tế cho biết sau 2 tuần, lượng máu tiếp nhận đã tăng hơn 40% so với cùng kỳ năm ngoái – một con số đầy lạc quan trong bối cảnh khan hiếm hiện tại.

`,
  },
  {
    id: 8,
    image: news8,
    title:
      " Câu lạc bộ hiến máu sống của Đại học Y Dược ra mắt ứng dụng kết nối người cần và người cho máu",
    content: `Nhằm tăng tính kết nối và phản ứng nhanh trong các tình huống khẩn cấp, Câu lạc bộ Hiến máu sống trường ĐH Y Dược TP.HCM vừa cho ra mắt ứng dụng “Giọt máu sống”.
Ứng dụng cho phép người dùng đăng ký nhóm máu, khu vực sinh sống, thời gian sẵn sàng và sẽ nhận thông báo nếu có người cần máu khẩn trong bán kính 10km.
Điểm đặc biệt là app còn tích hợp bản đồ thời gian thực, giúp người hiến máu nhanh chóng định vị bệnh viện gần nhất và chỉ dẫn lộ trình an toàn.
Từ khi chạy thử nghiệm, ứng dụng đã giúp kết nối thành công 62 ca khẩn cấp chỉ trong vòng 1 tháng – một thành tích đáng nể.
Nguyễn Hoàng Nam – trưởng nhóm phát triển ứng dụng – chia sẻ: “Chúng tôi hy vọng đây không chỉ là một công cụ mà còn là cầu nối nhân đạo giữa con người với con người”.
Dự kiến, ứng dụng sẽ được phát hành miễn phí trên cả Android và iOS vào tháng 7/2025, với mục tiêu đạt 100.000 lượt cài đặt trong năm đầu tiên.
Bộ Y tế và các tổ chức phi chính phủ cũng bày tỏ sự ủng hộ và hứa sẽ hỗ trợ mở rộng dữ liệu liên kết giữa các bệnh viện và nền tảng mới này..`,
  },
  {
    id: 9,
    image: news9,
    title: "Ngày hội văn hóa kết hợp vận động hiến máu",
    content: `Tại Lào Cai, ngày hội văn hóa dân tộc thiểu số đã kết hợp cùng chương trình vận động hiến máu, tạo nên một không khí đầy ý nghĩa.
    Người dân trong trang phục truyền thống lần lượt đăng ký hiến máu, thể hiện tinh thần đoàn kết và sẻ chia.
    Hơn 400 đơn vị máu được thu về chỉ trong một ngày.`,
  },
  {
    id: 10,
    image: news10,
    title: "Cuộc thi tuyên truyền về hiến máu cho thanh thiếu niên",
    content: `Cuộc thi “Một giọt máu – Một tấm lòng” dành cho học sinh và sinh viên đã diễn ra sôi nổi tại TP. Cần Thơ.
    Các đội thi thể hiện hiểu biết, kỹ năng truyền thông và thông điệp nhân đạo thông qua tiểu phẩm, hùng biện và poster sáng tạo.
    Cuộc thi không chỉ mang tính giáo dục mà còn lan tỏa hành động đẹp đến cộng đồng trẻ.
    Ngoài hoạt động hiến máu chính, lễ hội còn có khu trưng bày “Dòng chảy yêu thương” – triển lãm tranh và ảnh về hành trình của máu từ người cho đến người nhận.
Ban tổ chức bố trí nhiều điểm check-in để mọi người lưu lại khoảnh khắc đặc biệt, và chia sẻ lên mạng xã hội kèm hashtag #GiótHồngBìnhDương.
Buổi tối là đêm nhạc hội với sự tham gia của nhiều nghệ sĩ trẻ như Erik, Trúc Nhân, cùng những câu chuyện thật xúc động từ các gia đình bệnh nhân.
Người dân được phát phiếu ăn miễn phí, nước uống mát lạnh, và có cả khu vui chơi trẻ em để các gia đình có thể tham gia mà không lo trông con nhỏ.
Kết quả: tổng cộng 923 đơn vị máu được tiếp nhận chỉ trong vòng 1 ngày, ghi nhận là lễ hội hiến máu lớn nhất từng tổ chức tại tỉnh Bình Dương.
Tỉnh đoàn Bình Dương khẳng định sẽ duy trì lễ hội thường niên, và nhân rộng mô hình ra các huyện thị khác từ năm sau.`,
  },
  {
    id: 11,
    image: news11,
    title: "Chương trình 'Giọt hồng yêu thương' tại miền Tây",
    content: `Chương trình “Giọt hồng yêu thương” diễn ra tại tỉnh Vĩnh Long đã tiếp nhận được hơn 700 đơn vị máu từ người dân vùng sông nước.
    Đây là sự kiện nằm trong chiến dịch “Hành trình đỏ” do Hội Chữ Thập Đỏ tổ chức hằng năm.
    Người dân nô nức tham gia, từ các bác lớn tuổi đến những bạn trẻ lần đầu hiến máu.
    Ngày 28/5, chương trình “Giọt máu nghĩa tình” diễn ra tại Nhà văn hóa Lao động TP. Đà Nẵng đã lập kỷ lục mới với 1.250 đơn vị máu được hiến chỉ trong 8 tiếng.
Chương trình thu hút không chỉ người dân địa phương mà còn có khách du lịch, người nước ngoài đang sinh sống tại thành phố tham gia.
Nhiều gia đình ba thế hệ cùng đến hiến máu, tạo nên hình ảnh xúc động và đầy cảm hứng cho thế hệ trẻ.
Một điểm đặc biệt là khu vực “Nhật ký người hiến máu”, nơi mọi người có thể ghi lại lý do và cảm xúc khi tham gia, rồi treo lên cây điều ước.
Chính quyền thành phố cũng trao bằng khen cho các tổ chức có đóng góp nổi bật, như công ty CP Cảng Đà Nẵng và trường Đại học Đông Á.
Chương trình còn tổ chức livestream 8 tiếng liên tục trên YouTube và Facebook, giúp lan tỏa sự kiện tới cộng đồng mạng trên cả nước.
Nhiều khán giả để lại bình luận động viên, hứa sẽ tham gia các đợt hiến máu kế tiếp ở nơi mình sinh sống.
Chủ tịch Hội Chữ thập đỏ Đà Nẵng chia sẻ: “Sự thành công của chương trình lần này là minh chứng cho tinh thần đoàn kết và nhân ái rất đặc trưng của người Đà Nẵng”.

`,
  },
  {
    id: 12,
    image: news12,
    title: "Hiến máu nhân đạo tại trường THPT Nguyễn Du",
    content: `Lần đầu tiên tổ chức tại trường THPT Nguyễn Du (TP.HCM), chương trình hiến máu đã nhận được sự tham gia tích cực từ thầy cô và học sinh lớp 12.
    Mặc dù còn nhiều bỡ ngỡ, các em học sinh vẫn sẵn sàng vượt qua nỗi sợ để góp phần giúp đỡ cộng đồng.
    Nhiều bạn chia sẻ đây là một kỷ niệm đáng nhớ trước khi rời ghế nhà trường.
    Sau chiến dịch hiến máu hè 2025, hàng trăm bệnh nhân đã gửi lời cảm ơn xúc động đến những người đã giúp họ vượt qua giai đoạn hiểm nghèo.
Tại Bệnh viện Chợ Rẫy, một bé gái 8 tuổi bị thiếu máu di truyền đã bình phục và xuất viện sau khi nhận được đủ máu từ người hiến vô danh.
Gia đình em đã viết một bức thư dài đầy xúc động và xin phép bác sĩ được treo nó lên bảng thông tin bệnh viện để chia sẻ niềm biết ơn.
Cũng trong dịp này, một nam bệnh nhân bị tai nạn giao thông nặng, cần truyền 8 đơn vị máu gấp, đã gửi video lời cảm ơn đến đội ngũ y bác sĩ và cộng đồng mạng.
“Nhờ những con người tôi không biết tên, tôi đã có cơ hội sống lần thứ hai”, anh xúc động chia sẻ.
Nhiều bệnh nhân khác cũng để lại lời nhắn trên website chính thức của Hội Chữ thập đỏ, nơi lưu trữ những “bức thư máu” mang tính biểu tượng.
Các lời cảm ơn đã được tổng hợp, in thành sổ lưu niệm để trưng bày trong triển lãm “Hành trình giọt máu hồng” dự kiến diễn ra vào tháng 8 tới.
Thông điệp cuối cùng là: hãy hiến máu đều đặn, bởi mỗi giọt máu không chỉ cứu người – mà còn là món quà quý giá nhất gửi đến cuộc đời.`,
  },
];

const NewsDetail = () => {
  const { container } = styles;

  const { id } = useParams();

  const news = newsData.find((item) => item.id === Number(id));

  if (!news) {
    return <div>Không tìm thấy bài viết.</div>;
  }

  return (
    <div className={container}>
      <NewsDetailForm
        image={news.image}
        title={news.title}
        content={news.content}
      />
      <Button content="Trở về" to="/news" />
      <ScrollToTopButton />
    </div>
  );
};

export default NewsDetail;
