import React, { useState, useMemo } from 'react';
import { Table, Tag, Button, Input, Select } from 'antd';

const { Search } = Input;

interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  quantity: number;
}

const initialProducts: Product[] = [
  { id: 1, name: 'Laptop Dell XPS 13', category: 'Laptop', price: 25000000, quantity: 15 },
  { id: 2, name: 'iPhone 15 Pro Max', category: 'Điện thoại', price: 30000000, quantity: 8 },
  { id: 3, name: 'Samsung Galaxy S24', category: 'Điện thoại', price: 22000000, quantity: 20 },
  { id: 4, name: 'iPad Air M2', category: 'Máy tính bảng', price: 18000000, quantity: 5 },
  { id: 5, name: 'MacBook Air M3', category: 'Laptop', price: 28000000, quantity: 12 },
  { id: 6, name: 'AirPods Pro 2', category: 'Phụ kiện', price: 6000000, quantity: 0 },
];

const ProductsPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [searchText, setSearchText] = useState('');
  const [category, setCategory] = useState<string | undefined>();

  const filteredProducts = useMemo(() => {
    return products.filter(p => {
      const matchName = p.name.toLowerCase().includes(searchText.toLowerCase());
      const matchCategory = category ? p.category === category : true;
      return matchName && matchCategory;
    });
  }, [products, searchText, category]);

  const getStatusTag = (quantity: number) => {
    if (quantity === 0) return <Tag color="red">Hết hàng</Tag>;
    if (quantity <= 10) return <Tag color="orange">Sắp hết</Tag>;
    return <Tag color="green">Còn hàng</Tag>;
  };

  const columns = [
    {
      title: 'STT',
      render: (_: any, __: any, index: number) => index + 1,
    },
    {
      title: 'Tên sản phẩm',
      dataIndex: 'name',
    },
    {
      title: 'Danh mục',
      dataIndex: 'category',
    },
    {
      title: 'Giá',
      dataIndex: 'price',
      render: (price: number) => price.toLocaleString() + ' đ',
      sorter: (a: Product, b: Product) => a.price - b.price,
    },
    {
      title: 'Số lượng',
      dataIndex: 'quantity',
      sorter: (a: Product, b: Product) => a.quantity - b.quantity,
    },
    {
      title: 'Trạng thái',
      render: (_: any, record: Product) => getStatusTag(record.quantity),
    },
    {
      title: 'Thao tác',
      render: () => <Button type="link">Sửa</Button>,
    },
  ];

  return (
    <div>
      <h2>Quản lý sản phẩm</h2>

      <div style={{ display: 'flex', gap: 16, marginBottom: 16 }}>
        <Search
          placeholder="Tìm theo tên sản phẩm"
          onChange={e => setSearchText(e.target.value)}
          style={{ width: 250 }}
        />

        <Select
          placeholder="Lọc theo danh mục"
          allowClear
          style={{ width: 200 }}
          onChange={value => setCategory(value)}
        >
          <Select.Option value="Laptop">Laptop</Select.Option>
          <Select.Option value="Điện thoại">Điện thoại</Select.Option>
          <Select.Option value="Máy tính bảng">Máy tính bảng</Select.Option>
          <Select.Option value="Phụ kiện">Phụ kiện</Select.Option>
        </Select>
      </div>

      <Table
        rowKey="id"
        columns={columns}
        dataSource={filteredProducts}
        pagination={{ pageSize: 5 }}
      />
    </div>
  );
};

export default ProductsPage;
