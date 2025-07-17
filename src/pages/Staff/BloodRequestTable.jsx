import React, { useState } from "react";
import { Table, Tag, Button, Modal, Descriptions } from "antd";

const columns = [
  {
    title: "RequestID",
    dataIndex: "requestId",
    key: "requestId",
  },
  {
    title: "Total Quantity (units)",
    dataIndex: "quantity",
    key: "quantity",
    render: (units) => `${units}`,
  },
  {
    title: "Blood Type",
    dataIndex: "bloodTypes",
    key: "bloodTypes",
    render: (types) => types.map(type => <Tag key={type}>{type}</Tag>),
  },
  {
    title: "Priority Level",
    dataIndex: "priority",
    key: "priority",
    render: (priority) => (
      <Tag color={priority === "emergency" ? "red" : "blue"}>
        {priority.charAt(0).toUpperCase() + priority.slice(1)}
      </Tag>
    ),
  },
  {
    title: "Date Created",
    dataIndex: "dateCreated",
    key: "dateCreated",
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
    render: (status) => (
      <Tag color={status === "Done" ? "green" : "orange"}>
        {status}
      </Tag>
    ),
  },
];

//Mock data
const data = [
  {
    key: 1,
    requestId: "REQ001",
    quantity: 12,
    bloodTypes: ["A", "O"],
    priority: "emergency",
    dateCreated: "2025-06-12",
    status: "Pending",
  },
  {
    key: 2,
    requestId: "REQ002",
    quantity: 5,
    bloodTypes: ["AB"],
    priority: "normal",
    dateCreated: "2025-06-10",
    status: "Done",
  },
  // Add more mock data as needed
  {
    key: 3,
    requestId: "REQ003",
    quantity: 20,
    bloodTypes: ["AB", "O", "A"],
    priority: "normal",
    dateCreated: "2025-06-10",
    status: "Done",
  },
  {
    key: 4,
    requestId: "REQ004",
    quantity: 13,
    bloodTypes: ["B", "O"],
    priority: "normal",
    dateCreated: "2025-06-10",
    status: "Done",
  },
  {
    key: 5,
    requestId: "REQ005",
    quantity: 3,
    bloodTypes: ["AB"],
    priority: "normal",
    dateCreated: "2025-06-10",
    status: "Done",
  },
  {
    key: 6,
    requestId: "REQ006",
    quantity: 4,
    bloodTypes: ["A", "B"],
    priority: "emergency",
    dateCreated: "2025-06-11",
    status: "Pending",
  },
  {
    key: 7,
    requestId: "REQ007",
    quantity: 2,
    bloodTypes: ["O"],
    priority: "normal",
    dateCreated: "2025-06-09",
    status: "Pending",
  },
  {
    key: 8,
    requestId: "REQ008",
    quantity: 6,
    bloodTypes: ["AB", "A"],
    priority: "emergency",
    dateCreated: "2025-06-08",
    status: "Pending",
  },
  {
    key: 9,
    requestId: "REQ009",
    quantity: 3,
    bloodTypes: ["B", "O"],
    priority: "normal",
    dateCreated: "2025-06-07",
    status: "Pending",
  },
  {
    key: 10,
    requestId: "REQ010",
    quantity: 5,
    bloodTypes: ["A", "AB", "O"],
    priority: "emergency",
    dateCreated: "2025-06-06",
    status: "Pending",
  },
];

const BloodRequestTable = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [requests, setRequests] = useState(data);
  const [confirming, setConfirming] = useState(false);

  const handleView = (record) => {
    setSelectedRequest(record);
    setConfirming(false);
    setModalVisible(true);
  };

  const handleConfirm = (record) => {
    setSelectedRequest(record);
    setConfirming(true);
    setModalVisible(true);
  };

  const handleConfirmRequest = () => {
    if (selectedRequest) {
      setRequests((prev) =>
        prev.map((req) =>
          req.key === selectedRequest.key ? { ...req, status: "Done" } : req
        )
      );
    }
    setModalVisible(false);
    setConfirming(false);
  };

  const columnsWithAction = [
    ...columns,
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <>
          <Button type="default" onClick={() => handleView(record)} style={{ marginRight: 8 }}>
            View
          </Button>
          {record.status !== "Done" && (
            <Button type="primary" onClick={() => handleConfirm(record)}>
              Confirm
            </Button>
          )}
        </>
      ),
    },
  ];

  return (
    <>
      <Table 
        columns={columnsWithAction} 
        dataSource={requests} 
        pagination={{ pageSize: 8 }} 
      />
      <Modal
        title="Request Details"
        open={modalVisible}
        onCancel={() => { setModalVisible(false); setConfirming(false); }}
        footer={
          confirming ? (
            <>
              <Button key="cancel" onClick={() => { setModalVisible(false); setConfirming(false); }}>
                Cancel
              </Button>
              <Button key="confirm" type="primary" onClick={handleConfirmRequest}>
                Confirm Request
              </Button>
            </>
          ) : null
        }
      >
        {selectedRequest && (
          <Descriptions bordered column={1} size="small">
            <Descriptions.Item label="RequestID">
              {selectedRequest.requestId}
            </Descriptions.Item>
            <Descriptions.Item label="Total Quantity (units)">
              {selectedRequest.quantity} ({selectedRequest.quantity * 450}ml)
            </Descriptions.Item>
            <Descriptions.Item label="Blood Types">
              {selectedRequest.bloodTypes.map((type) => (
                <Tag key={type}>{type}</Tag>
              ))}
            </Descriptions.Item>
            <Descriptions.Item label="Priority Level">
              <Tag color={selectedRequest.priority === "emergency" ? "red" : "blue"}>
                {selectedRequest.priority.charAt(0).toUpperCase() + selectedRequest.priority.slice(1)}
              </Tag>
            </Descriptions.Item>
            <Descriptions.Item label="Date Created">
              {selectedRequest.dateCreated}
            </Descriptions.Item>
            <Descriptions.Item label="Status">
              <Tag color={selectedRequest.status === "Done" ? "green" : "orange"}>
                {selectedRequest.status}
              </Tag>
            </Descriptions.Item>
            <Descriptions.Item label="Blood Needed Per Type">
              {selectedRequest.bloodTypes.map((type) => (
                <div key={type}>{type}: {selectedRequest.quantity * 450}ml</div>
              ))}
            </Descriptions.Item>
          </Descriptions>
        )}
      </Modal>
    </>
  );
};

export default BloodRequestTable;