import React, { useState } from "react";
import {
Table,
Button,
Modal,
Form,
Input,
Typography,
Upload,
Tag,
Space,
Card,
Row,
Col,
Statistic,
Progress
} from "antd";

import {
PlusOutlined,
DeleteOutlined,
UploadOutlined,
DollarOutlined,
BarChartOutlined
} from "@ant-design/icons";

const { Title } = Typography;

const AdminPage = ({ data = [], setData }: any) => {

const [visible, setVisible] = useState(false);
const [form] = Form.useForm();

// ====================
// Thống kê
// ====================

const totalMoney = (data || []).reduce(
(sum: any, item: any) => sum + Number(item.price || 0),
0
);

const popularPlace =
data.length > 0 ? data[0].name : "Chưa có dữ liệu";

const totalTrips = data.length;

// ====================
// Table columns
// ====================

const columns = [

{
title: "Điểm đến",
dataIndex: "name",
render: (text: any) => (
<Tag color="blue">{text}</Tag>
)
},

{
title: "Mô tả",
dataIndex: "desc"
},

{
title: "Chi phí",
dataIndex: "price",
render: (price: any) => (
<Tag color="green">{price} k</Tag>
)
},

{
title: "Hành động",
render: (_: any, record: any) => (
<Space>
<Button
danger
icon={<DeleteOutlined />}
onClick={() =>
setData(
data.filter((i: any) => i.key !== record.key)
)
}
>
Xóa
</Button>
</Space>
)
}

];

// ====================
// Submit
// ====================

const submit = () => {

form.validateFields().then(values => {

setData([
...data,
{
key: Date.now(),
...values
}
]);

setVisible(false);
form.resetFields();

});

};

return (

<div style={{ padding: 20 }}>

<Title level={3} style={{ textAlign: "center", marginBottom: 30 }}>
Trang quản trị du lịch
</Title>

{/* Dashboard */}

<Row gutter={16} style={{ marginBottom: 20 }}>

<Col xs={24} md={6}>
<Card>
<Statistic
title="Số lịch trình"
value={totalTrips}
prefix={<BarChartOutlined />}
/>
</Card>
</Col>

<Col xs={24} md={6}>
<Card>
<Statistic
title="Địa điểm phổ biến"
value={popularPlace}
/>
</Card>
</Col>

<Col xs={24} md={6}>
<Card>
<Statistic
title="Tổng tiền thu về"
value={totalMoney}
prefix={<DollarOutlined />}
/>
</Card>
</Col>

<Col xs={24} md={6}>
<Card>
<Statistic
title="Theo tháng"
value="Tháng 5"
/>
</Card>
</Col>

</Row>

{/* Thống kê */}

<Card
title="Thống kê chi phí theo hạng mục"
style={{ marginBottom: 20 }}
>

<p>Ăn uống</p>
<Progress percent={40} />

<p>Di chuyển</p>
<Progress percent={30} />

<p>Lưu trú</p>
<Progress percent={60} />

</Card>

{/* Table */}

<Card>

<Button
type="primary"
icon={<PlusOutlined />}
onClick={() => setVisible(true)}
style={{ marginBottom: 20 }}
>
Thêm điểm đến
</Button>

<Table
columns={columns}
dataSource={data}
/>

</Card>

{/* Modal */}

<Modal
title="Thêm điểm đến"
visible={visible}
onOk={submit}
onCancel={() => setVisible(false)}
>

<Form form={form} layout="vertical">

<Form.Item
name="name"
label="Tên điểm đến"
rules={[{ required: true }]}
>
<Input />
</Form.Item>

<Form.Item
name="desc"
label="Mô tả"
rules={[{ required: true }]}
>
<Input />
</Form.Item>

<Form.Item
name="price"
label="Chi phí"
rules={[{ required: true }]}
>
<Input />
</Form.Item>

</Form>

</Modal>

</div>

);

};

export default AdminPage;