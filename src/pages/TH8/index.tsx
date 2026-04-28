import React, { useEffect, useState } from "react";
import {
  Tabs, Card, Row, Col, Statistic, Table, Button, Modal, Form,
  Input, Select, DatePicker, InputNumber, Popconfirm, Tag,
  Progress, message
} from "antd";

const { TabPane } = Tabs;

// ===== TYPES =====
type Workout = {
  id: number;
  date: string;
  type: string;
  duration: number;
  calories: number;
  status: string;
};

type Health = {
  id: number;
  date: string;
  weight: number;
  height: number;
};

type Goal = {
  id: number;
  name: string;
  type: string;
  target: number;
  current: number;
  deadline: string;
  status: string;
};

type Exercise = {
  id: number;
  name: string;
  group: string;
  level: string;
  desc: string;
  calories: number;
};

// ===== MAIN =====
export default function App() {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [healths, setHealths] = useState<Health[]>([]);
  const [goals, setGoals] = useState<Goal[]>([]);
  const [exercises, setExercises] = useState<Exercise[]>([]);

  useEffect(() => {
    setWorkouts(JSON.parse(localStorage.getItem("workouts") || "[]"));
    setHealths(JSON.parse(localStorage.getItem("healths") || "[]"));
    setGoals(JSON.parse(localStorage.getItem("goals") || "[]"));
    setExercises(JSON.parse(localStorage.getItem("exercises") || "[]"));
  }, []);

  useEffect(() => localStorage.setItem("workouts", JSON.stringify(workouts)), [workouts]);
  useEffect(() => localStorage.setItem("healths", JSON.stringify(healths)), [healths]);
  useEffect(() => localStorage.setItem("goals", JSON.stringify(goals)), [goals]);
  useEffect(() => localStorage.setItem("exercises", JSON.stringify(exercises)), [exercises]);

  return (
    <div style={{ padding: 20 }}>
      <h1 style={{ textAlign: "center" }}>🏋️ Ứng dụng theo dõi sức khỏe</h1>

      <Tabs>
        <TabPane tab="📊 Trang chủ" key="1">
          <Dashboard workouts={workouts} goals={goals} />
        </TabPane>

        <TabPane tab="📒 Nhật ký tập" key="2">
          <WorkoutLog workouts={workouts} setWorkouts={setWorkouts} />
        </TabPane>

        <TabPane tab="💓 Sức khỏe" key="3">
          <HealthLog healths={healths} setHealths={setHealths} />
        </TabPane>

        <TabPane tab="🎯 Mục tiêu" key="4">
          <GoalManager goals={goals} setGoals={setGoals} />
        </TabPane>

        <TabPane tab="📚 Bài tập" key="5">
          <ExerciseLibrary exercises={exercises} setExercises={setExercises} />
        </TabPane>
      </Tabs>
    </div>
  );
}

// ===== DASHBOARD =====
const Dashboard = ({ workouts, goals }: any) => (
  <Row gutter={16}>
    <Col span={8}><Card><Statistic title="Buổi tập" value={workouts.length} /></Card></Col>
    <Col span={8}><Card><Statistic title="Mục tiêu" value={goals.length} /></Card></Col>
    <Col span={8}><Card><Statistic title="Hoàn thành" value={goals.filter((g:any)=>g.status==="Đã đạt").length} /></Card></Col>
  </Row>
);

// ===== WORKOUT =====
const WorkoutLog = ({ workouts, setWorkouts }: any) => {
  const [open, setOpen] = useState(false);
  const [form] = Form.useForm();

  const add = async () => {
    try {
      const v = await form.validateFields();
      setWorkouts([...workouts, {
        id: Date.now(),
        date: v.date.format("YYYY-MM-DD"),
        ...v
      }]);
      setOpen(false);
      form.resetFields();
    } catch {}
  };

  return (
    <>
      <Button type="primary" onClick={() => setOpen(true)}>➕ Thêm</Button>

      <Table dataSource={workouts} rowKey="id" style={{ marginTop: 20 }}
        columns={[
          { title: "Ngày", dataIndex: "date" },
          { title: "Loại", dataIndex: "type" },
          { title: "Phút", dataIndex: "duration" },
          { title: "Calo", dataIndex: "calories" },
          { title: "Trạng thái", dataIndex: "status" }
        ]}
      />

      <Modal visible={open} onOk={add} onCancel={()=>setOpen(false)} title="Thêm buổi tập">
        <Form form={form} layout="vertical">
          <Form.Item name="date" label="Ngày" rules={[{ required: true }]}><DatePicker style={{width:"100%"}}/></Form.Item>
          <Form.Item name="type" label="Loại" rules={[{ required: true }]}><Input/></Form.Item>
          <Form.Item name="duration" label="Phút"><InputNumber style={{width:"100%"}}/></Form.Item>
          <Form.Item name="calories" label="Calo"><InputNumber style={{width:"100%"}}/></Form.Item>
          <Form.Item name="status" label="Trạng thái"><Select options={[{value:"Hoàn thành"},{value:"Bỏ"}]}/></Form.Item>
        </Form>
      </Modal>
    </>
  );
};

// ===== HEALTH =====
const HealthLog = ({ healths, setHealths }: any) => {
  const [open,setOpen]=useState(false);
  const [form]=Form.useForm();

  const bmi=(w:number,h:number)=> (w/((h/100)**2)).toFixed(1);

  const add=async()=>{
    const v=await form.validateFields();
    setHealths([...healths,{
      id:Date.now(),
      date:v.date.format("YYYY-MM-DD"),
      weight:v.weight,
      height:v.height
    }]);
    setOpen(false);
  };

  return (
    <>
      <Button onClick={()=>setOpen(true)}>➕ Thêm</Button>

      <Table dataSource={healths} rowKey="id"
        columns={[
          {title:"Ngày",dataIndex:"date"},
          {title:"Cân nặng",dataIndex:"weight"},
          {title:"Chiều cao",dataIndex:"height"},
          {title:"BMI",render:(_:any,r:Health)=>bmi(r.weight,r.height)}
        ]}
      />

      <Modal visible={open} onOk={add} onCancel={()=>setOpen(false)}>
        <Form form={form} layout="vertical">
          <Form.Item name="date" label="Ngày" rules={[{required:true}]}><DatePicker style={{width:"100%"}}/></Form.Item>
          <Form.Item name="weight" label="Cân nặng" rules={[{required:true}]}><InputNumber style={{width:"100%"}}/></Form.Item>
          <Form.Item name="height" label="Chiều cao" rules={[{required:true}]}><InputNumber style={{width:"100%"}}/></Form.Item>
        </Form>
      </Modal>
    </>
  );
};

// ===== GOALS FULL =====
const GoalManager = ({ goals, setGoals }: any) => {
  const [open,setOpen]=useState(false);
  const [form]=Form.useForm();

  const add=async()=>{
    const v=await form.validateFields();
    setGoals([...goals,{
      id:Date.now(),
      ...v,
      deadline:v.deadline.format("YYYY-MM-DD"),
      status:"Đang thực hiện"
    }]);
    setOpen(false);
  };

  const remove=(id:number)=>{
    setGoals(goals.filter((g:Goal)=>g.id!==id));
  };

  return (
    <>
      <Button type="primary" onClick={()=>setOpen(true)}>➕ Thêm mục tiêu</Button>

      <Row gutter={16} style={{marginTop:20}}>
        {goals.map((g:Goal)=>(
          <Col span={8} key={g.id}>
            <Card
              title={g.name}
              extra={
                <Popconfirm title="Xóa?" onConfirm={()=>remove(g.id)}>
                  <Button danger size="small">Xóa</Button>
                </Popconfirm>
              }
            >
              <p>Loại: {g.type}</p>
              <p>Deadline: {g.deadline}</p>
              <Progress percent={g.target ? (g.current/g.target)*100 : 0}/>
              <Tag color={g.status==="Đã đạt"?"green":"blue"}>{g.status}</Tag>
            </Card>
          </Col>
        ))}
      </Row>

      <Modal visible={open} onOk={add} onCancel={()=>setOpen(false)} title="Thêm mục tiêu">
        <Form form={form} layout="vertical">
          <Form.Item name="name" label="Tên" rules={[{required:true}]}><Input/></Form.Item>
          <Form.Item name="type" label="Loại"><Select options={[
            {value:"Giảm cân"},{value:"Tăng cơ"},{value:"Khác"}
          ]}/></Form.Item>
          <Form.Item name="target" label="Mục tiêu"><InputNumber style={{width:"100%"}}/></Form.Item>
          <Form.Item name="current" label="Hiện tại"><InputNumber style={{width:"100%"}}/></Form.Item>
          <Form.Item name="deadline" label="Deadline"><DatePicker style={{width:"100%"}}/></Form.Item>
        </Form>
      </Modal>
    </>
  );
};

// ===== EXERCISE FULL =====
const ExerciseLibrary = ({ exercises, setExercises }: any) => {
  const [open,setOpen]=useState(false);
  const [form]=Form.useForm();

  const add=async()=>{
    const v=await form.validateFields();
    setExercises([...exercises,{id:Date.now(),...v}]);
    setOpen(false);
  };

  const remove=(id:number)=>{
    setExercises(exercises.filter((e:Exercise)=>e.id!==id));
  };

  return (
    <>
      <Button onClick={()=>setOpen(true)}>➕ Thêm bài tập</Button>

      <Row gutter={16} style={{marginTop:20}}>
        {exercises.map((e:Exercise)=>(
          <Col span={8} key={e.id}>
            <Card
              title={e.name}
              extra={<Button danger onClick={()=>remove(e.id)}>Xóa</Button>}
            >
              <p>Nhóm: {e.group}</p>
              <p>Mức: {e.level}</p>
              <p>Calo/h: {e.calories}</p>
              <p>{e.desc}</p>
            </Card>
          </Col>
        ))}
      </Row>

      <Modal visible={open} onOk={add} onCancel={()=>setOpen(false)}>
        <Form form={form} layout="vertical">
          <Form.Item name="name" label="Tên" rules={[{required:true}]}><Input/></Form.Item>
          <Form.Item name="group" label="Nhóm cơ">
            <Select options={[{value:"Chest"},{value:"Back"},{value:"Legs"}]}/>
          </Form.Item>
          <Form.Item name="level" label="Độ khó">
            <Select options={[{value:"Dễ"},{value:"Trung bình"},{value:"Khó"}]}/>
          </Form.Item>
          <Form.Item name="calories" label="Calo"><InputNumber style={{width:"100%"}}/></Form.Item>
          <Form.Item name="desc" label="Mô tả"><Input/></Form.Item>
        </Form>
      </Modal>
    </>
  );
};