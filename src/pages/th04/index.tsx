import React, { useState, useEffect } from 'react';
import { Card, Input, Button, List, Select, Row, Col, Tabs, message } from 'antd';

const { TabPane } = Tabs;

const th04 = () => {

  const [subjects, setSubjects] = useState<any[]>([]);
  const [blocks, setBlocks] = useState<any[]>([]);
  const [questions, setQuestions] = useState<any[]>([]);

  const [subjectName, setSubjectName] = useState('');
  const [blockName, setBlockName] = useState('');

  const [question, setQuestion] = useState('');
  const [subject, setSubject] = useState('');
  const [block, setBlock] = useState('');
  const [level, setLevel] = useState('');

  useEffect(() => {
    setSubjects(JSON.parse(localStorage.getItem('subjects') || '[]'));
    setBlocks(JSON.parse(localStorage.getItem('blocks') || '[]'));
    setQuestions(JSON.parse(localStorage.getItem('questions') || '[]'));
  }, []);

  const saveSubjects = (data:any) => {
    setSubjects(data);
    localStorage.setItem('subjects', JSON.stringify(data));
  }

  const saveBlocks = (data:any) => {
    setBlocks(data);
    localStorage.setItem('blocks', JSON.stringify(data));
  }

  const saveQuestions = (data:any) => {
    setQuestions(data);
    localStorage.setItem('questions', JSON.stringify(data));
  }

  const addSubject = () => {
    if(!subjectName) return;

    const newList = [...subjects,{id:Date.now(),name:subjectName}]
    saveSubjects(newList)
    setSubjectName('')
  }

  const addBlock = () => {
    if(!blockName) return;

    const newList = [...blocks,{id:Date.now(),name:blockName}]
    saveBlocks(newList)
    setBlockName('')
  }

  const addQuestion = () => {

    if(!question || !subject || !block || !level){
      message.error("Nhập đủ thông tin")
      return
    }

    const newQ = {
      id:Date.now(),
      question,
      subject,
      block,
      level
    }

    const newList = [...questions,newQ]
    saveQuestions(newList)

    setQuestion('')
  }

  const generateExam = () => {

    if(questions.length === 0){
      message.error("Không có câu hỏi")
      return
    }

    const random = questions.sort(()=>0.5-Math.random()).slice(0,5)

    localStorage.setItem('exam',JSON.stringify(random))

    message.success("Đã tạo đề thi")
  }

  const exam = JSON.parse(localStorage.getItem('exam') || '[]')

  return (

<Card title="Quản lý ngân hàng câu hỏi">

<Tabs defaultActiveKey="1">

<TabPane tab="Khối kiến thức" key="1">

<Row gutter={20}>

<Col span={12}>

<Input
placeholder="Tên khối kiến thức"
value={blockName}
onChange={(e)=>setBlockName(e.target.value)}
/>

<Button type="primary" onClick={addBlock} style={{marginTop:10}}>
Thêm
</Button>

</Col>

<Col span={12}>

<List
dataSource={blocks}
renderItem={(item:any)=>(

<List.Item>{item.name}</List.Item>

)}
/>

</Col>

</Row>

</TabPane>

<TabPane tab="Môn học" key="2">

<Row gutter={20}>

<Col span={12}>

<Input
placeholder="Tên môn học"
value={subjectName}
onChange={(e)=>setSubjectName(e.target.value)}
/>

<Button type="primary" onClick={addSubject} style={{marginTop:10}}>
Thêm
</Button>

</Col>

<Col span={12}>

<List
dataSource={subjects}
renderItem={(item:any)=>(
<List.Item>{item.name}</List.Item>
)}
/>

</Col>

</Row>

</TabPane>

<TabPane tab="Câu hỏi" key="3">

<Input
placeholder="Nội dung câu hỏi"
value={question}
onChange={(e)=>setQuestion(e.target.value)}
/>

<Select
style={{width:'100%',marginTop:10}}
placeholder="Chọn môn"
onChange={(v)=>setSubject(v)}
>

{subjects.map((s:any)=>(
<Select.Option value={s.name}>{s.name}</Select.Option>
))}

</Select>

<Select
style={{width:'100%',marginTop:10}}
placeholder="Chọn khối kiến thức"
onChange={(v)=>setBlock(v)}
>

{blocks.map((b:any)=>(
<Select.Option value={b.name}>{b.name}</Select.Option>
))}

</Select>

<Select
style={{width:'100%',marginTop:10}}
placeholder="Mức độ khó"
onChange={(v)=>setLevel(v)}
>

<Select.Option value="Dễ">Dễ</Select.Option>
<Select.Option value="Trung bình">Trung bình</Select.Option>
<Select.Option value="Khó">Khó</Select.Option>
<Select.Option value="Rất khó">Rất khó</Select.Option>

</Select>

<Button type="primary" onClick={addQuestion} style={{marginTop:10}}>
Thêm câu hỏi
</Button>

<List
style={{marginTop:20}}
dataSource={questions}
renderItem={(q:any)=>(
<List.Item>
{q.question} - {q.subject} - {q.level}
</List.Item>
)}
/>

</TabPane>

<TabPane tab="Tạo đề thi" key="4">

<Button type="primary" onClick={generateExam}>
Tạo đề ngẫu nhiên
</Button>

<List
style={{marginTop:20}}
dataSource={exam}
renderItem={(q:any)=>(
<List.Item>{q.question}</List.Item>
)}
/>

</TabPane>

</Tabs>

</Card>

  )
}

export default th04