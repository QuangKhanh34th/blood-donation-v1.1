import React, { useState } from "react";
import { Form, Input, Select, Switch, DatePicker, Button } from "antd";
import PlacesAutocomplete from "../../../components/GoogleMapsAPI/PlacesAutocomplete";

const bloodTypes = ["A", "B", "AB", "O"];

const AddAccountForm = ({
  onCancel,
  onFinish,
}) => {
  const [showPersonal, setShowPersonal] = useState(false);
  const [form] = Form.useForm();
  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={onFinish}
      initialValues={{
        role: "STAFF",
      }}
    >
      <Form.Item
        label="Họ và Tên"
        name="fullName"
        rules={[{ required: true, message: "Vui lòng nhập Họ và Tên" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Username"
        name="username"
        rules={[{ required: true, message: "Vui lòng nhập username" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Password"
        name="password"
        rules={[{ required: true, message: "Vui lòng nhập password" }]}
      >
        <Input.Password />
      </Form.Item>
      <Form.Item
        label="Role"
        name="role"
        rules={[{ required: true, message: "Vui lòng chọn vai trò" }]}
      >
        <Select>
          <Select.Option value="ADMIN">ADMIN</Select.Option>
          <Select.Option value="STAFF">STAFF</Select.Option>
          <Select.Option value="HOSPITAL_STAFF">HOSPITAL STAFF</Select.Option>
        </Select>
      </Form.Item>
      <Form.Item label="Bổ sung thông tin cá nhân" style={{ marginBottom: 0 }}>
        <Switch checked={showPersonal} onChange={setShowPersonal} />
      </Form.Item>
      {showPersonal && (
        <>
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
                <Select.Option key={type} value={type}>
                  {type}
                </Select.Option>
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
            <DatePicker style={{ width: "100%" }} format="YYYY-MM-DD" placeholder="Chọn ngày sinh" />
          </Form.Item>
        </>
      )}
      <Form.Item style={{ textAlign: "right", marginBottom: 0 }}>
        <Button onClick={onCancel} style={{ marginRight: 8 }}>
          Hủy
        </Button>
        <Button type="primary" htmlType="submit">
          Thêm
        </Button>
      </Form.Item>
    </Form>
  );
};

export default AddAccountForm;
