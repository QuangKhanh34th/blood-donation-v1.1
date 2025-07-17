import React, { useEffect } from "react";
import { Form, Input, Select, DatePicker, Button } from "antd";
import dayjs from "dayjs";
import PlacesAutocomplete from "../../../components/GoogleMapsAPI/PlacesAutocomplete";

const bloodTypes = ["A", "B", "AB", "O"];
const roleOptions = ["ADMIN", "STAFF", "HOSPITAL_STAFF"];

const UpdateAccountForm = ({
  initialValues = {},
  onCancel,
  onFinish,
  showPersonal = false,
}) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (initialValues) {
      form.setFieldsValue({
        ...initialValues,
        birthdate: initialValues.birthdate ? dayjs(initialValues.birthdate) : undefined,
      });
    }
  }, [initialValues, form]);

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={onFinish}
    >
      {/* Only show role if NOT showPersonal (account info update) */}
      {!showPersonal && (
        <>
          <Form.Item 
            label="Username" 
            name="username"
            rules={[{ required: true}]}
            tooltip="Không thể thay đổi username vì đây là định danh duy nhất của tài khoản."
          >
            <Input disabled />
          </Form.Item>
          <Form.Item 
          label="Password" 
          name="password"
          rules={[{ required: true, message: "Vui lòng nhập mật khẩu mới"}]}
          >
            <Input.Password autoComplete="new-password" />
          </Form.Item>
          <Form.Item label="Role" name="role" rules={[{ required: true }]}>
            <Select>
              {roleOptions.map((role) => (
                <Select.Option key={role} value={role}>{role}</Select.Option>
              ))}
            </Select>
          </Form.Item>
        </>
      )}
      {/* Only show personal info fields if showPersonal is true */}
      {showPersonal && (
        <>
          <Form.Item label="Họ và Tên" name="fullName">
            <Input />
          </Form.Item>
          <Form.Item label="Email" name="email">
            <Input type="email" placeholder="example@gmail.com" />
          </Form.Item>
          <Form.Item label="Số điện thoại" name="phone">
            <Input type="number" min="0" step="1" pattern="[0-9]*" inputMode="numeric" placeholder="Nhập số điện thoại" />
          </Form.Item>
          <Form.Item label="Địa chỉ" name="address">
            <PlacesAutocomplete placeholder="Nhập địa chỉ" />
          </Form.Item>
          <Form.Item label="CCCD" name="cccd">
            <Input type="number" min="0" step="1" pattern="[0-9]*" inputMode="numeric" placeholder="Nhập số CCCD" />
          </Form.Item>
          <Form.Item label="Nhóm máu" name="typeBlood">
            <Select placeholder="Chọn nhóm máu">
              {bloodTypes.map((type) => (
                <Select.Option key={type} value={type}>{type}</Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item label="Giới tính" name="gender">
            <Select placeholder="Chọn giới tính">
              <Select.Option value="MALE">Nam</Select.Option>
              <Select.Option value="FEMALE">Nữ</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item label="Ngày sinh" name="birthdate">
            <DatePicker 
              style={{ width: "100%" }} 
              format="YYYY-MM-DD" 
              placeholder="Chọn ngày sinh"
              disabledDate={current => current && current > dayjs().endOf('day')}
            />
          </Form.Item>
        </>
      )}
      <Form.Item style={{ textAlign: "right", marginBottom: 0 }}>
        <Button onClick={onCancel} style={{ marginRight: 8 }}>Hủy</Button>
        <Button type="primary" htmlType="submit">Cập nhật</Button>
      </Form.Item>
    </Form>
  );
};

export default UpdateAccountForm;
