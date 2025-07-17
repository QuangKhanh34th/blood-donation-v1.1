// Component for selecting, adding, and managing cities during program creation
/*
  Used in:
  + ProgramFormFields.jsx: City selection dropdown with management capabilities
  
  Purpose:
  - Provides dropdown for selecting cities from available list
  - Allows adding new cities that don't exist in the database
  - Enables marking cities for deletion (soft delete)
  - Shows pending changes modal for reviewing city modifications
  - Integrates with useCityManagement hook for state management
  - Handles city validation and duplicate prevention
*/

import { useState } from "react";
import { Select, Divider, Space, Input, Button, Modal, Typography } from "antd";
import { PlusOutlined, DeleteOutlined } from "@ant-design/icons";

const { Option } = Select;

const CitySelector = ({
  value,
  onChange,
  loading,
  stagingCities,
  setStagingCities,
  setDeletedCityIds,
  displayCities,
  form,
  getPendingChanges,
  revertNewCity,
  revertDeletedCity
}) => {
  const [newCityName, setNewCityName] = useState("");
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [changesModalVisible, setChangesModalVisible] = useState(false);

  // Handle adding new city (staging only)
  const handleAddCity = () => {
    if (!newCityName.trim()) {
      return;
    }

    const tempId = Date.now();
    const newCity = { id: tempId, name: newCityName, isStaging: true };
    setStagingCities(prev => [...prev, newCity]);
    setNewCityName("");
  };

  // Handle deleting city, removes a staging city or marks an existing city for deletion.
  const handleDeleteCity = (cityId) => {
    const cityToDelete = stagingCities.find(city => city.id === cityId);

    if (cityToDelete?.isStaging) {
      setStagingCities(prev => prev.filter(city => city.id !== cityId));
    } else {
      setDeletedCityIds(prev => [...prev, cityId]);
    }

    // Clear form selection if the deleted city was selected
    const currentCityId = form.getFieldValue('cityId');
    if (currentCityId === cityId) {
      form.setFieldValue('cityId', undefined);
    }
  };

  return (
    <>
      <Select
        placeholder="Chọn thành phố"
        loading={loading}
        value={value}
        onChange={onChange}
        dropdownRender={menu => (
          <>
            {menu}
            <Divider style={{ margin: '8px 0' }} />
            <Space style={{ padding: '0 8px 4px', width: '100%' }}>
              <Input
                placeholder="Nhập tên thành phố mới"
                value={newCityName}
                onChange={(e) => setNewCityName(e.target.value)}
                onPressEnter={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  if (isInputFocused && newCityName.trim()) {
                    handleAddCity();
                  }
                }}
                onFocus={() => setIsInputFocused(true)}
                onBlur={() => setIsInputFocused(false)}
                style={{ flex: 1 }}
              />
              <Button
                type="text"
                icon={<PlusOutlined />}
                onClick={handleAddCity}
                disabled={!newCityName.trim()}
              >
                Thêm
              </Button>
              {getPendingChanges().hasChanges && (
                <Button
                  type="link"
                  size="small"
                  onClick={() => setChangesModalVisible(true)}
                >
                  Xem thay đổi ({getPendingChanges().newCities.length + getPendingChanges().deletedCities.length})
                </Button>
              )}
            </Space>
          </>
        )}
      >
        {displayCities.map(city => (
          <Option key={city.id} value={city.id}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span>{city.name}</span>
              <DeleteOutlined
                style={{ color: 'red', fontSize: '12px' }}
                onClick={(e) => {
                  // stops the click on the delete icon from also triggering the dropdown's selection logic
                  e.stopPropagation(); 
                  handleDeleteCity(city.id);
                }}
              />
            </div>
          </Option>
        ))}
      </Select>

      {/* Changes Review Modal */}
      <Modal
        title="Quản lý thay đổi"
        open={changesModalVisible}
        onCancel={() => setChangesModalVisible(false)}
        footer={[
          <Button key="close" onClick={() => setChangesModalVisible(false)}>
            Đóng
          </Button>
        ]}
        width={700}
      >
        {(() => {
          const changes = getPendingChanges();
          return (
            <div>
              {changes.newCities.length > 0 && (
                <div style={{ marginBottom: 16 }}>
                  <Typography.Text strong style={{ color: '#52c41a' }}>
                    Thành phố mới sẽ được thêm:
                  </Typography.Text>
                  <div style={{ marginTop: 8 }}>
                    {changes.newCities.map(city => (
                      <div key={city.id} style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        padding: '8px 12px',
                        margin: '4px 0',
                        backgroundColor: '#f6ffed',
                        border: '1px solid #b7eb8f',
                        borderRadius: '4px'
                      }}>
                        <span>{city.name}</span>
                        <Button
                          size="small"
                          danger
                          onClick={() => revertNewCity(city.id)}
                        >
                          Hoàn tác
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {changes.deletedCities.length > 0 && (
                <div style={{ marginBottom: 16 }}>
                  <Typography.Text strong style={{ color: '#ff4d4f' }}>
                    Thành phố sẽ bị xóa:
                  </Typography.Text>
                  <div style={{ marginTop: 8 }}>
                    {changes.deletedCities.map(city => (
                      <div key={city.id} style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        padding: '8px 12px',
                        margin: '4px 0',
                        backgroundColor: '#fff2f0',
                        border: '1px solid #ffccc7',
                        borderRadius: '4px'
                      }}>
                        <span>{city.name}</span>
                        <Button
                          size="small"
                          onClick={() => revertDeletedCity(city.id)}
                        >
                          Hoàn tác
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {!changes.hasChanges && (
                <Typography.Text>Không có thay đổi nào.</Typography.Text>
              )}

              <div style={{ marginTop: 16, padding: 12, backgroundColor: '#f6f8fa', borderRadius: 6 }}>
                <Typography.Text type="secondary" style={{ fontSize: '12px' }}>
                  💡 Các thay đổi này chỉ được áp dụng khi bạn tạo chương trình thành công.
                </Typography.Text>
              </div>
            </div>
          );
        })()}
      </Modal>
    </>
  );
};

export default CitySelector;
