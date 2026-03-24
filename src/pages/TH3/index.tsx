import React, { useState } from "react";
import {
  Card,
  Select,
  DatePicker,
  TimePicker,
  Button,
  Table,
  message,
  Tag,
  Row,
  Col,
  Statistic,
} from "antd";
import {
  UserOutlined,
  ScissorOutlined,
  CalendarOutlined,
} from "@ant-design/icons";

const { Option } = Select;

export default function TH03() {
  // ===== DATA =====
  const [employees] = useState([
    { id: 1, name: "An", start: 8, end: 17, limit: 5 },
    { id: 2, name: "Bình", start: 9, end: 18, limit: 4 },
  ]);

  const [services] = useState([
    { id: 1, name: "Cắt tóc", price: 100000 },
    { id: 2, name: "Spa", price: 300000 },
  ]);

  const [appointments, setAppointments] = useState<any[]>([]);

  // ===== STATE =====
  const [empId, setEmpId] = useState<number | null>(null);
  const [serviceId, setServiceId] = useState<number | null>(null);
  const [date, setDate] = useState<any>(null);
  const [time, setTime] = useState<any>(null);

  // ===== ADD =====
  const addAppointment = () => {
    if (!empId || !serviceId || !date || !time) {
      return message.error("Nhập đầy đủ thông tin!");
    }

    const emp = employees.find((e) => e.id === empId);
    if (!emp) return message.error("Nhân viên không tồn tại!");

    const hour = Number(time.format("HH"));

    if (hour < emp.start || hour > emp.end) {
      return message.error("Ngoài giờ làm!");
    }

    const d = date.format("DD/MM/YYYY");
    const t = time.format("HH:mm");

    const duplicate = appointments.some(
      (a) => a.empId === empId && a.date === d && a.time === t
    );

    if (duplicate) return message.error("Trùng lịch!");

    const count = appointments.filter(
      (a) => a.empId === empId && a.date === d
    ).length;

    if (count >= emp.limit) {
      return message.error("Đã đủ khách/ngày!");
    }

    setAppointments([
      ...appointments,
      {
        id: Date.now(),
        empId,
        serviceId,
        date: d,
        time: t,
        status: "Chờ duyệt",
      },
    ]);

    message.success("Đặt lịch thành công!");
  };

  // ===== UPDATE STATUS =====
  const updateStatus = (id: number, status: string) => {
    setAppointments((prev) =>
      prev.map((a) => (a.id === id ? { ...a, status } : a))
    );
  };

  // ===== TABLE =====
  const columns = [
    {
      title: "Nhân viên",
      render: (r: any) =>
        employees.find((e) => e.id === r.empId)?.name,
    },
    {
      title: "Dịch vụ",
      render: (r: any) =>
        services.find((s) => s.id === r.serviceId)?.name,
    },
    { title: "Ngày", dataIndex: "date" },
    { title: "Giờ", dataIndex: "time" },
    {
      title: "Trạng thái",
      render: (r: any) => {
        const color =
          r.status === "Chờ duyệt"
            ? "orange"
            : r.status === "Xác nhận"
            ? "blue"
            : r.status === "Hoàn thành"
            ? "green"
            : "red";
        return <Tag color={color}>{r.status}</Tag>;
      },
    },
    {
      title: "Hành động",
      render: (r: any) => (
        <>
          <Button
            size="small"
            onClick={() => updateStatus(r.id, "Xác nhận")}
          >
            ✔ Xác nhận
          </Button>{" "}
          <Button
            size="small"
            onClick={() => updateStatus(r.id, "Hoàn thành")}
          >
            ✅ Hoàn thành
          </Button>{" "}
          <Button
            danger
            size="small"
            onClick={() => updateStatus(r.id, "Hủy")}
          >
            ❌ Hủy
          </Button>
        </>
      ),
    },
  ];

  return (
    <div style={{ padding: 20 }}>
      {/* TITLE */}
      <h2 style={{ marginBottom: 20 }}>
        <CalendarOutlined /> Hệ thống đặt lịch dịch vụ
      </h2>

      {/* DASHBOARD */}
      <Row gutter={16} style={{ marginBottom: 20 }}>
        <Col span={8}>
          <Card>
            <Statistic
              title="Tổng lịch"
              value={appointments.length}
            />
          </Card>
        </Col>

        <Col span={8}>
          <Card>
            <Statistic
              title="Hoàn thành"
              value={
                appointments.filter((a) => a.status === "Hoàn thành")
                  .length
              }
            />
          </Card>
        </Col>

        <Col span={8}>
          <Card>
            <Statistic
              title="Đã hủy"
              value={
                appointments.filter((a) => a.status === "Hủy").length
              }
            />
          </Card>
        </Col>
      </Row>

      {/* FORM */}
      <Card
        title="📝 Tạo lịch hẹn"
        style={{ marginBottom: 20, borderRadius: 12 }}
      >
        <Row gutter={10}>
          <Col span={5}>
            <Select
              placeholder="Nhân viên"
              style={{ width: "100%" }}
              onChange={setEmpId}
              suffixIcon={<UserOutlined />}
            >
              {employees.map((e) => (
                <Option key={e.id} value={e.id}>
                  {e.name}
                </Option>
              ))}
            </Select>
          </Col>

          <Col span={5}>
            <Select
              placeholder="Dịch vụ"
              style={{ width: "100%" }}
              onChange={setServiceId}
              suffixIcon={<ScissorOutlined />}
            >
              {services.map((s) => (
                <Option key={s.id} value={s.id}>
                  {s.name} ({s.price}đ)
                </Option>
              ))}
            </Select>
          </Col>

          <Col span={5}>
            <DatePicker
              style={{ width: "100%" }}
              onChange={setDate}
            />
          </Col>

          <Col span={5}>
            <TimePicker
              style={{ width: "100%" }}
              format="HH:mm"
              onChange={setTime}
            />
          </Col>

          <Col span={4}>
            <Button
              type="primary"
              block
              onClick={addAppointment}
            >
              ➕ Đặt lịch
            </Button>
          </Col>
        </Row>
      </Card>

      {/* TABLE */}
      <Card title="📋 Danh sách lịch hẹn" style={{ borderRadius: 12 }}>
        <Table
          dataSource={appointments}
          columns={columns}
          rowKey="id"
          pagination={{ pageSize: 5 }}
        />
      </Card>
    </div>
  );
}