import {  useEffect, useState } from "react";
import { Table, Space, Switch, Checkbox, Select } from "antd";
import SeachFilter from "@src/modules/shared/components/SearchFilter/SearchFilter";
import Button from "@src/modules/shared/components/Button/Button";
import { Navigate, useNavigate } from "react-router-dom";
import { useProductsQuery , useDeleteProductsMutation , useMyProductsQuery} from "../../service/productApi";
import Spinner from "@src/modules/shared/components/Spinner/Spinner";
import { useSelector } from "react-redux";
import { RootState } from "@src/modules/shared/store";
import { useAllStoresQuery, useMyStoresQuery  } from "@src/modules/bookStores/service/storeApi";

interface Product {
  id: string;
  name: string;
  Product: string;
  brand: string;
  price: number;
  published: boolean;
  images: string;
}


export default function ProductList() {

  const [currentPage, setCurrentPage] = useState(1);
  const [selectedRowIds, setSelectedRowIds] = useState<string[]>([]);
  const [selectedStore, setSelectedStore] = useState<string>();
  const [pageSize, setPageSize] = useState(5);
  const [ , setProducts] =  useState<Array<any>>([]);
  const [nameProduct] = useState<string>('a');

  const navigate = useNavigate();
  const [deleteProducts] = useDeleteProductsMutation();
  const handleCheckboxChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    id: string
  ) => {
    const checked = e.target.checked;
    setSelectedRowIds((prevIds) => {
      if (checked) {
        return [...prevIds, id];
      } else {
        return prevIds.filter((rowId) => rowId !== id);
      }
    });
  };
  const Current_User = useSelector(
    (state: RootState) => state.auth.user?.role.toLocaleUpperCase()
  );

const { data: fetchedProducts, isLoading } = selectedStore
    ? useMyProductsQuery({
        id: selectedStore,
        perPage: pageSize,
        page: currentPage,
        name:""
      })
    : useProductsQuery({
        perPage: pageSize,
        page: currentPage,
        name:""
      });
    
  useEffect(()=>{
    if (nameProduct){
      setProducts(fetchedProducts?.data.docs)
    }
    else{
      setProducts(fetchedProducts?.data.docs)

      
    }


  } , [])
  console.log(fetchedProducts , 'fetcheddddd products')
  
  // get stores base to ROLE
  //const total = fetchedProducts?.data?.meta.totalRecords
  let stores = [];
  if (Current_User === "VENDOR") {
    const { data: fetechedMyStores } = useMyStoresQuery();
    stores = fetechedMyStores?.data?.docs;
  }
  else{
    const {data : fetchedAllStores}=useAllStoresQuery()
    stores = fetchedAllStores?.data?.docs
  }
  const selectStores = stores?.map((store: any) => ({
    label: store.name,
    value: store.id,
  }));
  ////////////////////////////////////////////////////////

  // const { data: fetchedProductsOfStore } = useMyProductsQuery({
  //   id: selectedStore,
  //   perPage: pageSize,
  //   page: currentPage,
  // });
  
  console.log(fetchedProducts);
  
  // Handle loading state
  if (isLoading) {
    return <Spinner />;
  }


  const handleDelete = async () => {
    await deleteProducts(selectedRowIds);
  };

  const handleNavigate = () => {
    navigate("/products/create");
  };
  const handlePaginationChange = (page: number, pageSize?: number) => {
    setCurrentPage(page);
    setPageSize(pageSize || 5);
  };
  const columns = [
    {
      title: "Select",
      dataIndex: "id",
      render: (_: any, record: any) => (
        <Checkbox
          checked={selectedRowIds.includes(record.id)}
          onChange={(e: any) => handleCheckboxChange(e, record.id)}
        />
      ),
    },

    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (name: string, record: Product) => {
        const imgUrl  = record.images.replace(/"/g, '');
        console.log(imgUrl)

        return(
        <div className="name-column">
          <div className="picture-Product">
            <img height={"30px"} width={"30px"} src={imgUrl} alt="" />
          </div>
          <div className="data-name">
            <h3>{name}</h3>
            <span>{record.id}</span>
          </div>
        </div>)
      },
      sorter: (a: Product, b: Product) => a.name.localeCompare(b.name),
    },
    {
      title: "Category",
      className: "product",
      dataIndex: "category",
      render: (category: any) => <span className="">{category?.name || "erf"}</span>,

      key: "Product",
      sorter: (a: Product, b: Product) => a.Product.localeCompare(b.Product),
    },

    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      sorter: (a: Product, b: Product) => a.price - b.price,
    },
    {
      title: "Published",
      dataIndex: "published",
      key: "published",

      sorter: (a: Product, b: Product) => (a.published ? 1 : 0) - (b.published ? 1 : 0),
      render: (published: boolean) => (
        <Switch
          checked={published}
          onChange={(checked) => console.log(checked)}
          onClick={(checked) => !checked}
        />
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (record : any) => (
        <Space size="middle">
          <div className="icon-action" onClick={() => Navigate(record?.id)}>
            <svg
              fill="#7D879C"
              width="16px"
              height="16px"
              version="1.1"
              id="Layer_1"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
              stroke=""
            >
              <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
              <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
              <g id="SVGRepo_iconCarrier">
                {" "}
                <g>
                  {" "}
                  <g>
                    {" "}
                    <path d="M311.18,78.008L32.23,356.958L0.613,485.716c-1.771,7.209,0.355,14.818,5.604,20.067 c5.266,5.266,12.88,7.368,20.067,5.604l128.759-31.617l278.95-278.95L311.18,78.008z M40.877,471.123l10.871-44.271l33.4,33.4 L40.877,471.123z"></path>{" "}
                  </g>{" "}
                </g>{" "}
                <g>
                  {" "}
                  <g>
                    {" "}
                    <path d="M502.598,86.818L425.182,9.402c-12.536-12.536-32.86-12.536-45.396,0l-30.825,30.825l122.812,122.812l30.825-30.825 C515.134,119.679,515.134,99.354,502.598,86.818z"></path>{" "}
                  </g>{" "}
                </g>{" "}
              </g>
            </svg>
          </div>
        </Space>
      ),
    },
  ];

  const tableProps = {
    dataSource: fetchedProducts?.data?.docs,
    columns: columns,
    headerStyle: { backgroundColor: "lightblue" },
    // Set the pageSize in pagination config
    pagination: {
      total: 30,
      current: currentPage,
      pageSize: pageSize,
      onChange: handlePaginationChange, // Handle page change event
    },

    header: {
      style: { borderRadius: "px" },
    },
  };
  const handleSelectChange = (value: any) => {
    setSelectedStore(value);
    console.log(selectedStore)

  };

  return (
    <div className="Product-List">
      <h1>Product List</h1>

      <div className="header-Product-list">
        <SeachFilter
          placeholder={"Search Product.."}
          onSearchChange={function (_text: string): void {
            throw new Error("Function not implemented.");
          }}
        />
        <Select
        style={{ width: '200px', height: '8px !important' , borderRadius:"30px"}}
        size="small"
          placeholder="Store "
          options={selectStores}
          onChange={(value) => handleSelectChange(value)} 
          className="input-custom"
        />
        <Button className="add-cat" onClick={handleNavigate}>
          {" "}
          <span>+</span> Add Product
        </Button>
      </div>
      <div className="container-Product-List">
        <div className="container-btn">
          <Button
            size="sm"
            disabled={selectedRowIds.length === 0}
            variant={selectedRowIds.length === 0 ? "dark" : "primary"}
            onClick={handleDelete}
          >
            Deleted
          </Button>
        </div>
        <Table<Product> {...tableProps} />
      </div>
    </div>
  );
}
