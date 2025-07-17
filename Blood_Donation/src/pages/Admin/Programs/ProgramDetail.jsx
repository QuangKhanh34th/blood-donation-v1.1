import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Card, Descriptions, Image, Tag, Button, Row, Col, Typography, Spin, Alert, Space } from 'antd';
import { ArrowLeftOutlined, CalendarOutlined, EnvironmentOutlined, ClockCircleOutlined, EditOutlined } from '@ant-design/icons';
import { fetchProgramById } from '../../../redux/features/programSlice';
import Link from 'antd/es/typography/Link';

const { Title, Text } = Typography;

const ProgramDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const { selectedProgram, selectedLoading, selectedError } = useSelector(state => state.program);
  const { data: addresses } = useSelector(state => state.address);

  useEffect(() => {
    if (id) {
      dispatch(fetchProgramById(id));
    }
  }, [dispatch, id]);

  // Find the address for this program
  const programAddress = selectedProgram && addresses ? 
    addresses.find(addr => addr.id === selectedProgram.addressId) : null;

  const handleBack = () => {
    navigate(-1);
  };

  const handleEdit = () => {
    navigate(`/admin/programs/edit/${id}`);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('vi-VN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'ACTIVE':
        return 'green';
      case 'FINISHED':
        return 'default';
      case 'INACTIVE':
        return 'red';
      default:
        return 'default';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'NOT_STARTED':
        return 'Chưa bắt đầu';
      case 'ACTIVE':
        return 'Đang hoạt động';
      case 'FINISHED':
        return 'Đã kết thúc';
      case 'INACTIVE':
        return 'Không hoạt động';
      default:
        return status;
    }
  };

  if (selectedLoading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '400px' }}>
        <Spin size="large" />
      </div>
    );
  }

  if (selectedError) {
    return (
      <Alert
        message="Lỗi"
        description={`Không thể tải thông tin chương trình: ${selectedError}`}
        type="error"
        showIcon
        style={{ margin: '20px' }}
        action={
          <Button size="small" onClick={handleBack}>
            Quay lại
          </Button>
        }
      />
    );
  }

  if (!selectedProgram) {
    return (
      <Alert
        message="Không tìm thấy"
        description="Chương trình không tồn tại hoặc đã bị xóa."
        type="warning"
        showIcon
        style={{ margin: '20px' }}
        action={
          <Button size="small" onClick={handleBack}>
            Quay lại
          </Button>
        }
      />
    );
  }

  return (
    <div style={{ padding: '24px', background: '#f5f5f5', minHeight: '100vh' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ marginBottom: '24px' }}>
          <Button 
            icon={<ArrowLeftOutlined />} 
            onClick={handleBack}
            style={{ marginBottom: '16px' }}
          >
            Quay lại
          </Button>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Title level={2} style={{ margin: 0 }}>
              Chi tiết chương trình hiến máu
            </Title>
            <Button 
              type="primary" 
              icon={<EditOutlined />}
              onClick={handleEdit}
            >
              Chỉnh sửa
            </Button>
          </div>
        </div>

        <Row gutter={[24, 24]}>
          {/* Main Information */}
          <Col xs={24} lg={16}>
            <Card title="Thông tin chương trình" style={{ marginBottom: '24px' }}>
              <Descriptions column={1} labelStyle={{ fontWeight: 'bold', width: '200px' }}>
                <Descriptions.Item label="Tên chương trình">
                  <Text strong style={{ fontSize: '16px' }}>
                    {selectedProgram.proName}
                  </Text>
                </Descriptions.Item>
                
                <Descriptions.Item label="Trạng thái">
                  <Tag color={getStatusColor(selectedProgram.status)} style={{ fontSize: '14px' }}>
                    {getStatusText(selectedProgram.status)}
                  </Tag>
                </Descriptions.Item>

                <Descriptions.Item label="Ngày bắt đầu">
                  <Space>
                    <CalendarOutlined />
                    {formatDate(selectedProgram.startDate)}
                  </Space>
                </Descriptions.Item>

                <Descriptions.Item label="Ngày kết thúc">
                  <Space>
                    <CalendarOutlined />
                    {formatDate(selectedProgram.endDate)}
                  </Space>
                </Descriptions.Item>

                <Descriptions.Item label="Ngày tạo">
                  <Space>
                    <CalendarOutlined />
                    {formatDate(selectedProgram.dateCreated)}
                  </Space>
                </Descriptions.Item>

                {programAddress && (
                  <Descriptions.Item label="Địa chỉ">
                    <Space>
                      <EnvironmentOutlined />
                      <Link
                        href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(programAddress.name)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {programAddress.name}
                      </Link>
                    </Space>
                  </Descriptions.Item>
                )}

                {selectedProgram.contact && (
                  <Descriptions.Item label="Liên hệ">
                    {selectedProgram.contact}
                  </Descriptions.Item>
                )}

                {selectedProgram.description && (
                  <Descriptions.Item label="Mô tả">
                    <Text>{selectedProgram.description}</Text>
                  </Descriptions.Item>
                )}
              </Descriptions>
            </Card>

            {/* Time Slots */}
            {selectedProgram.slots && selectedProgram.slots.length > 0 && (
              <Card title="Khung giờ hoạt động" style={{ marginBottom: '24px' }}>
                <Row gutter={[16, 16]}>
                  {selectedProgram.slots.map((slot) => (
                    <Col xs={24} sm={12} md={8} key={slot.slotID}>
                      <Card 
                        size="small" 
                        style={{ 
                          textAlign: 'center',
                          border: '1px solid #d9d9d9',
                          borderRadius: '8px'
                        }}
                      >
                        <Space direction="vertical" size="small">
                          <ClockCircleOutlined style={{ fontSize: '20px', color: '#1890ff' }} />
                          <Text strong style={{ fontSize: '16px' }}>
                            {slot.label}
                          </Text>
                          
                        </Space>
                      </Card>
                    </Col>
                  ))}
                </Row>
              </Card>
            )}
          </Col>

          {/* Image and Additional Info */}
          <Col xs={24} lg={8}>
            {selectedProgram.imageUrl && (
              <Card title="Hình ảnh" style={{ marginBottom: '24px' }}>
                <Image
                  src={selectedProgram.imageUrl}
                  alt={selectedProgram.proName}
                  style={{ 
                    width: '100%', 
                    borderRadius: '8px',
                    objectFit: 'cover'
                  }}
                  fallback="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMIAAADDCAYAAADQvc6UAAABRWlDQ1BJQ0MgUHJvZmlsZQAAKJFjYGASSSwoyGFhYGDIzSspCnJ3UoiIjFJgf8LAwSDCIMogwMCcmFxc4BgQ4ANUwgCjUcG3awyMIPqyLsis7PPOq3QdDFcvjV3jOD1boQVTPQrgSkktTgbSf4A4LbmgqISBgTEFyFYuLykAsTuAbJEioKOA7DkgdjqEvQHEToKwj4DVhAQ5A9k3gGyB5IxEoBmML4BsnSQk8XQkNtReEOBxcfXxUQg1Mjc0dyHgXNJBSWpFCYh2zi+oLMpMzyhRcASGUqqCZ16yno6CkYGRAQMDKMwhqj/fAIcloxgHQqxAjIHBEugw5sUIsSQpBobtQPdLciLEVJYzMPBHMDBsayhILEqEO4DxG0txmrERhM29nYGBddr//5/DGRjYNRkY/l7////39v///y4Dmn+LgeHANwDrkl1AuO+pmgAAADhlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAAqACAAQAAAABAAAAwqADAAQAAAABAAAAwwAAAAD9b/HnAAAHlklEQVR4Ae3dP3Ik1RnG4W+FgYxN"
                />
              </Card>
            )}

            <Card title="Thông tin bổ sung">
              <Descriptions column={1} size="small">
                <Descriptions.Item label="ID chương trình">
                  <Text code>{selectedProgram.id}</Text>
                </Descriptions.Item>
                
                <Descriptions.Item label="ID admin">
                  <Text code>{selectedProgram.adminId}</Text>
                </Descriptions.Item>

                {programAddress && (
                  <>
                    <Descriptions.Item label="Tọa độ">
                      <Text code>
                        {programAddress.latitude}, {programAddress.longitude}
                      </Text>
                    </Descriptions.Item>
                  </>
                )}
              </Descriptions>
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default ProgramDetail;