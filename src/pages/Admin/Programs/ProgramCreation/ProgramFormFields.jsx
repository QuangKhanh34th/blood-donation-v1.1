// Component containing all form fields for program creation
/*
  Used in:
  + CreateProgramRefactored.jsx: Main form fields for program creation
  
  Purpose:
  - Renders all input fields for program creation (name, dates, description, contact, slots)
  - Integrates address selection via Google Places API
  - Handles city selection with CitySelector component
  - Manages form validation and field interactions
  - Provides interface for address and city auto-selection
*/

import { Form, Input, DatePicker, Select, Row, Col } from "antd";
import dayjs from "dayjs";
import EnhancedPlacesAutocomplete from "../EnhancedPlacesAutocomplete";
import CitySelector from "./CitySelector";

const { TextArea } = Input;
const { Option } = Select;

const ProgramFormFields = ({
  selectedAddress,
  handleAddressChange,
  handlePlaceSelect,
  // City props
  citiesLoading,
  stagingCities,
  setStagingCities,
  setDeletedCityIds,
  displayCities,
  form,
  getPendingChanges,
  revertNewCity,
  revertDeletedCity,
  // Slots props
  slots,
  slotsLoading
}) => {
  return (
    <>
      <Row gutter={24}>
        <Col span={12}>
          <Form.Item
            label="Tên chương trình"
            name="proName"
            rules={[
              { required: true, message: 'Vui lòng nhập tên chương trình!' },
              { min: 5, message: 'Tên chương trình phải có ít nhất 5 ký tự!' }
            ]}
          >
            <Input placeholder="Nhập tên chương trình" />
          </Form.Item>
        </Col>

        <Col span={12}>
          <Form.Item
            label="Liên hệ"
            name="contact"
          >
            <Input placeholder="Số điện thoại hoặc email liên hệ" />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={24}>
        <Col span={12}>
          <Form.Item
            label="Ngày bắt đầu"
            name="startDate"
            rules={[{ required: true, message: 'Vui lòng chọn ngày bắt đầu!' }]}
          >
            <DatePicker
              style={{ width: '100%' }}
              placeholder="Chọn ngày bắt đầu"
              disabledDate={(current) => current && current < dayjs().startOf('day')}
            />
          </Form.Item>
        </Col>

        <Col span={12}>
          <Form.Item
            label="Ngày kết thúc"
            name="endDate"
            rules={[
              { required: true, message: 'Vui lòng chọn ngày kết thúc!' },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || !getFieldValue('startDate')) {
                    return Promise.resolve();
                  }
                  if (value.isBefore(getFieldValue('startDate'))) {
                    return Promise.reject(new Error('Ngày kết thúc phải sau ngày bắt đầu!'));
                  }
                  return Promise.resolve();
                },
              }),
            ]}
          >
            <DatePicker
              style={{ width: '100%' }}
              placeholder="Chọn ngày kết thúc"
              disabledDate={(current) => current && current < dayjs().startOf('day')}
            />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={24}>
        <Col span={12}>
          <Form.Item
            label="Địa điểm"
            name="addressInput"
            rules={[{ required: true, message: 'Vui lòng nhập địa điểm!' }]}
          >
            <EnhancedPlacesAutocomplete
              value={selectedAddress}
              onChange={handleAddressChange}
              onPlaceSelect={handlePlaceSelect}
              placeholder="Nhập địa điểm"
            />
          </Form.Item>
        </Col>

        <Col span={12}>
          <Form.Item
            label="Thành phố"
            name="cityId"
            rules={[{ required: true, message: 'Vui lòng chọn thành phố!' }]}
          >
            <CitySelector
              loading={citiesLoading}
              stagingCities={stagingCities}
              setStagingCities={setStagingCities}
              setDeletedCityIds={setDeletedCityIds}
              displayCities={displayCities}
              form={form}
              getPendingChanges={getPendingChanges}
              revertNewCity={revertNewCity}
              revertDeletedCity={revertDeletedCity}
            />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={24}>
        <Col span={24}>
          <Form.Item
            label="Khung giờ hoạt động"
            name="slotIds"
            rules={[{required: "true", message: "Vui lòng chọn khung giờ hoạt động"}]}
          >
            <Select
              mode="multiple"
              placeholder="Chọn khung giờ hoạt động"
              loading={slotsLoading}
            >
              {slots.map(slot => (
                <Option key={slot.slotID} value={slot.slotID}>
                  {slot.label}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={24}>
        <Col span={24}>
          <Form.Item
            label="Mô tả"
            name="description"
          >
            <TextArea
              rows={4}
              placeholder="Nhập mô tả chi tiết về chương trình..."
            />
          </Form.Item>
        </Col>
      </Row>
    </>
  );
};

export default ProgramFormFields;
