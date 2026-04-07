import React, { useState } from "react";
import {
Card,
Row,
Col,
Select,
Rate,
Typography,
Tag
} from "antd";

const { Title } = Typography;

const HomeDestination = () => {

const [filter,setFilter]=useState("")

const data=[

{
name:"Đà Nẵng",
type:"Biển",
rating:4,
price:2000
},

{
name:"Đà Lạt",
type:"Núi",
rating:5,
price:1500
},

{
name:"Hà Nội",
type:"Thành phố",
rating:4,
price:1200
}

]

const filtered=data.filter(i=>
filter?i.type===filter:true
)

return(

<div>

<Title level={4}>
Khám phá điểm đến
</Title>

<Select
placeholder="Lọc loại hình"
style={{width:200,marginBottom:20}}
onChange={setFilter}
options={[
{value:"Biển"},
{value:"Núi"},
{value:"Thành phố"}
]}
/>

<Row gutter={[16,16]}>

{filtered.map((item,index)=>(

<Col xs={24} sm={12} md={8} key={index}>

<Card
hoverable
cover={
<img
alt=""
src="https://picsum.photos/300/200"
/>
}
>

<h3>{item.name}</h3>

<Tag color="blue">
{item.type}
</Tag>

<br/>

<Rate
disabled
value={item.rating}
/>

<p>
Chi phí: {item.price} k
</p>

</Card>

</Col>

))}

</Row>

</div>

)

}

export default HomeDestination