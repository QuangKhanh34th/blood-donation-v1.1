// Modal component for confirming program creation before submission
/*
  Used in:
  + CreateProgramRefactored.jsx: Shows confirmation dialog before final program submission
  
  Purpose:
  - Displays a summary of all program data before submission
  - Shows pending city changes (new cities to add, cities to delete)
  - Provides final review of form data, selected address, and image
  - Handles confirmation or cancellation of program creation
  - Shows loading state during submission process
*/

import { Modal, Typography, Row, Col } from "antd";

const ConfirmationModal = ({
  visible,
  onConfirm,
  onCancel,
  loading,
  pendingFormData,
  selectedPlaceData,
  selectedAddress,
  displayCities,
  slots,
  imageUrl,
  getPendingChanges,
  isEditMode = false
}) => {
  return (
    <Modal
      title={isEditMode ? "Xác nhận cập nhật chương trình" : "Xác nhận tạo chương trình"}
      open={visible}
      onOk={onConfirm}
      onCancel={onCancel}
      okText={isEditMode ? "Cập nhật chương trình" : "Tạo chương trình"}
      cancelText="Hủy"
      width={800}
      okButtonProps={{ loading }}
    >
      {pendingFormData && (
        <div>
          <Typography.Title level={4}>Thông tin chương trình:</Typography.Title>
          <div style={{ marginBottom: 20, padding: 16, backgroundColor: '#fafafa', borderRadius: 6 }}>
            <Row gutter={[16, 8]}>
              <Col span={12}>
                <strong>Tên chương trình:</strong> {pendingFormData.proName}
              </Col>
              <Col span={12}>
                <strong>Liên hệ:</strong> {pendingFormData.contact || 'Không có'}
              </Col>
              <Col span={12}>
                <strong>Ngày bắt đầu:</strong> {pendingFormData.startDate?.format('DD/MM/YYYY')}
              </Col>
              <Col span={12}>
                <strong>Ngày kết thúc:</strong> {pendingFormData.endDate?.format('DD/MM/YYYY')}
              </Col>
              <Col span={12}>
                <strong>Địa điểm:</strong> {selectedPlaceData?.formattedAddress || selectedAddress || 'Không xác định'}
              </Col>
              {selectedPlaceData?.coordinates && (
                <Col span={12}>
                  <strong>Tọa độ:</strong> {selectedPlaceData.coordinates.lat.toFixed(6)}, {selectedPlaceData.coordinates.lng.toFixed(6)}
                </Col>
              )}
              <Col span={12}>
                <strong>Thành phố:</strong> {displayCities.find(city => city.id === pendingFormData.cityId)?.name || 'Không xác định'}
              </Col>
              <Col span={24}>
                <strong>Khung giờ:</strong> {
                  pendingFormData.slotIds?.length > 0
                    ? slots.filter(slot => pendingFormData.slotIds.includes(slot.slotID)).map(slot => slot.label).join(', ')
                    : 'Không có'
                }
              </Col>
              {pendingFormData.description && (
                <Col span={24}>
                  <strong>Mô tả:</strong> {pendingFormData.description}
                </Col>
              )}
            </Row>
            <div style={{ marginTop: 12 }}>
              <strong>Hình ảnh:</strong>
              <div style={{ marginTop: 8 }}>
                <img
                  src={imageUrl || 'https://firebasestorage.googleapis.com/v0/b/seventh-dynamo-465214-j3.firebasestorage.app/o/images%2Fdonation-programs%2FPlaceholderBloodDrive.jpg?alt=media&token=6a26d6e6-4d4c-429e-97ff-0b8b1c53913b'}
                  alt="Program preview"
                  style={{
                    width: '100%',
                    maxWidth: 200,
                    height: 120,
                    objectFit: 'cover',
                    borderRadius: 4,
                    border: imageUrl ? 'none' : '1px dashed #d9d9d9'
                  }}
                />
                {!imageUrl && (
                  <div style={{ fontSize: '12px', color: '#666', marginTop: 4 }}>
                    * Sử dụng ảnh mặc định
                  </div>
                )}
              </div>
            </div>
          </div>

          {(() => {
            const changes = getPendingChanges();
            if (changes.hasChanges) {
              return (
                <div>
                  <Typography.Title level={4} style={{ color: '#fa8c16' }}>
                    Các thay đổi sẽ được áp dụng:
                  </Typography.Title>

                  {changes.newCities.length > 0 && (
                    <div style={{ marginBottom: 12 }}>
                      <Typography.Text strong style={{ color: '#52c41a' }}>
                        ✅ Thêm thành phố mới:
                      </Typography.Text>
                      <ul style={{ marginTop: 4, marginBottom: 0, paddingLeft: 20 }}>
                        {changes.newCities.map(city => (
                          <li key={city.id}>{city.name}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {changes.deletedCities.length > 0 && (
                    <div style={{ marginBottom: 12 }}>
                      <Typography.Text strong style={{ color: '#ff4d4f' }}>
                        ❌ Xóa thành phố:
                      </Typography.Text>
                      <ul style={{ marginTop: 4, marginBottom: 0, paddingLeft: 20 }}>
                        {changes.deletedCities.map(city => (
                          <li key={city.id}>{city.name}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              );
            }
            return null;
          })()}

          <div style={{ marginTop: 16, padding: 12, backgroundColor: '#e6f7ff', borderRadius: 6, border: '1px solid #91d5ff' }}>
            <Typography.Text style={{ fontSize: '13px' }}>
              ⚠️ Sau khi nhấn "{isEditMode ? 'Cập nhật chương trình' : 'Tạo chương trình'}", tất cả thay đổi sẽ được lưu vào cơ sở dữ liệu và không thể hoàn tác.
            </Typography.Text>
          </div>
        </div>
      )}
    </Modal>
  );
};

export default ConfirmationModal;
