import React, { useEffect } from "react";
import { Form, Input, Button, Select, Checkbox } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { updateBloodRequest, fetchRequestsByMedId } from "../../../redux/features/bloodRequestSlice";

const { Option } = Select;

function UpdateBloodRequestForm({ initialData, onClose }) {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  useEffect(() => {
    if (initialData) {
      form.setFieldsValue({
        isEmergency: initialData?.isEmergency?.toLowerCase() === "yes",
        bloodRequestDetails: initialData.details.map((item) => ({
          typeBlood: item.typeBlood,
          unitSize: item.packVolume,
          quantity: item.packCount,
        })),
      });
    }
  }, [initialData, form]);

  const handleSubmit = async (values) => {
    const payload = {
      isEmergency: values.isEmergency ? "yes" : "no",
      medId: user.userID,
      details: values.bloodRequestDetails.map((item) => ({
        typeBlood: item.typeBlood,
        packVolume: item.unitSize,
        packCount: item.quantity,
      })),
    };

    try {
      await dispatch(updateBloodRequest({ reqID: initialData.reqID, payload })).unwrap();
      dispatch(fetchRequestsByMedId(user.userID));
      onClose();
    } catch (err) {
      // toast handled in thunk or you can log
    }
  };

  return (
    <Form layout="vertical" form={form} onFinish={handleSubmit}>
      <Form.Item name="isEmergency" valuePropName="checked">
        <Checkbox>Khẩn cấp</Checkbox>
      </Form.Item>

      <Form.List name="bloodRequestDetails">
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

                <Button danger onClick={() => remove(name)}>Xoá</Button>
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

      <Form.Item>
        <Button type="primary" htmlType="submit" block>
          Cập nhật
        </Button>
      </Form.Item>
    </Form>
  );
}

export default UpdateBloodRequestForm;
