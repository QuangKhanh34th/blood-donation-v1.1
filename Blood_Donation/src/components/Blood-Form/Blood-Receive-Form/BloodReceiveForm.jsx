import React from "react";
import { Form, Input, Button, Select, Checkbox, TimePicker } from "antd";
import styles from "../Blood-Receive-Form/styles.module.scss";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { createBloodRequest, fetchRequestsByMedId } from "../../../redux/features/bloodRequestSlice"; 


const { Option } = Select;

function BloodReceiveForm( {onFinishSuccess} ) {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();


  // Lấy user từ Redux
  const user = useSelector((state) => state.user);


  const handleSubmit = async (values) => {
    if (!user) {
      toast.warning("Bạn cần đăng nhập để gửi thông tin nhận máu.");
      navigate("/login");
      return;
    }

    try {
    const payload = {
      isEmergency: values.isEmergency ? "yes" : "no", 
      medId: user.userID, 
      details: values.bloodRequestDetails.map((item) => ({
        typeBlood: item.typeBlood,
        packVolume: item.unitSize,
        packCount: item.quantity,
      })),
    };

    await dispatch(createBloodRequest(payload)).unwrap();
    await dispatch(fetchRequestsByMedId(user.userID));
    toast.success("Gửi yêu cầu nhận máu thành công!");
    form.resetFields();
    if (onFinishSuccess) onFinishSuccess();
    // if (onFinishSuccess) onFinishSuccess(payload);
  } catch (error) {
    toast.error(error || "Đã xảy ra lỗi khi gửi yêu cầu.");
  }
  };

  return (
    <div className={styles.formContainer}>
      <h2 className={styles.title}>Yêu Cầu Nhận Máu</h2>
      <Form
        layout="vertical"
        form={form}
        onFinish={handleSubmit}
        className={styles.form}
        initialValues={{
          fullName: user?.fullName,
          phone: user?.phone,
          email: user?.email,
          hospital: user?.hospital
        }}
      >
        <Form.Item
          label="Họ và tên"
          name="fullName"
        >
          <Input disabled />
        </Form.Item>

        <Form.Item
          label="Số điện thoại"
          name="phone"
        >
          <Input disabled/>
        </Form.Item>

        <Form.Item
          label="Email"
          name="email"
        >
          <Input disabled />
        </Form.Item>

        <Form.Item
          label="Địa chỉ bệnh viện"
          name="hospital"
        >
          <Input disabled />
        </Form.Item>

        <Form.Item
          name="isEmergency"
          valuePropName="checked"
          initialValue={false}
        >
          <Checkbox>Khẩn cấp</Checkbox>
        </Form.Item>

       <Form.Item label="Chi tiết yêu cầu máu">
          <Form.List
            name="bloodRequestDetails"
            rules={[
              {
                validator: async (_, names) => {
                  if (!names || names.length < 1) {
                    return Promise.reject(
                      new Error("Vui lòng thêm ít nhất một yêu cầu máu!")
                    );
                  }
                },
              },
            ]}
          >
            {(fields, { add, remove }) => (
              <>
                {fields.map(({ key, name, ...restField }) => (
                  <div key={key} style={{ display: "flex", gap: 8, marginBottom: 16 }}>
                    <Form.Item
                      {...restField}
                      name={[name, "typeBlood"]}
                      rules={[{ required: true, message: "Chọn nhóm máu!" }]}
                      style={{ flex: 1 }}
                    >
                      <Select placeholder="Nhóm máu">
                        <Option value="A">A</Option>
                        <Option value="B">B</Option>
                        <Option value="AB">AB</Option>
                        <Option value="O">O</Option>
                      </Select>
                    </Form.Item>

                    <Form.Item
                      {...restField}
                      name={[name, "unitSize"]}
                      rules={[{ required: true, message: "Chọn đơn vị ml!" }]}
                      style={{ flex: 1 }}
                    >
                      <Select placeholder="Đơn vị (ml)">
                        <Option value={200}>200ml</Option>
                        <Option value={350}>350ml</Option>
                        <Option value={500}>500ml</Option>
                      </Select>
                    </Form.Item>

                    <Form.Item
                      {...restField}
                      name={[name, "quantity"]}
                      rules={[{ required: true, message: "Nhập số lượng!" }]}
                      style={{ flex: 1 }}
                    >
                      <Input type="number" min={1} placeholder="Số lượng" />
                    </Form.Item>

                    <Button danger onClick={() => remove(name)}>
                      Xoá
                    </Button>
                  </div>
                ))}
                <Form.Item>
                  <Button type="dashed" onClick={() => add()} block>
                    + Thêm yêu cầu máu
                  </Button>
                </Form.Item>
              </>
            )}
          </Form.List>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            Gửi yêu cầu
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default BloodReceiveForm;
