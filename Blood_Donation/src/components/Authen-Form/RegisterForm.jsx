import {
  Button,
  Checkbox,
  Form,
  Input,
  Select,
  Typography,
  Upload,
  // message,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import api from "../../configs/axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const { Option } = Select;
const { Title } = Typography;

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};

const RegisterForm = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  //call api
  const onFinish = async (values) => {
    try {
      await api.post("register", values);
      toast.success("Đăng kí thành công!");
      navigate("/login");
    } catch (e) {
      console.log("Lỗi đăng ký:", e);
      toast.error(e?.response?.data?.message || "Đăng ký thất bại!");
    }
  };

  return (
    <div
      style={{
        maxWidth: 700,
        margin: "40px auto",
        padding: 32,
        background: "#fff",
        borderRadius: 8,
        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
      }}
    >
      <Title level={2} style={{ textAlign: "center", marginBottom: 24 }}>
        Đăng Kí
      </Title>

      <Form
        {...formItemLayout}
        form={form}
        name="register"
        onFinish={onFinish}
        scrollToFirstError
      >
        {/* Các Form.Item giữ nguyên như bạn viết, không thay đổi */}

        {/* //form theo swagger mentor */}
        <Form.Item
          name="fullName"
          label="Họ và tên"
          rules={[{ required: true, message: "Vui lòng nhập họ và tên!" }]}
        >
          <Input placeholder="Nguyễn Văn A" />
        </Form.Item>

        <Form.Item
          name="email"
          label="Email"
          rules={[
            { type: "email", message: "Email không hợp lệ!" },
            { required: true, message: "Vui lòng nhập email!" },
          ]}
        >
          <Input placeholder="example@gmail.com" />
        </Form.Item>

        <Form.Item
          name="username"
          label="UserName"
          rules={[{ required: true, message: "Vui lòng nhập UserName!" }]}
        >
          <Input placeholder="Tên bạn muốn hiển thị" />
        </Form.Item>

        <Form.Item
          name="password"
          label="Mật khẩu"
          rules={[{ required: true, message: "Vui lòng nhập mật khẩu!" }]}
          hasFeedback
        >
          <Input.Password placeholder="••••••••" />
        </Form.Item>

        <Form.Item

          name="confirmPassword"

          label="Xác nhận mật khẩu"
          dependencies={["password"]}
          hasFeedback
          rules={[
            { required: true, message: "Vui lòng xác nhận mật khẩu!" },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error("Mật khẩu không khớp!"));
              },
            }),
          ]}
        >
          <Input.Password placeholder="••••••••" />
        </Form.Item>

        {/* <Form.Item
          name="email"
          label="Email"
          rules={[
            { type: "email", message: "Email không hợp lệ!" },
            { required: true, message: "Vui lòng nhập email!" },
          ]}
        >
          <Input placeholder="example@gmail.com" />
        </Form.Item>

        <Form.Item
          name="username"
          label="UserName"
          rules={[{ required: true, message: "Vui lòng nhập UserName!" }]}
        >
          <Input placeholder="Tên bạn muốn hiển thị" />
        </Form.Item>

        <Form.Item
          name="cccd"
          label="CCCD"
          rules={[
            { required: true, message: "Vui lòng nhập số CCCD!" },
            {
              pattern: /^[0-9]{12}$/,
              message: "CCCD phải gồm đúng 12 chữ số!",
            },
          ]}
        >
          <Input placeholder="012345678901" />
        </Form.Item>

        <Form.Item
          name="password"
          label="Mật khẩu"
          rules={[{ required: true, message: "Vui lòng nhập mật khẩu!" }]}
          hasFeedback
        >
          <Input.Password placeholder="••••••••" />
        </Form.Item>

        <Form.Item
          name="confirm"
          label="Xác nhận mật khẩu"
          dependencies={["password"]}
          hasFeedback
          rules={[
            { required: true, message: "Vui lòng xác nhận mật khẩu!" },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error("Mật khẩu không khớp!"));
              },
            }),
          ]}
        >
          <Input.Password placeholder="••••••••" />
        </Form.Item>

        <Form.Item
          name="address"
          label="Nơi cư trú"
          rules={[{ required: true, message: "Vui lòng nhập nơi cư trú!" }]}
        >
          <Input placeholder="Ví dụ: Quận 1, TP. Hồ Chí Minh" />
        </Form.Item>

        <Form.Item
          name="phone"
          label="Số điện thoại"
          rules={[
            { required: true, message: "Vui lòng nhập số điện thoại!" },
            {
              pattern: /^(0|\+84)[0-9]{9,10}$/,
              message: "Số điện thoại không hợp lệ!",
            },
          ]}
        >
          <Input placeholder="0901234567" />
        </Form.Item>

        <Form.Item
          name="gender"
          label="Giới tính"
          rules={[{ required: true, message: "Vui lòng chọn giới tính!" }]}
        >
          <Select placeholder="Chọn giới tính">
            <Option value="male">Nam</Option>
            <Option value="female">Nữ</Option>
            <Option value="other">Khác</Option>
          </Select>
        </Form.Item>
        <Form.Item
          name="bloodType"
          label="Nhóm máu"
          rules={[{ required: true, message: "Vui lòng chọn nhóm máu!" }]}
        >
          <Select placeholder="Chọn nhóm máu">
            <Option value="A+">A+</Option>
            <Option value="A-">A-</Option>
            <Option value="B+">B+</Option>
            <Option value="B-">B-</Option>
            <Option value="AB+">AB+</Option>
            <Option value="AB-">AB-</Option>
            <Option value="O+">O+</Option>
            <Option value="O-">O-</Option>
          </Select>
        </Form.Item> */}

        {/* <Form.Item
          name="healthFile"
          label="Hồ sơ khám sức khỏe"
          valuePropName="fileList"
          getValueFromEvent={(e) => (Array.isArray(e) ? e : e?.fileList)}
          rules={[{ required: true, message: "Vui lòng tải lên hồ sơ!" }]}
        >
          <Upload
            name="health"
            beforeUpload={() => false} // Ngăn upload tự động
            accept=".pdf,.doc,.docx,.jpg,.png"
          >
            <Button icon={<UploadOutlined />}>Chọn file</Button>
          </Upload>
        </Form.Item>

        <Form.Item
          name="agreement"
          valuePropName="checked"
          rules={[
            {
              validator: (_, value) =>
                value
                  ? Promise.resolve()
                  : Promise.reject(new Error("Should accept agreement")),
            },
          ]}
          {...tailFormItemLayout}
        >
          <Checkbox>
            I have read the <a href="">agreement</a>
          </Checkbox>
        </Form.Item>  */}

        <Form.Item {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit">
            Đăng kí
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default RegisterForm;
