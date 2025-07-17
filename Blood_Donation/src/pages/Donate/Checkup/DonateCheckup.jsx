import React, { useState } from "react";
import styles from "./styles.module.scss";
import { Checkbox, Input, Button } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import {
  setDonationHistory,
  setCurrentAppointment,
} from "../../../redux/features/bloodHistorySlice";
import api from "../../../configs/axios";
import { toast } from "react-toastify";
import ScrollToTopButton from "../../../components/ScrollToTopButton/ScrollToTopButton";

const questionList = [
  {
    text: "1. Anh/chị từng hiến máu chưa?",
    options: ["Có", "Không"],
    isSingle: true,
  },

  {
    text: "2. Hiện tại, anh/chị có mắc bệnh lý nào không?",
    options: ["Có", "Không"],
    hasNote: true,
    isSingle: true,
  },

  {
    text: "3. Trước đây, anh/chị có từng mắc một trong các bệnh ...?",
    options: ["Có", "Không", "Bệnh khác"],
    hasNote: true,
    isSingle: true,
  },

  {
    text: "4. Trong 12 tháng gần đây, anh/chị có:",
    options: [
      "Khỏi bệnh sau khi mắc các bệnh: sốt rét, giang mai, lao, viêm não – màng não, uốn ván, phẫu thuật ngoại khoa?",
      "Được truyền máu hoặc chế phẩm máu?",
      "Tiêm Vắc-xin?",
      "Không",
    ],
    hasNote: true,
  },

  {
    text: "5. Trong 06 tháng gần đây, anh/chị có:",
    options: [
      "Khỏi bệnh sau khi mắc bệnh nhiễm trùng, sốt xuất huyết, viêm xương, viêm tuỷ,...?",
      "Sụt cân không rõ nguyên nhân?",
      "Nổi hạch kéo dài?",
      "Thực hiện thủ thuật y tế?",
      "Xăm, xỏ tai, lỗ mũi?",
      "Sử dụng ma tuý?",
      "Tiếp xúc máu người bệnh?",
      "Sống chung với người bị viêm gan siêu vi B?",
      "Quan hệ với người mắc bệnh truyền nhiễm?",
      "Quan hệ đồng giới?",
      "Không",
    ],
  },

  {
    text: "6. Trong 01 tháng gần đây, anh/chị có:",
    options: [
      "Mắc bệnh viêm hô hấp, viêm da, viêm phế quản,...?",
      "Đi vùng có dịch bệnh lưu hành (sốt rét, sốt xuất huyết, Zika,...)?",
      "Không",
    ],
  },

  {
    text: "7. Trong 14 ngày gần đây, anh/chị có:",
    options: [
      "Bị cúm, cảm lạnh, ho, nhức đầu, sốt, đau họng?",
      "Không",
      "Khác (cụ thể)",
    ],
    hasNote: true,
  },

  {
    text: "8. Trong 07 ngày gần đây, anh/chị có:",
    options: [
      "Dùng thuốc kháng sinh, kháng viêm, Aspirin, Corticoid?",
      "Không",
      "Khác (cụ thể)",
    ],
    hasNote: true,
  },

  {
    text: "9. Câu hỏi dành cho phụ nữ:",
    options: [
      "Hiện chị đang mang thai hoặc nuôi con dưới 12 tháng tuổi?",
      "Chấm dứt thai kỳ trong 12 tháng gần đây (sảy thai, phá thai, thai ngoài tử cung)?",
      "Không",
    ],

    isSingle: true,
  },
];

const DonateCheckup = () => {
  const [answers, setAnswers] = useState(
    questionList.map(() => ({ answer: [], note: "" }))
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const user = useSelector((state) => state.user);


  const { programId, date, cityId, slotId } = location.state || {};

  const handleCheckboxChange = (qIndex, option) => {
    const updated = [...answers];
    const selected = updated[qIndex].answer;
    if (selected.includes(option)) {
      updated[qIndex].answer = selected.filter((o) => o !== option);
    } else {
      updated[qIndex].answer = [...selected, option];
    }
    setAnswers(updated);
  };

  const handleNoteChange = (qIndex, e) => {
    const updated = [...answers];
    updated[qIndex].note = e.target.value;
    setAnswers(updated);
  };

  const handleSubmit = async () => {
    if (!programId || !user?.userID || !slotId) {
      toast.error("Thiếu thông tin người dùng, chương trình hoặc khung giờ.");
      return;
    }
    // Kiểm tra các câu hỏi cần ghi chú nếu chọn Có hoặc Khác
    for (let i = 0; i < questionList.length; i++) {
      const question = questionList[i];
      const answer = answers[i];

      if (question.hasNote) {
        const requireNote = answer.answer.some((opt) =>
          ["có", "khác", "Bệnh khác"].includes(opt.toLowerCase())
        );
        if (requireNote && !answer.note.trim()) {
          toast.error(`❗ Câu hỏi ${i + 1}: Vui lòng ghi rõ thông tin cụ thể.`);
          return;
        }
      }
    }


const payload = {
  slotId,
  programId,
  cityId,
  date,
  answer1: answers[0].answer.join(", "),
  answer2: answers[1].answer.join(", ") + (answers[1].note ? `: ${answers[1].note}` : ""),
  answer3: answers[2].answer.join(", ") + (answers[2].note ? `: ${answers[2].note}` : ""),
  answer4: answers[3].answer.join(", ") + (answers[3].note ? `: ${answers[3].note}` : ""),
  answer5: answers[4].answer.join(", "),
  answer6: answers[5].answer.join(", "),
  answer7: answers[6].answer.join(", ") + (answers[6].note ? `: ${answers[6].note}` : ""),
  answer8: answers[7].answer.join(", ") + (answers[7].note ? `: ${answers[7].note}` : ""),
  answer9: answers[8].answer.join(", "),
};


    try {
      const res = await api.post("/appointments", payload, {
        params: { userId: user.userID },
      });

      const detail = (await api.get(`/appointments/${res.data.id}`)).data;

      const data = {
        id: detail.id,
        address: detail.address || "Không rõ địa điểm",
        time: detail.timeRange || "Không rõ thời gian",
        status: detail.status,
      };

      dispatch(setDonationHistory([data]));
      dispatch(setCurrentAppointment(data));

      toast.success("🎉 Đăng ký hiến máu thành công!");
      navigate("/user/bloodDonate");
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || error.response?.data?.error || "";

      if (errorMessage.includes("already have an active appointment")) {
        toast.error("Bạn chỉ có thể đăng ký 1 đơn hiến máu tại 1 thời điểm");

        // Thử lấy lại lịch hẹn đang hoạt động
        try {
          const res = await api.get(`/appointments/by-user`, {
            params: { userId: user.userID },
          });

          const appointment = res.data.find(
            (a) => a.status === "PENDING" || a.status === "APPROVED"
          );

          if (appointment) {
            const detail = (await api.get(`/appointments/${appointment.id}`))
              .data;

            const data = {
              id: detail.id,
              address: detail.address || "Không rõ địa điểm",
              time: detail.timeRange || "Không rõ thời gian",
              status: detail.status,
            };

            dispatch(setDonationHistory([data]));
            dispatch(setCurrentAppointment(data));
            navigate("/user/bloodDonate");
          }
        } catch {
          toast.error("❌ Không thể lấy lại lịch hẹn hiện tại.");
        }
      } else if (errorMessage.includes("10 ngày")) {
        toast.error(
          "Bạn chỉ được đặt lịch sau ít nhất 10 ngày kể từ lần hiến máu gần nhất"
        );
      } else if (errorMessage.includes("thông tin cá nhân")) {
        toast.error(
          "⚠️ Vui lòng cập nhật thông tin cá nhân trước khi đặt lịch."
        );
        navigate("/user/profile");
      } else if (
        errorMessage.includes("Program not found") ||
        errorMessage.includes("Slot not found")
      ) {
        toast.error("Chương trình hoặc khung giờ không tồn tại.");
      } else {
        toast.error("Đăng ký thất bại. Vui lòng thử lại sau.");
      }
    }
  };

  return (
    <div className={styles.container}>
      <h2>Khảo sát trước hiến máu</h2>
      <form className={styles.form}>
        {questionList.map((q, index) => (
          <div key={index} className={styles.questionItem}>
            <p className={styles.questionText}>{q.text}</p>
            <div className={styles.checkboxGroup}>
              {q.options.map((opt, optIdx) => (
                <Checkbox
                  key={optIdx}
                  checked={answers[index].answer.includes(opt)}
                  onChange={() => {
                    if (q.isSingle) {
                      const updated = [...answers];
                      updated[index].answer = [opt]; // chỉ chọn duy nhất
                      setAnswers(updated);
                    } else {
                      handleCheckboxChange(index, opt);
                    }
                  }}
                >
                  {opt}
                </Checkbox>
              ))}
            </div>

            {q.hasNote && (
              <Input.TextArea
                id={`note-${index}`}
                rows={2}
                placeholder="Ghi chú thêm (nếu có)"
                value={answers[index].note}
                onChange={(e) => handleNoteChange(index, e)}
              />
            )}
          </div>
        ))}

        <Button type="primary" onClick={handleSubmit} style={{ marginTop: 24 }}>
          Gửi phiếu khảo sát
        </Button>
      </form>
      <ScrollToTopButton />
    </div>
  );
};

export default DonateCheckup;
