import React, { useState } from "react";
import {
Card,
Row,
Col,
Statistic,
Alert,
Table,
Button,
Modal,
Form,
Input,
Typography,
Tag
} from "antd";

import {
PlusOutlined,
DeleteOutlined,
DollarOutlined,
WarningOutlined
} from "@ant-design/icons";

const { Title } = Typography;

const BudgetManager = () => {

const [data,setData] = useState<any[]>([])
const [visible,setVisible] = useState(false)
const [form] = Form.useForm()

// Ngân sách tối đa
const maxBudget = 5000

const total = data.reduce(
(sum,item)=>sum+Number(item.price || 0),
0
)

const columns = [

{
title:"Hạng mục",
dataIndex:"name",
render:(text:any)=>(
<Tag color="blue">
{text}
</Tag>
)
},

{
title:"Chi phí",
dataIndex:"price",
render:(price:any)=>(
<Tag color="green">
{price} k
</Tag>
)
},

{
title:"Hành động",
render:(_:any,record:any)=>(
<Button
danger
icon={<DeleteOutlined/>}
onClick={()=>setData(
data.filter(i=>i.key!==record.key)
)}
>
Xóa
</Button>
)

}

]

const submit = () => {

form.validateFields().then(values=>{

setData([
...data,
{
key:Date.now(),
...values
}
])

setVisible(false)
form.resetFields()

})

}

return(

<div>

<Title level={4}>
Quản lý ngân sách
</Title>

{/* Cảnh báo vượt ngân sách */}

{total > maxBudget && (

<Alert
message="Vượt ngân sách!"
description={`Bạn đã chi ${total}k vượt mức ${maxBudget}k`}
type="warning"
showIcon
icon={<WarningOutlined />}
style={{marginBottom:20}}
/>

)}

<Row gutter={16} style={{marginBottom:20}}>

<Col xs={24} md={8}>
<Card>
<Statistic
title="Ngân sách tối đa"
value={maxBudget}
prefix={<DollarOutlined/>}
/>
</Card>
</Col>

<Col xs={24} md={8}>
<Card>
<Statistic
title="Tổng chi phí"
value={total}
prefix={<DollarOutlined/>}
/>
</Card>
</Col>

<Col xs={24} md={8}>
<Card>
<Statistic
title="Còn lại"
value={maxBudget-total}
prefix={<DollarOutlined/>}
/>
</Card>
</Col>

</Row>

<Button
type="primary"
icon={<PlusOutlined/>}
onClick={()=>setVisible(true)}
style={{marginBottom:20}}
>
Thêm ngân sách
</Button>

<Table
columns={columns}
dataSource={data}
pagination={false}
/>

<Modal
title="Thêm ngân sách"
visible={visible}
onOk={submit}
onCancel={()=>setVisible(false)}
>

<Form form={form} layout="vertical">

<Form.Item
name="name"
label="Hạng mục"
rules={[{required:true}]}
>
<Input/>
</Form.Item>

<Form.Item
name="price"
label="Chi phí"
rules={[{required:true}]}
>
<Input/>
</Form.Item>

</Form>

</Modal>

</div>

)

}

export default BudgetManager