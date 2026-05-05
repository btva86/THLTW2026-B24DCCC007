import React, { useState } from "react";
import {
  Tabs, Card, Row, Col, Statistic, Table, Button, Form,
  Input, Select, DatePicker, Tag
} from "antd";

const { TabPane } = Tabs;

type Status = "todo" | "doing" | "done";

type Task = {
  id: string;
  title: string;
  desc: string;
  deadline: string;
  priority: string;
  status: Status;
};

export default function App() {
  const [tasks, setTasks] = useState<Task[]>([]);

  const changeStatus = (id: string, status: Status) => {
    setTasks(prev =>
      prev.map(t => t.id === id ? { ...t, status } : t)
    );
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>📋 Quản lý công việc</h1>

      <Tabs>
        <TabPane tab="Dashboard" key="1">
          <Row gutter={16}>
            <Col span={8}><Card><Statistic title="Tổng" value={tasks.length} /></Card></Col>
            <Col span={8}><Card><Statistic title="Doing" value={tasks.filter(t=>t.status==="doing").length} /></Card></Col>
            <Col span={8}><Card><Statistic title="Done" value={tasks.filter(t=>t.status==="done").length} /></Card></Col>
          </Row>
        </TabPane>

        <TabPane tab="Kanban" key="2">
          <Row gutter={16}>
            {["todo","doing","done"].map(col=>(
              <Col span={8} key={col}>
                <Card title={col.toUpperCase()}>
                  {tasks.filter(t=>t.status===col).map(t=>(
                    <Card key={t.id} style={{marginBottom:10}}>
                      <b>{t.title}</b>
                      <p>{t.desc}</p>
                      <Tag>{t.priority}</Tag>
                      <div style={{marginTop:10}}>
                        <Button onClick={()=>changeStatus(t.id,"todo")}>Todo</Button>
                        <Button onClick={()=>changeStatus(t.id,"doing")}>Doing</Button>
                        <Button onClick={()=>changeStatus(t.id,"done")}>Done</Button>
                      </div>
                    </Card>
                  ))}
                </Card>
              </Col>
            ))}
          </Row>
        </TabPane>

        <TabPane tab="Danh sách" key="3">
          <Table dataSource={tasks} rowKey="id"
            columns={[
              {title:"Tên",dataIndex:"title"},
              {title:"Deadline",dataIndex:"deadline"},
              {title:"Ưu tiên",dataIndex:"priority"},
              {title:"Trạng thái",render:(_,r)=><Tag>{r.status}</Tag>}
            ]}
          />
        </TabPane>

        <TabPane tab="Thêm task" key="4">
          <TaskForm setTasks={setTasks}/>
        </TabPane>
      </Tabs>
    </div>
  );
}

const TaskForm = ({ setTasks }: any) => {
  const [form] = Form.useForm();

  const add = async () => {
    const v = await form.validateFields();
    setTasks((prev:any)=>[
      ...prev,
      {
        id: Date.now().toString(),
        title: v.title,
        desc: v.desc,
        deadline: v.deadline.format("YYYY-MM-DD"),
        priority: v.priority,
        status: "todo"
      }
    ]);
    form.resetFields();
  };

  return (
    <Form form={form} layout="vertical">
      <Form.Item name="title" label="Tên task" rules={[{required:true}]}><Input/></Form.Item>
      <Form.Item name="desc" label="Mô tả"><Input/></Form.Item>
      <Form.Item name="deadline" label="Deadline" rules={[{required:true}]}><DatePicker style={{width:"100%"}}/></Form.Item>
      <Form.Item name="priority" label="Ưu tiên">
        <Select options={[
          {value:"Cao"},
          {value:"Trung bình"},
          {value:"Thấp"}
        ]}/>
      </Form.Item>
      <Button type="primary" onClick={add}>Thêm</Button>
    </Form>
  );
};