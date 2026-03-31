import React, { useState } from "react";
import {
  Table,
  Button,
  Space,
  Modal,
  Form,
  Input,
  DatePicker,
  Tag,
  Card,
  Typography,
  Row,
  message,
} from "antd";

import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  EyeOutlined,
  CheckOutlined,
  CloseOutlined,
} from "@ant-design/icons";

const { Title } = Typography;

interface Club {
  key: number;
  name: string;
  date: string;
  desc: string;
  avatar: string;
  status: string;
}

const ClubManagement = () => {
  const [data, setData] = useState<Club[]>([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [open, setOpen] = useState(false);

  const [form] = Form.useForm();

  const columns = [
    {
      title: "Ảnh",
      dataIndex: "avatar",
      render: (text: string) => (
        <img
          src={text}
          alt="avatar"
          style={{
            width: 50,
            height: 50,
            borderRadius: 8,
            objectFit: "cover",
          }}
        />
      ),
    },
    {
      title: "Tên CLB",
      dataIndex: "name",
    },
    {
      title: "Ngày thành lập",
      dataIndex: "date",
    },
    {
      title: "Mô tả",
      dataIndex: "desc",
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      render: (status: string) =>
        status === "approved" ? (
          <Tag color="green">Đã duyệt</Tag>
        ) : status === "rejected" ? (
          <Tag color="red">Từ chối</Tag>
        ) : (
          <Tag color="orange">Chờ duyệt</Tag>
        ),
    },
    {
      title: "Hành động",
      render: (_: any, record: Club) => (
        <Space>
          <Button icon={<EyeOutlined />} />

          <Button icon={<EditOutlined />} />

          <Button
            danger
            icon={<DeleteOutlined />}
            onClick={() =>
              setData(data.filter((item) => item.key !== record.key))
            }
          />
        </Space>
      ),
    },
  ];

  const rowSelection = {
    selectedRowKeys,
    onChange: (keys: React.Key[]) => {
      setSelectedRowKeys(keys);
    },
  };

  const handleAdd = () => {
    form.validateFields().then((values) => {
      const newData: Club = {
        key: Date.now(),
        name: values.name,
        desc: values.desc,
        date: values.date.format("DD/MM/YYYY"),
        avatar: "https://i.pravatar.cc/150?img=5",
        status: "pending",
      };

      setData([...data, newData]);

      setOpen(false);
      form.resetFields();

      message.success("Thêm thành công");
    });
  };

  const approveSelected = () => {
    const newData = data.map((item) =>
      selectedRowKeys.includes(item.key)
        ? { ...item, status: "approved" }
        : item
    );

    setData(newData);
    message.success("Đã duyệt");
  };

  const rejectSelected = () => {
    const newData = data.map((item) =>
      selectedRowKeys.includes(item.key)
        ? { ...item, status: "rejected" }
        : item
    );

    setData(newData);
    message.success("Đã từ chối");
  };

  return (
    <Card>
      <Row justify="space-between" style={{ marginBottom: 20 }}>
        <Title level={3}>Quản lý câu lạc bộ</Title>

        <Space>
          <Button
            type="primary"
            icon={<CheckOutlined />}
            onClick={approveSelected}
          >
            Duyệt
          </Button>

          <Button
            danger
            icon={<CloseOutlined />}
            onClick={rejectSelected}
          >
            Từ chối
          </Button>

          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => setOpen(true)}
          >
            Thêm CLB
          </Button>
        </Space>
      </Row>

      <Table
        rowSelection={rowSelection}
        columns={columns}
        dataSource={data}
      />

      <Modal
        title="Thêm câu lạc bộ"
        visible={open}
        onOk={handleAdd}
        onCancel={() => setOpen(false)}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="name"
            label="Tên CLB"
            rules={[{ required: true, message: "Nhập tên CLB" }]}
          >
            <Input placeholder="Nhập tên câu lạc bộ" />
          </Form.Item>

          <Form.Item
            name="date"
            label="Ngày thành lập"
            rules={[{ required: true, message: "Chọn ngày" }]}
          >
            <DatePicker style={{ width: "100%" }} />
          </Form.Item>

          <Form.Item
            name="desc"
            label="Mô tả"
          >
            <Input.TextArea placeholder="Nhập mô tả" />
          </Form.Item>
        </Form>
      </Modal>
    </Card>
  );
};

export default ClubManagement;