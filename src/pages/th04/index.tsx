import { useState } from "react";
import { Card, Table, Tag, Button, Input, Select, Space } from "antd";
import { PlusOutlined, FileTextOutlined } from "@ant-design/icons";

const { Option } = Select;

const QuestionBank = () => {

  const [questions, setQuestions] = useState<any[]>([]);
  const [content, setContent] = useState("");
  const [subject, setSubject] = useState("");
  const [difficulty, setDifficulty] = useState("");

  const addQuestion = () => {
    if (!content) return;

    const newQ = {
      id: Date.now(),
      subject,
      content,
      difficulty,
    };

    setQuestions([...questions, newQ]);
    setContent("");
  };

  const difficultyColor = (level: string) => {
    switch (level) {
      case "Dễ":
        return "green";
      case "Trung bình":
        return "blue";
      case "Khó":
        return "orange";
      case "Rất khó":
        return "red";
      default:
        return "default";
    }
  };

  const columns = [
    {
      title: "Mã câu hỏi",
      dataIndex: "id",
    },
    {
      title: "Môn học",
      dataIndex: "subject",
    },
    {
      title: "Nội dung câu hỏi",
      dataIndex: "content",
    },
    {
      title: "Độ khó",
      dataIndex: "difficulty",
      render: (d: string) => (
        <Tag color={difficultyColor(d)}>
          {d}
        </Tag>
      ),
    },
  ];

  return (
    <div style={{ padding: 24 }}>

      <Card
        title={
          <div style={{ fontSize: 22 }}>
            📚 Ngân hàng câu hỏi
          </div>
        }
        extra={
          <Button type="primary" icon={<FileTextOutlined />}>
            Tạo đề thi
          </Button>
        }
      >

        {/* FORM THÊM CÂU HỎI */}

        <Space style={{ marginBottom: 20 }}>

          <Input
            placeholder="Nhập nội dung câu hỏi"
            style={{ width: 300 }}
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />

          <Select
            placeholder="Môn học"
            style={{ width: 150 }}
            onChange={(v) => setSubject(v)}
          >
            <Option value="Toán">Toán</Option>
            <Option value="Lập trình Web">Lập trình Web</Option>
            <Option value="Cơ sở dữ liệu">CSDL</Option>
          </Select>

          <Select
            placeholder="Độ khó"
            style={{ width: 150 }}
            onChange={(v) => setDifficulty(v)}
          >
            <Option value="Dễ">Dễ</Option>
            <Option value="Trung bình">Trung bình</Option>
            <Option value="Khó">Khó</Option>
            <Option value="Rất khó">Rất khó</Option>
          </Select>

          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={addQuestion}
          >
            Thêm câu hỏi
          </Button>

        </Space>

        {/* BẢNG */}

        <Table
          columns={columns}
          dataSource={questions}
          rowKey="id"
          pagination={{ pageSize: 5 }}
        />

      </Card>
    </div>
  );
};

export default QuestionBank;