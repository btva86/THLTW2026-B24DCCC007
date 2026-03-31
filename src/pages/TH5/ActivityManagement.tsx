import React, { useState } from "react";
import {
  Table,
  Button,
  Space,
  Modal,
  Form,
  Input,
  DatePicker,
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

const ActivityManagement = () => {
  const [data, setData] = useState<any[]>([]);
  const [visible, setVisible] = useState(false);
  const [viewVisible, setViewVisible] = useState(false);
  const [editing, setEditing] = useState<any>(null);

  const [form] = Form.useForm();

  const columns = [
    {
      title: "Tên hoạt động",
      dataIndex: "name"
    },
    {
      title: "CLB",
      dataIndex: "club"
    },
    {
      title: "Ngày",
      dataIndex: "date"
    },
    {
      title: "Địa điểm",
      dataIndex: "location"
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
        ...values,
        date: values.date
          ? values.date.format("DD/MM/YYYY")
          : ""
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
          Quản lý Hoạt động
        </Title>

        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => setVisible(true)}
        >
          Thêm hoạt động
        </Button>
      </Row>

      <Table
        columns={columns}
        dataSource={data}
        style={{ marginTop: 20 }}
      />

      <Modal
        title="Hoạt động"
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
            label="Tên hoạt động"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="club"
            label="CLB"
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="date"
            label="Ngày"
          >
            <DatePicker
              style={{ width: "100%" }}
            />
          </Form.Item>

          <Form.Item
            name="location"
            label="Địa điểm"
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>

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
              <b>CLB:</b> {editing.club}
            </p>
            <p>
              <b>Ngày:</b> {editing.date}
            </p>
            <p>
              <b>Địa điểm:</b> {editing.location}
            </p>
          </>
        )}
      </Modal>
    </Card>
  );
};

export default ActivityManagement;