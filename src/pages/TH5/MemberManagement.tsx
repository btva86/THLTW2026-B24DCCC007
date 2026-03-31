import React, { useState } from "react";
import {
  Table,
  Button,
  Space,
  Modal,
  Form,
  Input,
  Select,
  Tag,
  Card,
  Typography,
  Row
} from "antd";

import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  EyeOutlined
} from "@ant-design/icons";

const { Title } = Typography;

const MemberManagement = () => {
  const [data, setData] = useState<any[]>([]);
  const [visible, setVisible] = useState(false);
  const [viewVisible, setViewVisible] = useState(false);
  const [editing, setEditing] = useState<any>(null);
  const [form] = Form.useForm();

  const columns = [
    {
      title: "Tên",
      dataIndex: "name"
    },
    {
      title: "Email",
      dataIndex: "email"
    },
    {
      title: "SĐT",
      dataIndex: "phone"
    },
    {
      title: "Vai trò",
      dataIndex: "role",
      render: (role: any) => (
        <Tag color={role === "Leader" ? "blue" : "green"}>
          {role}
        </Tag>
      )
    },
    {
      title: "CLB",
      dataIndex: "club"
    },
    {
      title: "Hành động",
      render: (_: any, record: any) => (
        <Space>
          <Button
            icon={<EyeOutlined />}
            onClick={() => {
              setEditing(record);
              setViewVisible(true);
            }}
          />

          <Button
            icon={<EditOutlined />}
            onClick={() => {
              setEditing(record);
              form.setFieldsValue(record);
              setVisible(true);
            }}
          />

          <Button
            danger
            icon={<DeleteOutlined />}
            onClick={() =>
              setData(data.filter(i => i.key !== record.key))
            }
          />
        </Space>
      )
    }
  ];

  const submit = () => {
    form.validateFields().then(values => {
      const newData = {
        key: editing?.key || Date.now(),
        ...values
      };

      if (editing) {
        setData(
          data.map(i =>
            i.key === editing.key ? newData : i
          )
        );
      } else {
        setData([...data, newData]);
      }

      setVisible(false);
      setEditing(null);
      form.resetFields();
    });
  };

  return (
    <Card>
      <Row justify="space-between">
        <Title level={3}>
          Quản lý Thành viên
        </Title>

        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => setVisible(true)}
        >
          Thêm thành viên
        </Button>
      </Row>

      <Table
        columns={columns}
        dataSource={data}
        style={{ marginTop: 20 }}
      />

      {/* Modal thêm sửa */}

      <Modal
        title="Thành viên"
        visible={visible}
        onOk={submit}
        onCancel={() => setVisible(false)}
      >
        <Form
          form={form}
          layout="vertical"
        >
          <Form.Item
            name="name"
            label="Tên"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="email"
            label="Email"
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="phone"
            label="SĐT"
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="role"
            label="Vai trò"
          >
            <Select
              options={[
                { value: "Leader" },
                { value: "Member" }
              ]}
            />
          </Form.Item>

          <Form.Item
            name="club"
            label="Câu lạc bộ"
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>

      {/* Modal xem */}

      <Modal
        title="Chi tiết"
        visible={viewVisible}
        footer={null}
        onCancel={() => setViewVisible(false)}
      >
        {editing && (
          <>
            <p>
              <b>Tên:</b> {editing.name}
            </p>
            <p>
              <b>Email:</b> {editing.email}
            </p>
            <p>
              <b>SĐT:</b> {editing.phone}
            </p>
            <p>
              <b>Vai trò:</b> {editing.role}
            </p>
            <p>
              <b>CLB:</b> {editing.club}
            </p>
          </>
        )}
      </Modal>
    </Card>
  );
};

export default MemberManagement;