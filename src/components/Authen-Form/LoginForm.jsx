import React from "react";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input, Flex, Typography } from "antd";
import { Link, useNavigate } from "react-router-dom";
import api from "../../configs/axios";
import { toast } from "react-toastify";
import { login } from "../../redux/features/userSlice";
import { useDispatch } from "react-redux";
import { setDonationHistory } from "../../redux/features/bloodHistorySlice";

const { Title } = Typography;

const LoginForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onFinish = async (values) => {
    try {
      const response = await api.post("login", values);
      const userData = response.data;
      console.log("📦 Login response:", userData);

      dispatch(setDonationHistory([])); // 🧹 Clear lịch hẹn cũ
      dispatch(login(userData)); // ✅ Cập nhật user mới
      localStorage.setItem("token", userData.token);
      toast.success("Đăng nhập thành công!");

      // Lấy lịch hẹn
      if (userData.role === "MEMBER") {
        const appointmentRes = await api.get("/appointments/by-user", {
          params: { userId: userData.userID },
        });
        const appointment = appointmentRes.data?.[0];

        if (appointment) {
          dispatch(
            setDonationHistory([
              {
                id: appointment.id,
                address: appointment.address,
                time: appointment.timeRange,
              },
            ])
          );
        }
      }

      // Điều hướng
      switch (userData.role) {
        case "ADMIN":
          navigate("/admin");
          break;
        case "MEMBER":
          navigate("/");
          break;
        case "STAFF":
          navigate("/staff");
          break;
        case "HOSPITAL_STAFF":
          navigate("/hospital");
          break;
        default:
          navigate("/");
      }
    } catch (e) {
      toast.error(e.response?.data || "Đăng nhập thất bại!");
    }
  };

  return (
    <div
      style={{
        maxWidth: 400,
        margin: "50px auto",
        padding: 32,
        border: "1px solid #f0f0f0",
        borderRadius: 8,
        background: "#fff",
        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
      }}
    >
      <Title level={2} style={{ textAlign: "center", marginBottom: 24 }}>
        Đăng nhập
      </Title>
      <Form
        name="login"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        layout="vertical"
      >
        <Form.Item
          name="username"
          label="Username"
          rules={[{ required: true, message: "Vui lòng nhập Username!" }]}
        >
          <Input prefix={<UserOutlined />} placeholder="Username" />
        </Form.Item>

        <Form.Item
          name="password"
          label="Password"
          rules={[{ required: true, message: "Vui lòng nhập Password!" }]}
        >
          <Input.Password prefix={<LockOutlined />} placeholder="Password" />
        </Form.Item>

        <Form.Item>
          <Flex justify="space-between" align="center">
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>Nhớ tôi</Checkbox>
            </Form.Item>
            <Link to="/forgot-password">Quên mật khẩu?</Link>
          </Flex>
        </Form.Item>

        <Form.Item>
          <Button block type="primary" htmlType="submit">
            Đăng nhập
          </Button>
          <div style={{ textAlign: "center", marginTop: 12 }}>
            hoặc <Link to="/register">Đăng ký ngay!</Link>
          </div>
        </Form.Item>
      </Form>
    </div>
  );
};

export default LoginForm;
