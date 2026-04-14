import React, { useState } from "react";
import {
Table,
Button,
Modal,
Form,
Input,
Select,
InputNumber,
Space,
Typography,
Tag,
Popconfirm,
Row,
Col,
Card
} from "antd";

import {
PlusOutlined,
EditOutlined,
DeleteOutlined,
BookOutlined,
UserOutlined,
CheckCircleOutlined,
StopOutlined
} from "@ant-design/icons";

const { Title } = Typography;
const { Option } = Select;

const lecturers = [
"Nguyễn Văn A",
"Trần Thị B",
"Lê Văn C",
"Phạm Thị D"
];

const CourseManager = () => {

const [data,setData] = useState<any[]>([])
const [visible,setVisible] = useState(false)
const [editing,setEditing] = useState<any>(null)
const [form] = Form.useForm()

const [search,setSearch] = useState("")
const [statusFilter,setStatusFilter] = useState("")
const [lecturerFilter,setLecturerFilter] = useState("")

// Dashboard stats

const totalCourse = data.length
const openCourse = data.filter(i=>i.status==="Đang mở").length
const closeCourse = data.filter(i=>i.status==="Đã kết thúc").length
const totalStudent = data.reduce((sum,i)=>sum+(i.students||0),0)

// Filter

const filteredData = data
.filter(item =>
item.name?.toLowerCase().includes(search.toLowerCase())
)
.filter(item =>
statusFilter ? item.status === statusFilter : true
)
.filter(item =>
lecturerFilter ? item.lecturer === lecturerFilter : true
)

// Submit

const submit = () => {

form.validateFields().then(values => {

const exist = data.find(
item =>
item.name === values.name &&
item.key !== editing?.key
)

if(exist){
Modal.error({
title:"Tên khóa học đã tồn tại"
})
return
}

if(editing){

setData(
data.map(item =>
item.key === editing.key
? {...editing,...values}
: item
)
)

}else{

setData([
...data,
{
key:Date.now(),
...values
}
])

}

setVisible(false)
setEditing(null)
form.resetFields()

})

}

// Delete

const remove = (record:any)=>{

if(record.students > 0){
Modal.warning({
title:"Không thể xóa khóa học đã có học viên"
})
return
}

setData(
data.filter(item=>item.key !== record.key)
)

}

// Columns

const columns = [

{
title:"Tên khóa học",
dataIndex:"name"
},

{
title:"Giảng viên",
dataIndex:"lecturer"
},

{
title:"Học viên",
dataIndex:"students",
sorter:(a:any,b:any)=>a.students - b.students
},

{
title:"Trạng thái",
dataIndex:"status",
render:(status:any)=>{

let color="blue"

if(status==="Đã kết thúc") color="red"
if(status==="Tạm dừng") color="orange"

return <Tag color={color}>{status}</Tag>

}
},

{
title:"Hành động",
render:(_:any,record:any)=>(

<Space>

<Button
icon={<EditOutlined/>}
onClick={()=>{
setEditing(record)
setVisible(true)
form.setFieldsValue(record)
}}
>
Sửa
</Button>

<Popconfirm
title="Bạn chắc chắn muốn xóa?"
onConfirm={()=>remove(record)}
>
<Button danger icon={<DeleteOutlined/>}>
Xóa
</Button>
</Popconfirm>

</Space>

)

}

]

return(

<div style={{padding:20}}>

<Title level={3} style={{textAlign:"center"}}>
Quản lý khóa học online
</Title>

{/* Dashboard */}

<Row gutter={16} style={{marginBottom:20}}>

<Col span={6}>
<Card>
<BookOutlined /> Tổng khóa học
<h2>{totalCourse}</h2>
</Card>
</Col>

<Col span={6}>
<Card>
<CheckCircleOutlined /> Đang mở
<h2>{openCourse}</h2>
</Card>
</Col>

<Col span={6}>
<Card>
<StopOutlined /> Đã kết thúc
<h2>{closeCourse}</h2>
</Card>
</Col>

<Col span={6}>
<Card>
<UserOutlined /> Học viên
<h2>{totalStudent}</h2>
</Card>
</Col>

</Row>

{/* Filter */}

<Space style={{marginBottom:20}}>

<Input
placeholder="Tìm kiếm"
onChange={e=>setSearch(e.target.value)}
style={{width:200}}
/>

<Select
placeholder="Giảng viên"
allowClear
style={{width:180}}
onChange={setLecturerFilter}
>
{lecturers.map(item=>(
<Option key={item}>{item}</Option>
))}
</Select>

<Select
placeholder="Trạng thái"
allowClear
style={{width:180}}
onChange={setStatusFilter}
>
<Option value="Đang mở">Đang mở</Option>
<Option value="Đã kết thúc">Đã kết thúc</Option>
<Option value="Tạm dừng">Tạm dừng</Option>
</Select>

<Button
type="primary"
icon={<PlusOutlined/>}
onClick={()=>setVisible(true)}
>
Thêm khóa học
</Button>

</Space>

<Table
columns={columns}
dataSource={filteredData}
pagination={{pageSize:5}}
/>

{/* Modal */}

<Modal
title="Khóa học"
visible={visible}
onOk={submit}
onCancel={()=>{
setVisible(false)
setEditing(null)
}}
>

<Form form={form} layout="vertical">

<Form.Item
name="name"
label="Tên khóa học"
rules={[{required:true},{max:100}]}
>
<Input/>
</Form.Item>

<Form.Item
name="lecturer"
label="Giảng viên"
rules={[{required:true}]}
>
<Select>
{lecturers.map(item=>(
<Option key={item}>{item}</Option>
))}
</Select>
</Form.Item>

<Form.Item
name="students"
label="Số học viên"
rules={[{required:true}]}
>
<InputNumber style={{width:"100%"}}/>
</Form.Item>

<Form.Item
name="description"
label="Mô tả"
>
<Input.TextArea/>
</Form.Item>

<Form.Item
name="status"
label="Trạng thái"
rules={[{required:true}]}
>
<Select>
<Option value="Đang mở">Đang mở</Option>
<Option value="Đã kết thúc">Đã kết thúc</Option>
<Option value="Tạm dừng">Tạm dừng</Option>
</Select>
</Form.Item>

</Form>

</Modal>

</div>

)

}

export default CourseManager