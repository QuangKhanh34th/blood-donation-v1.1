// src/pages/ForgotPassword.jsx
import React, { useState } from "react";
import { Button, Form, Input, Typography } from "antd";
import { toast } from "react-toastify";
import api from "../../configs/axios";
import { Navigate, useNavigate } from "react-router-dom";

const { Title } = Typography;

const ForgotPassword = () => {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [token, setToken] = useState("");

  const [form] = Form.useForm();
  const navigate = useNavigate();
  const handleGenerateOtp = async () => {
    try {
      await api.post("/generate-otp", null, { params: { email } });
      toast.success("Đã gửi OTP tới email!");
      setStep(2);
    } catch (e) {
      toast.error(e.response?.data || "Gửi OTP thất bại!");
    }
  };

  const handleVerifyOtp = async () => {
    try {
      const res = await api.post("/verify-otp", null, {
        params: { email, otp },
      });
      setToken(res.data);
      toast.success("Xác minh OTP thành công!");
      setStep(3);
    } catch (e) {
      toast.error(e.response?.data || "Xác minh OTP thất bại!");
    }
  };

  const handleResetPassword = async (values) => {
    try {
      await api.post(
        "/reset-password",
        {
          newPassword: values.newPassword,
          confirmPassword: values.confirmPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success("Đặt lại mật khẩu thành công!");
      setStep(1);
      setEmail("");
      setOtp("");
      setToken("");
      form.resetFields();
      navigate("/login");
    } catch (e) {
      toast.error(e.response?.data || "Đặt lại mật khẩu thất bại!");
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: "50px auto" }}>
      <Title level={2}>Quên mật khẩu</Title>

      {step === 1 && (
        <>
          <p>Nhập email để nhận mã OTP</p>
          <Input
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Button
            block
            type="primary"
            onClick={handleGenerateOtp}
            style={{ marginTop: 16 }}
          >
            Gửi mã OTP
          </Button>
        </>
      )}

      {step === 2 && (
        <>
          <p>Nhập mã OTP đã gửi về email</p>
          <Input
            placeholder="Nhập mã OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />
          <Button
            block
            type="primary"
            onClick={handleVerifyOtp}
            style={{ marginTop: 16 }}
          >
            Xác minh OTP
          </Button>
        </>
      )}

      {step === 3 && (
        <>
          <p>Nhập mật khẩu mới</p>
          <Form form={form} onFinish={handleResetPassword} layout="vertical">
            <Form.Item
              name="newPassword"
              label="Mật khẩu mới"
              rules={[{ required: true, message: "Vui lòng nhập mật khẩu!" }]}
            >
              <Input.Password />
            </Form.Item>
            <Form.Item
              name="confirmPassword"
              label="Xác nhận mật khẩu"
              rules={[
                { required: true, message: "Vui lòng xác nhận mật khẩu!" },
              ]}
            >
              <Input.Password />
            </Form.Item>
            <Button block type="primary" htmlType="submit">
              Đặt lại mật khẩu
            </Button>
          </Form>
        </>
      )}
    </div>
  );
};

export default ForgotPassword;
