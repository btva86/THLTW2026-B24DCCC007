import React from "react";
import { Card, Row, Col, Statistic, Table, Typography } from "antd";

const { Title } = Typography;

const ReportStatistics = () => {

const data = [
{
key:1,
club:"CLB IT",
members:20,
activities:5
},
{
key:2,
club:"CLB Marketing",
members:15,
activities:3
}
];

const columns = [

{
title:"Câu lạc bộ",
dataIndex:"club"
},

{
title:"Số thành viên",
dataIndex:"members"
},

{
title:"Số hoạt động",
dataIndex:"activities"
}

];

return (

<div>

<Title level={4}>
Báo cáo và Thống kê
</Title>

<Row gutter={16} style={{marginBottom:20}}>

<Col span={8}>
<Card>
<Statistic
title="Tổng CLB"
value={2}
/>
</Card>
</Col>

<Col span={8}>
<Card>
<Statistic
title="Tổng thành viên"
value={35}
/>
</Card>
</Col>

<Col span={8}>
<Card>
<Statistic
title="Tổng hoạt động"
value={8}
/>
</Card>
</Col>

</Row>

<Table
columns={columns}
dataSource={data}
/>

</div>

);

};

export default ReportStatistics;