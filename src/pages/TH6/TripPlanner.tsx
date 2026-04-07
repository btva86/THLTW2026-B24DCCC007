import React, { useState } from "react";
import {
Table,
Button,
Space,
Card,
Typography,
Modal,
Form,
Input,
Select,
Tag,
Row,
Col,
Statistic
} from "antd";

import {
PlusOutlined,
DeleteOutlined
} from "@ant-design/icons";

const { Title } = Typography;

const TripPlanner = () => {

const [data, setData] = useState<any[]>([]);
const [visible, setVisible] = useState(false);
const [form] = Form.useForm();

const destinations = [
{
name:"Đà Nẵng",
price:2000
},
{
name:"Đà Lạt",
price:1500
},
{
name:"Hà Nội",
price:1200
}
];

const total = data.reduce(
(sum,item)=>sum + Number(item.price || 0),
0
);

const columns = [

{
title:"Ngày",
dataIndex:"day"
},

{
title:"Điểm đến",
dataIndex:"place",
render:(place:any)=>(
<Tag color="blue">
{place}
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
<Space>

<Button
danger
icon={<DeleteOutlined/>}
onClick={()=>
setData(
data.filter(i=>i.key!==record.key)
)
}
>
Xóa
</Button>

</Space>
)

}

];

const submit = () => {

form.validateFields().then(values=>{

setData([
...data,
{
key: Date.now(),
...values
}
])

setVisible(false)
form.resetFields()

})

}

return(

<Card>

<Title level={4}>
Tạo lịch trình du lịch
</Title>

<Row gutter={16} style={{marginBottom:20}}>

<Col xs={24} md={8}>
<Card>
<Statistic
title="Tổng điểm đến"
value={data.length}
/>
</Card>
</Col>

<Col xs={24} md={8}>
<Card>
<Statistic
title="Tổng chi phí"
value={total}
suffix="k"
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
Thêm lịch trình
</Button>

<Table
columns={columns}
dataSource={data}
pagination={false}
/>

<Modal
title="Thêm lịch trình"
visible={visible}
onOk={submit}
onCancel={()=>setVisible(false)}
>

<Form
form={form}
layout="vertical"
>

<Form.Item
name="day"
label="Ngày"
rules={[{required:true}]}
>
<Input placeholder="Ngày 1"/>
</Form.Item>

<Form.Item
name="place"
label="Điểm đến"
rules={[{required:true}]}
>
<Select
placeholder="Chọn điểm đến"
onChange={(value)=>{

const found = destinations.find(
i=>i.name===value
)

form.setFieldsValue({
price: found?.price
})

}}
options={
destinations.map(i=>({
value:i.name
}))
}
/>
</Form.Item>

<Form.Item
name="price"
label="Chi phí"
>
<Input disabled/>
</Form.Item>

</Form>

</Modal>

</Card>

)

}

export default TripPlanner