import React, { useState } from "react";
import {
Layout,
Menu,
Typography,
Row,
Col
} from "antd";

import {
HomeOutlined,
CalendarOutlined,
DollarOutlined,
SettingOutlined
} from "@ant-design/icons";

import HomeDestination from "./HomeDestination";
import TripPlanner from "./TripPlanner";
import BudgetManager from "./BudgetManager";
import AdminPage from "./AdminPage";

const { Header, Sider, Content } = Layout;
const { Title } = Typography;

const TH06Dashboard = () => {

const [selected,setSelected]=useState("1")

const renderContent=()=>{

switch(selected){

case "1":
return <HomeDestination/>

case "2":
return <TripPlanner/>

case "3":
return <BudgetManager/>

case "4":
return <AdminPage/>

default:
return <HomeDestination/>

}

}

return(

<Layout style={{minHeight:"100vh"}}>

{/* Sidebar */}

<Sider
breakpoint="lg"
collapsedWidth="0"
style={{
background:"#fff",
boxShadow:"2px 0 8px rgba(0,0,0,0.05)"
}}
>

<div
style={{
padding:20,
textAlign:"center",
fontWeight:"bold",
fontSize:18
}}
>
Travel Planner
</div>

<Menu
theme="light"
mode="inline"
defaultSelectedKeys={["1"]}
onClick={(e)=>setSelected(e.key)}
items={[

{
key:"1",
icon:<HomeOutlined/>,
label:"Khám phá"
},

{
key:"2",
icon:<CalendarOutlined/>,
label:"Lịch trình"
},

{
key:"3",
icon:<DollarOutlined/>,
label:"Ngân sách"
},

{
key:"4",
icon:<SettingOutlined/>,
label:"Quản trị"
}

]}
/>

</Sider>

{/* Main */}

<Layout>

{/* Header */}

<Header
style={{
background:"#fff",
padding:"0 24px",
boxShadow:"0 2px 8px rgba(0,0,0,0.05)"
}}
>

<Row
justify="center"
align="middle"
style={{height:"100%"}}
>

<Col>

<Title 
level={3} 
style={{
margin:0,
textAlign:"center"
}}
>
Ứng dụng lập kế hoạch du lịch
</Title>

</Col>

</Row>

</Header>

{/* Content */}

<Content
style={{
margin:"16px",
padding:"20px",
background:"#fff",
borderRadius:8
}}
>

{renderContent()}

</Content>

</Layout>

</Layout>

)

}

export default TH06Dashboard