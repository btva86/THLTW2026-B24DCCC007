import {
    Tabs,
    Card,
    Row,
    Col,
    Input,
    Tag,
    Table,
    Button,
    Avatar,
    Pagination,
    Modal,
    Form,
    Select,
    Space,
    Typography,
    Divider,
    Popconfirm,
    message,
    Statistic
    } from "antd"
    
    import {
    PlusOutlined,
    EyeOutlined
    } from "@ant-design/icons"
    
    import { useState } from "react"
    
    const { Title, Text, Paragraph } = Typography
    const { TabPane } = Tabs
    
    const BlogTH07 = () => {
    
    const [open,setOpen] = useState(false)
    const [tagOpen,setTagOpen] = useState(false)
    
    const [editing,setEditing] = useState<any>(null)
    const [selected,setSelected] = useState<any>(null)
    
    const [form] = Form.useForm()
    const [tagForm] = Form.useForm()
    
    const [posts,setPosts] = useState([
    {
    id:1,
    title:"ReactJS cơ bản",
    desc:"Học React từ cơ bản",
    tag:"React",
    status:"Đã đăng",
    view:120,
    date:"21/04/2026"
    }
    ])
    
    const [tags,setTags] = useState([
    { id:1,name:"React"},
    { id:2,name:"Node"}
    ])
    
    // thêm sửa bài viết
    const handleSubmit=(values:any)=>{
    
    if(editing){
    
    setPosts(
    posts.map(item=>
    item.id===editing.id
    ? {...item,...values}
    : item
    )
    )
    
    message.success("Cập nhật thành công")
    
    }else{
    
    setPosts([
    ...posts,
    {
    id:Date.now(),
    ...values,
    view:0,
    date:new Date().toLocaleDateString()
    }
    ])
    
    message.success("Thêm thành công")
    
    }
    
    setOpen(false)
    setEditing(null)
    form.resetFields()
    
    }
    
    // sửa
    const handleEdit=(record:any)=>{
    setEditing(record)
    form.setFieldsValue(record)
    setOpen(true)
    }
    
    // xoá
    const handleDelete=(id:number)=>{
    setPosts(posts.filter(item=>item.id!==id))
    }
    
    // xem chi tiết
    const handleView=(record:any)=>{
    
    setSelected(record)
    
    setPosts(
    posts.map(item=>
    item.id===record.id
    ? {...item,view:item.view+1}
    : item
    )
    )
    
    }
    
    // thêm tag
    const handleAddTag=(values:any)=>{
    
    setTags([
    ...tags,
    {
    id:Date.now(),
    name:values.name
    }
    ])
    
    setTagOpen(false)
    tagForm.resetFields()
    
    }
    
    // xoá tag
    const handleDeleteTag=(id:number)=>{
    setTags(tags.filter(item=>item.id!==id))
    }
    
    // thống kê tag
    const tagData = tags.map(tag=>({
    
    key:tag.id,
    name:tag.name,
    count:posts.filter(
    post=>post.tag===tag.name
    ).length
    
    }))
    
    // bảng bài viết
    const columns=[
    
    {
    title:"Tiêu đề",
    dataIndex:"title"
    },
    
    {
    title:"Thẻ",
    dataIndex:"tag"
    },
    
    {
    title:"Trạng thái",
    dataIndex:"status",
    render:(text:any)=>(
    <Tag color={
    text==="Đã đăng"
    ?"green":"orange"
    }>
    {text}
    </Tag>
    )
    },
    
    {
    title:"Lượt xem",
    dataIndex:"view"
    },
    
    {
    title:"Hành động",
    render:(record:any)=>(
    
    <Space>
    
    <Button
    type="link"
    onClick={()=>handleView(record)}
    >
    Xem
    </Button>
    
    <Button
    type="link"
    onClick={()=>handleEdit(record)}
    >
    Sửa
    </Button>
    
    <Popconfirm
    title="Xóa?"
    onConfirm={()=>handleDelete(record.id)}
    >
    <Button danger>Xóa</Button>
    </Popconfirm>
    
    </Space>
    
    )
    }
    
    ]
    
    return(
    
    <div style={{padding:24,background:"#f5f6fa",minHeight:"100vh"}}>
    
    <Title level={2} style={{textAlign:"center"}}>
    Dashboard Blog Cá Nhân
    </Title>
    
    <Tabs centered>
    
    {/* Trang chủ */}
    <TabPane tab="Trang chủ" key="1">
    
    <Row gutter={[16,16]}>
    
    {posts.map(item=>(
    
    <Col span={8} key={item.id}>
    
    <Card
    hoverable
    onClick={()=>handleView(item)}
    cover={
    <img
    src="https://picsum.photos/400/200"
    alt="blog"
    style={{
    height:200,
    objectFit:"cover"
    }}
    />
    }
    >
    
    <Title level={5}>
    {item.title}
    </Title>
    
    <Tag>{item.tag}</Tag>
    
    <Divider/>
    
    <EyeOutlined/> {item.view}
    
    </Card>
    
    </Col>
    
    ))}
    
    </Row>
    
    </TabPane>
    
    
    {/* Chi tiết bài viết */}
    <TabPane tab="Chi tiết bài viết" key="2">
    
    {selected? (
    
    <Card>
    
    <Row gutter={20}>
    
    <Col span={16}>
    
    <Title>
    {selected.title}
    </Title>
    
    <Tag>{selected.tag}</Tag>
    
    <Divider/>
    
    <Paragraph>
    
    Nội dung chi tiết bài viết  
    Bạn có thể tích hợp editor tại đây
    
    </Paragraph>
    
    </Col>
    
    <Col span={8}>
    
    <Card>
    
    <Statistic
    title="Lượt xem"
    value={selected.view}
    />
    
    <Divider/>
    
    <Text>
    Ngày tạo: {selected.date}
    </Text>
    
    </Card>
    
    </Col>
    
    </Row>
    
    </Card>
    
    ):(
    
    <Text>Chọn bài viết để xem</Text>
    
    )}
    
    </TabPane>
    
    
    {/* Giới thiệu */}
    <TabPane tab="Giới thiệu" key="3">
    
    <Row gutter={[16,16]}>
    
    <Col span={8}>
    
    <Card>
    
    <div style={{textAlign:"center"}}>
    
    <Avatar size={120} />
    
    <Title level={4}>
    Bùi Thị Vân Anh 
    </Title>
    
    <Text>
    Frontend Developer
    </Text>
    
    <Divider/>
    
    <Text>Email: Vanhh2906@gmail.com</Text>
    
    <br/>
    
    <Text>Nam Định</Text>
    
    </div>
    
    </Card>
    
    </Col>
    
    
    <Col span={16}>
    
    <Card title="Giới thiệu">
    
    <Paragraph>
    
    Ứng dụng Blog React Ant Design
    
    </Paragraph>
    
    </Card>
    
    </Col>
    
    
    <Col span={24}>
    
    <Row gutter={16}>
    
    <Col span={6}>
    <Card>
    <Statistic
    title="Bài viết"
    value={posts.length}
    />
    </Card>
    </Col>
    
    <Col span={6}>
    <Card>
    <Statistic
    title="Thẻ"
    value={tags.length}
    />
    </Card>
    </Col>
    
    <Col span={6}>
    <Card>
    <Statistic
    title="Lượt xem"
    value={
    posts.reduce(
    (sum,item)=>sum+item.view,0
    )
    }
    />
    </Card>
    </Col>
    
    <Col span={6}>
    <Card>
    <Statistic
    title="Người dùng"
    value={120}
    />
    </Card>
    </Col>
    
    </Row>
    
    </Col>
    
    </Row>
    
    </TabPane>
    
    
    {/* Quản lý bài viết */}
    <TabPane tab="Quản lý bài viết" key="4">
    
    <Button
    type="primary"
    icon={<PlusOutlined/>}
    onClick={()=>setOpen(true)}
    >
    Thêm bài viết
    </Button>
    
    <Table
    columns={columns}
    dataSource={posts}
    rowKey="id"
    />
    
    </TabPane>
    
    
    {/* Quản lý thẻ */}
    <TabPane tab="Quản lý thẻ" key="5">
    
    <Button
    type="primary"
    onClick={()=>setTagOpen(true)}
    >
    Thêm thẻ
    </Button>
    
    <Table
    
    columns={[
    {
    title:"Tên thẻ",
    dataIndex:"name"
    },
    {
    title:"Số bài",
    dataIndex:"count"
    },
    {
    title:"Hành động",
    render:(record:any)=>(
    <Popconfirm
    title="Xóa?"
    onConfirm={()=>handleDeleteTag(record.key)}
    >
    <Button danger>
    Xóa
    </Button>
    </Popconfirm>
    )
    }
    ]}
    
    dataSource={tagData}
    
    />
    
    </TabPane>
    
    </Tabs>
    
    
    {/* modal bài viết */}
    <Modal
    visible={open}
    footer={null}
    onCancel={()=>setOpen(false)}
    >
    
    <Form
    layout="vertical"
    form={form}
    onFinish={handleSubmit}
    >
    
    <Form.Item
    label="Tiêu đề"
    name="title"
    rules={[{required:true}]}
    >
    <Input/>
    </Form.Item>
    
    <Form.Item
    label="Thẻ"
    name="tag"
    >
    
    <Select
    options={tags.map(tag=>({
    label:tag.name,
    value:tag.name
    }))}
    />
    
    </Form.Item>
    
    <Form.Item
    label="Trạng thái"
    name="status"
    >
    
    <Select
    options={[
    {label:"Đã đăng",value:"Đã đăng"},
    {label:"Nháp",value:"Nháp"}
    ]}
    />
    
    </Form.Item>
    
    <Button
    type="primary"
    htmlType="submit"
    block
    >
    Lưu
    </Button>
    
    </Form>
    
    </Modal>
    
    
    {/* modal tag */}
    <Modal
    visible={tagOpen}
    footer={null}
    onCancel={()=>setTagOpen(false)}
    title="Thêm thẻ"
    >
    
    <Form
    form={tagForm}
    onFinish={handleAddTag}
    >
    
    <Form.Item
    name="name"
    rules={[{required:true}]}
    >
    
    <Input placeholder="Tên thẻ"/>
    
    </Form.Item>
    
    <Button
    type="primary"
    htmlType="submit"
    block
    >
    Thêm
    </Button>
    
    </Form>
    
    </Modal>
    
    </div>
    
    )
    
    }
    
    export default BlogTH07