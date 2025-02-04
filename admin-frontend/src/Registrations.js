import React, { useEffect, useState } from "react";
import { Table, Button, Tag, message, Spin } from "antd";
import useAdminActions from "./hooks/useAdminApi";

const Registrations = () => {
  const { loading, error, fetchFarmers, updateFarmerStatus } = useAdminActions();
  const [farmers, setFarmers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchFarmers();
        console.log("Fetched Farmers:", response);
        setFarmers(response || []); // Ensure it's always an array
      } catch (e) {
        console.error("Error fetching farmers:", e);
      }
    };
    fetchData();
  }, []);

  const handleApprove = async (id) => {
    try {
      await updateFarmerStatus(id, "Approved");
      message.success("Registration approved!");
      setFarmers((prev) =>
        prev.map((farmer) =>
          farmer.id === id ? { ...farmer, status: "approved" } : farmer
        )
      );
    } catch (error) {
      message.error("Error approving registration");
    }
  };

  const handleReject = async (id) => {
    try {
      await updateFarmerStatus(id, "Rejected");
      message.success("Registration rejected!");
      setFarmers((prev) =>
        prev.map((farmer) =>
          farmer.id === id ? { ...farmer, status: "rejected" } : farmer
        )
      );
    } catch (error) {
      message.error("Error rejecting registration");
    }
  };

  const columns = [
    { title: "Farmer Name", dataIndex: "name", key: "name" },
    { title: "Phone", dataIndex: "phone", key: "phone" },
    {
      title: "Status",
      dataIndex: "verificationStatus",
      key: "verificationStatus",
      render: (status) => {
        const statusText = status ? status.toUpperCase() : "UNKNOWN"; // Prevents undefined error
        const color =
          status === "Pending"
            ? "orange"
            : status === "Approved"
            ? "green"
            : status === "Rejected"
            ? "red"
            : "gray";

        return <Tag color={color}>{statusText}</Tag>;
      },
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <>
          <Button
            type="primary"
            onClick={() => handleApprove(record._id)}
            disabled={record.verificationStatus == "Approved"}
            style={{ marginRight: 8 }}
          >
            Approve
          </Button>
          <Button
            type="danger"
            onClick={() => handleReject(record._id)}
            disabled={record.verificationStatus == "Rejected"}
          >
            Reject
          </Button>
        </>
      ),
    },
  ];

  if (loading) return <Spin size="large" />;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return <Table columns={columns} dataSource={farmers} rowKey="id" />;
};

export default Registrations;
