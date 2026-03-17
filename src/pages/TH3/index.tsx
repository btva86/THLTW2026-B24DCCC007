import React, { useState } from "react";
import {
  Card,
  Select,
  DatePicker,
  TimePicker,
  Button,
  Table,
  Rate,
  Row,
  Col,
  Statistic,
  message
} from "antd";
import dayjs from "dayjs";

const { Option } = Select;

const BookingService = () => {
  // ===== DATA =====
  const [employees, setEmployees] = useState([
    { id: 1, name: "Nguyễn Văn A", limit: 5, start: 8, end: 16 },
    { id: 2, name: "Trần Thị B", limit: 4, start: 9, end: 17 },
    { id: 3, name: "Lê Văn C", limit: 6, start: 10, end: 18 }
  ]);

  const [services, setServices] = useState([
    { id: 1, name: "Cắt tóc", price: 100, duration: 30 },
    { id: 2, name: "Gội đầu", price: 50, duration: 20 },
    { id: 3, name: "Spa mặt", price: 200, duration: 60 },
    { id: 4, name: "Massage", price: 300, duration: 90 }
  ]);

  const [appointments, setAppointments] = useState<any[]>([]);

  // ===== FORM =====
  const [selectedEmp, setSelectedEmp] = useState<number | null>(null);
  const [selectedService, setSelectedService] = useState<number | null>(null);
  const [date, setDate] = useState<any>(null);
  const [time, setTime] = useState<any>(null);

  // ===== ADD EMPLOYEE =====
  const addEmployee = () => {
    const name = prompt("Tên nhân viên:");
    const limit = Number(prompt("Số khách/ngày:"));
    const start = Number(prompt("Giờ bắt đầu (vd: 9):"));
    const end = Number(prompt("Giờ kết thúc (vd: 17):"));

    if (!name) return;

    setEmployees([
      ...employees,
      { id: Date.now(), name, limit, start, end }
    ]);
  };

  // ===== ADD SERVICE =====
  const addService = () => {
    const name = prompt("Tên dịch vụ:");
    const price = Number(prompt("Giá:"));
    const duration = Number(prompt("Thời gian (phút):"));

    if (!name) return;

    setServices([
      ...services,
      { id: Date.now(), name, price, duration }
    ]);
  };

  // ===== ADD APPOINTMENT =====
  const addAppointment = () => {
    if (!selectedEmp || !selectedService || !date || !time) {
      message.error("❌ Thiếu dữ liệu!");
      return;
    }

    const emp = employees.find((e) => e.id === selectedEmp);
    const service = services.find((s) => s.id === selectedService);

    if (!emp || !service) {
      message.error("❌ Không tìm thấy dữ liệu!");
      return;
    }

    const d = dayjs(date).format("DD/MM/YYYY");
    const t = dayjs(time).format("HH:mm");
    const hour = Number(t.split(":")[0]);

    // ❌ check giờ làm
    if (hour < emp.start || hour >= emp.end) {
      message.error("❌ Ngoài giờ làm!");
      return;
    }

    // ❌ check trùng
    const duplicate = appointments.some(
      (a) =>
        a.empId === emp.id &&
        a.date === d &&
        a.time === t
    );

    if (duplicate) {
      message.error("❌ Trùng lịch!");
      return;
    }

    // ❌ check giới hạn/ngày
    const count = appointments.filter(
      (a) =>
        a.empId === emp.id &&
        a.date === d
    ).length;

    if (count >= emp.limit) {
      message.error("❌ Đã đạt giới hạn/ngày!");
      return;
    }

    const newApp = {
      id: Date.now(),
      empId: emp.id,
      empName: emp.name,
      serviceName: service.name,
      price: service.price,
      date: d,
      time: t,
      status: "Chờ duyệt",
      rating: 0
    };

    setAppointments([...appointments, newApp]);
    message.success("✅ Đặt lịch thành công!");
  };

  // ===== UPDATE STATUS =====
  const updateStatus = (id: number, status: string) => {
    setAppointments(
      appointments.map((a) =>
        a.id === id ? { ...a, status } : a
      )
    );
  };

  // ===== UPDATE RATING =====
  const updateRating = (id: number, rating: number) => {
    setAppointments(
      appointments.map((a) =>
        a.id === id ? { ...a, rating } : a
      )
    );
  };

  // ===== STATS =====
  const totalAppointments = appointments.length;

  const totalRevenue = appointments
    .filter((a) => a.status === "Hoàn thành")
    .reduce((sum, a) => sum + a.price, 0);

  // ===== TABLE =====
  const columns = [
    { title: "Nhân viên", dataIndex: "empName" },
    { title: "Dịch vụ", dataIndex: "serviceName" },
    { title: "Ngày", dataIndex: "date" },
    { title: "Giờ", dataIndex: "time" },

    {
      title: "Trạng thái",
      render: (_: any, record: any) => (
        <Select
          value={record.status}
          style={{ width: 120 }}
          onChange={(value) => updateStatus(record.id, value)}
        >
          <Option value="Chờ duyệt">Chờ duyệt</Option>
          <Option value="Xác nhận">Xác nhận</Option>
          <Option value="Hoàn thành">Hoàn thành</Option>
          <Option value="Hủy">Hủy</Option>
        </Select>
      )
    },

    {
      title: "Đánh giá",
      render: (_: any, record: any) => (
        <Rate
          value={record.rating}
          onChange={(value) => updateRating(record.id, value)}
        />
      )
    }
  ];

  return (
    <div style={{ padding: 20 }}>
      <h2>📅 Đặt lịch dịch vụ</h2>

      {/* FORM */}
      <Card style={{ marginBottom: 20 }}>
        <Row gutter={10}>
          <Col>
            <Select
              placeholder="Nhân viên"
              style={{ width: 150 }}
              onChange={(value) => setSelectedEmp(value)}
            >
              {employees.map((e) => (
                <Option key={e.id} value={e.id}>
                  {e.name}
                </Option>
              ))}
            </Select>
          </Col>

          <Col>
            <Select
              placeholder="Dịch vụ"
              style={{ width: 150 }}
              onChange={(value) => setSelectedService(value)}
            >
              {services.map((s) => (
                <Option key={s.id} value={s.id}>
                  {s.name}
                </Option>
              ))}
            </Select>
          </Col>

          <Col>
            <DatePicker onChange={(value) => setDate(value)} />
          </Col>

          <Col>
            <TimePicker
              format="HH:mm"
              onChange={(value) => setTime(value)}
            />
          </Col>

          <Col>
            <Button type="primary" onClick={addAppointment}>
              Đặt lịch
            </Button>
          </Col>
        </Row>
      </Card>

      {/* BUTTON */}
      <Button onClick={addEmployee} style={{ marginRight: 10 }}>
        + Nhân viên
      </Button>
      <Button onClick={addService}>+ Dịch vụ</Button>

      {/* TABLE */}
      <Table
        style={{ marginTop: 20 }}
        columns={columns}
        dataSource={appointments}
        rowKey="id"
      />

      {/* STATS */}
      <Row gutter={20} style={{ marginTop: 20 }}>
        <Col>
          <Statistic title="Tổng lịch" value={totalAppointments} />
        </Col>

        <Col>
          <Statistic title="Doanh thu" value={totalRevenue} />
        </Col>
      </Row>
    </div>
  );
};

export default BookingService;