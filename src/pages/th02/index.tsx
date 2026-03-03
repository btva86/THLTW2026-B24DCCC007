import React, { useState, useEffect } from 'react';
import {
  Card,
  Input,
  InputNumber,
  Button,
  Typography,
  Space,
  List,
  Progress,
  Row,
  Col,
} from 'antd';

const { Title } = Typography;

interface Subject {
  id: number;
  name: string;
  goal: number;
  hours: number;
}

const th02 = () => {
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [name, setName] = useState('');
  const [goal, setGoal] = useState<number | null>(null);

  useEffect(() => {
    const data = localStorage.getItem('subjects');
    if (data) setSubjects(JSON.parse(data));
  }, []);

  useEffect(() => {
    localStorage.setItem('subjects', JSON.stringify(subjects));
  }, [subjects]);

  const addSubject = () => {
    if (!name || !goal) return;

    const newSubject: Subject = {
      id: Date.now(),
      name,
      goal,
      hours: 0,
    };

    setSubjects([...subjects, newSubject]);
    setName('');
    setGoal(null);
  };

  const addHour = (id: number) => {
    const updated = subjects.map((s) =>
      s.id === id ? { ...s, hours: s.hours + 1 } : s
    );
    setSubjects(updated);
  };

  const deleteSubject = (id: number) => {
    setSubjects(subjects.filter((s) => s.id !== id));
  };

  return (
    <Row justify="center" style={{ marginTop: 40 }}>
      <Col xs={24} sm={22} md={18} lg={14}>
        <Card>
          <Title level={2} style={{ textAlign: 'center' }}>
            📚 Quản lý học tập
          </Title>

          {/* Form thêm môn học */}
          <Row justify="center" style={{ marginBottom: 30 }}>
            <Space>
              <Input
                placeholder="Tên môn học"
                value={name}
                onChange={(e) => setName(e.target.value)}
                style={{ width: 200 }}
              />
              <InputNumber
                placeholder="Mục tiêu giờ/tháng"
                value={goal ?? undefined}
                onChange={(value) => setGoal(value)}
                style={{ width: 180 }}
              />
              <Button type="primary" onClick={addSubject}>
                Thêm
              </Button>
            </Space>
          </Row>

          {/* Danh sách môn */}
          <List
            bordered
            dataSource={subjects}
            renderItem={(item) => {
              const percent = Math.min(
                Math.round((item.hours / item.goal) * 100),
                100
              );

              return (
                <List.Item
                  actions={[
                    <Button onClick={() => addHour(item.id)}>+1 giờ</Button>,
                    <Button danger onClick={() => deleteSubject(item.id)}>
                      Xóa
                    </Button>,
                  ]}
                >
                  <div style={{ width: '100%' }}>
                    <b>{item.name}</b>
                    <Progress percent={percent} />
                    <div>
                      {item.hours} / {item.goal} giờ
                    </div>
                  </div>
                </List.Item>
              );
            }}
          />
        </Card>
      </Col>
    </Row>
  );
};

export default th02;