import React, { useState } from 'react';
import {
  Tabs,
  Card,
  Input,
  Button,
  Table,
  Row,
  Col,
  Space,
  Typography,
  Divider,
  message,
} from 'antd';

const { TabPane } = Tabs;
const { Title } = Typography;

export default () => {
  // ===== STATE =====
  const [year, setYear] = useState('');
  const [soVB, setSoVB] = useState<any[]>([]);

  const [soQD, setSoQD] = useState('');
  const [qd, setQD] = useState<any[]>([]);

  const [name, setName] = useState('');
  const [msv, setMSV] = useState('');
  const [vanBang, setVanBang] = useState<any[]>([]);

  const [search, setSearch] = useState('');
  const [result, setResult] = useState<any[]>([]);

  // ===== FUNCTION =====
  const addSo = () => {
    if (!year) return message.error('Nhập năm!');
    setSoVB([...soVB, { id: Date.now(), year, count: 0 }]);
    setYear('');
  };

  const addQD = () => {
    if (!soQD) return message.error('Nhập số QĐ!');
    setQD([...qd, { id: Date.now(), soQD, date: new Date().toLocaleDateString() }]);
    setSoQD('');
  };

  const addVB = () => {
    if (!name || !msv) return message.error('Nhập đủ thông tin!');
    setVanBang([...vanBang, { id: Date.now(), name, msv }]);
    setName('');
    setMSV('');
  };

  const handleSearch = () => {
    if (!search) return message.error('Nhập từ khóa!');
    const filtered = vanBang.filter(
      (v) =>
        v.name.toLowerCase().includes(search.toLowerCase()) ||
        v.msv.includes(search)
    );
    setResult(filtered);
  };

  // ===== UI =====
  return (
    <div style={{ padding: 20 }}>
      <Card
        style={{ borderRadius: 12 }}
        bodyStyle={{ padding: 24 }}
      >
        <Title level={3} style={{ textAlign: 'center' }}>
          🎓 Hệ thống quản lý văn bằng
        </Title>

        <Divider />

        <Tabs defaultActiveKey="1" centered>

          {/* ===== SỔ VĂN BẰNG ===== */}
          <TabPane tab="📚 Sổ văn bằng" key="1">
            <Card bordered={false}>
              <Space direction="vertical" style={{ width: '100%' }} size="large">

                <Row gutter={16}>
                  <Col span={8}>
                    <Input
                      placeholder="Nhập năm"
                      value={year}
                      onChange={(e) => setYear(e.target.value)}
                    />
                  </Col>
                  <Col>
                    <Button type="primary" onClick={addSo}>
                      ➕ Thêm
                    </Button>
                  </Col>
                </Row>

                <Table
                  bordered
                  dataSource={soVB}
                  rowKey="id"
                  pagination={{ pageSize: 5 }}
                  columns={[
                    { title: 'Năm', dataIndex: 'year' },
                    { title: 'Số lượng văn bằng', dataIndex: 'count' },
                  ]}
                />

              </Space>
            </Card>
          </TabPane>

          {/* ===== QUYẾT ĐỊNH ===== */}
          <TabPane tab="📄 Quyết định" key="2">
            <Card bordered={false}>
              <Space direction="vertical" style={{ width: '100%' }} size="large">

                <Row gutter={16}>
                  <Col span={8}>
                    <Input
                      placeholder="Số quyết định"
                      value={soQD}
                      onChange={(e) => setSoQD(e.target.value)}
                    />
                  </Col>
                  <Col>
                    <Button type="primary" onClick={addQD}>
                      ➕ Thêm
                    </Button>
                  </Col>
                </Row>

                <Table
                  bordered
                  dataSource={qd}
                  rowKey="id"
                  pagination={{ pageSize: 5 }}
                  columns={[
                    { title: 'Số QĐ', dataIndex: 'soQD' },
                    { title: 'Ngày ban hành', dataIndex: 'date' },
                  ]}
                />

              </Space>
            </Card>
          </TabPane>

          {/* ===== VĂN BẰNG ===== */}
          <TabPane tab="🎓 Văn bằng" key="3">
            <Card bordered={false}>
              <Space direction="vertical" style={{ width: '100%' }} size="large">

                <Row gutter={16}>
                  <Col span={6}>
                    <Input
                      placeholder="Tên sinh viên"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </Col>

                  <Col span={6}>
                    <Input
                      placeholder="Mã sinh viên"
                      value={msv}
                      onChange={(e) => setMSV(e.target.value)}
                    />
                  </Col>

                  <Col>
                    <Button type="primary" onClick={addVB}>
                      ➕ Thêm
                    </Button>
                  </Col>
                </Row>

                <Table
                  bordered
                  dataSource={vanBang}
                  rowKey="id"
                  pagination={{ pageSize: 5 }}
                  columns={[
                    { title: 'Tên sinh viên', dataIndex: 'name' },
                    { title: 'MSV', dataIndex: 'msv' },
                  ]}
                />

              </Space>
            </Card>
          </TabPane>

          {/* ===== TRA CỨU ===== */}
          <TabPane tab="🔍 Tra cứu" key="4">
            <Card bordered={false}>
              <Space direction="vertical" style={{ width: '100%' }} size="large">

                <Row gutter={16}>
                  <Col span={8}>
                    <Input
                      placeholder="Nhập tên hoặc MSV"
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                    />
                  </Col>
                  <Col>
                    <Button type="primary" onClick={handleSearch}>
                      🔍 Tìm kiếm
                    </Button>
                  </Col>
                </Row>

                <Table
                  bordered
                  dataSource={result}
                  rowKey="id"
                  pagination={{ pageSize: 5 }}
                  columns={[
                    { title: 'Tên sinh viên', dataIndex: 'name' },
                    { title: 'MSV', dataIndex: 'msv' },
                  ]}
                />

              </Space>
            </Card>
          </TabPane>

        </Tabs>
      </Card>
    </div>
  );
};