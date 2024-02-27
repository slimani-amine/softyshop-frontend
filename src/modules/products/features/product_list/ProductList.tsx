import  { FC, useState } from 'react';
import { Table,  Space, Button as AntButton, Switch } from 'antd';
import SeachFilter from '@src/modules/shared/components/SearchFilter/SearchFilter'
import Button from "@src/modules/shared/components/Button/Button"

interface Product {
  id :string
  name: string;
  category: string;
  brand: string;
  price: number;
  published: boolean;
  imgUrl:string
}



const columns = [
  {
    title: 'Name',  
    dataIndex: 'name',
    key: 'name',
    render: (name: string, record: Product) => (
      <div className='name-column'>
        <div className='picture-product'>
          <img height={"30px"} width={"30px"} src={record.imgUrl} alt="" />

        </div>
        <div className='data-name'>
          <h3>{name}</h3>
          <span>{record.id}</span>
        </div>
      </div>
    ),
    sorter: (a: Product, b: Product) => a.name.localeCompare(b.name),
  },
  {
    title: 'Category',
    className:"cate",
    dataIndex: 'category',
    render: (category: string) => (
      <span className='category-name'>{category}</span>
    ),
    
    key: 'category',
    sorter: (a: Product, b: Product) => a.category.localeCompare(b.category),
  },
  {
    title: 'Brand',
    dataIndex: 'brand',
    key: 'brand',
    sorter: (a: Product, b: Product) => a.brand.localeCompare(b.brand),
  },
  {
    title: 'Price',
    dataIndex: 'price',
    key: 'price',
    sorter: (a: Product, b: Product) => a.price - b.price,
  },
  {
    title: 'Published',
    dataIndex: 'published',
    key: 'published',
    sorter: (a: Product, b: Product) => (a.published ? 1 : 0) - (b.published ? 1 : 0),
    render: (published: boolean, record: Product) => (
      <Switch checked={published} onChange={(checked) => console.log(checked)} />
    ),
  },
  {
    title: 'Action',
    key: 'action',
    render: () => (
      <Space size="middle">
        <svg viewBox="64 64 896 896"  focusable="false" data-icon="edit" width="19px" height="19px" fill="#7D879C" aria-hidden="true"><path d="M880 836H144c-17.7 0-32 14.3-32 32v36c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-36c0-17.7-14.3-32-32-32zm-622.3-84c2 0 4-.2 6-.5L431.9 722c2-.4 3.9-1.3 5.3-2.8l423.9-423.9a9.96 9.96 0 000-14.1L694.9 114.9c-1.9-1.9-4.4-2.9-7.1-2.9s-5.2 1-7.1 2.9L256.8 538.8c-1.5 1.5-2.4 3.3-2.8 5.3l-29.5 168.2a33.5 33.5 0 009.4 29.8c6.6 6.4 14.9 9.9 23.8 9.9z"></path></svg>
        <svg viewBox="64 64 896 896" focusable="false" data-icon="eye" width="19px" height="19px" fill="#7D879C" aria-hidden="true"><path d="M396 512a112 112 0 10224 0 112 112 0 10-224 0zm546.2-25.8C847.4 286.5 704.1 186 512 186c-192.2 0-335.4 100.5-430.2 300.3a60.3 60.3 0 000 51.5C176.6 737.5 319.9 838 512 838c192.2 0 335.4-100.5 430.2-300.3 7.7-16.2 7.7-35 0-51.5zM508 688c-97.2 0-176-78.8-176-176s78.8-176 176-176 176 78.8 176 176-78.8 176-176 176z"></path></svg>
        <svg viewBox="64 64 896 896" focusable="false" data-icon="delete" width="19px" height="19Px" fill="#7D879C" aria-hidden="true"><path d="M864 256H736v-80c0-35.3-28.7-64-64-64H352c-35.3 0-64 28.7-64 64v80H160c-17.7 0-32 14.3-32 32v32c0 4.4 3.6 8 8 8h60.4l24.7 523c1.6 34.1 29.8 61 63.9 61h454c34.2 0 62.3-26.8 63.9-61l24.7-523H888c4.4 0 8-3.6 8-8v-32c0-17.7-14.3-32-32-32zm-200 0H360v-72h304v72z"></path></svg>      </Space>
    ),
  },
];

const data: Product[] = [
  {
    id: '#5645461',
    name: 'Product 1',
    category: 'Category A',
    brand: 'Brand X',
    price: 100,
    published: true,
    imgUrl: '/src/modules/shared/assets/images/samsung.png',
  },
  {
    id: '#5645098',
    name: 'Product 2',
    category: 'Category B',
    brand: 'Brand Y',
    price: 200,
    published: false,
    imgUrl: '/src/modules/shared/assets/images/samsung.png',
  },
  {
    id: '#5645794',
    name: 'Product 1',
    category: 'Category C',
    brand: 'Brand Z',
    price: 150,
    published: false,
    imgUrl: '/src/modules/shared/assets/images/samsung.png',
  },
  {
    id: '#5645998',
    name: 'Product 2',
    category: 'Category D',
    brand: 'Brand Z',
    price: 150,
    published: false,
    imgUrl: '/src/modules/shared/assets/images/samsung.png',
  },
];

export default function ProductList() {
  const [products, setProducts] = useState<Product[]>(data);
  const handleSwitchChange = (id: string) => (checked: boolean) => {
    setProducts((prevProducts: Product[]) =>
      prevProducts.map((product: Product) =>
        product.id === id ? { ...product, published: checked } : product
      )
    );
  };

  const tableProps = {
    dataSource: products,
    columns: columns,
    headerStyle: { backgroundColor: 'lightblue' },

    header: {
      style: { borderRadius: 'px' },
    },
  };
  
  return (
    <div className="Product-List">
      <h1>Product List</h1>
      <div className="header-product-list">
        <SeachFilter placeholder={'Search Product..'}/>
        <Button>+ Add Product</Button>
      </div>
      <div className="container-Product-List">
        <Table<Product> {...tableProps} />
      </div>
    </div>
  );
}
