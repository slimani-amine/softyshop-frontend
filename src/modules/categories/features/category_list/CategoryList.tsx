import {  useState } from "react";
import { Table, Space, Button as AntButton, Switch } from "antd";
import SeachFilter from "@src/modules/shared/components/SearchFilter/SearchFilter";
import Button from "@src/modules/shared/components/Button/Button";
import { useNavigate } from "react-router-dom";

interface Category {
  id: string;
  name: string;
  published: Boolean;
  Category: string;
  imgUrl: string;
}



const data: Category[] = [
  {
    id: "#5645461",
    name: "Category 1",
    Category: "Category A",

    published: true,
    imgUrl: "/src/modules/shared/assets/images/samsung.png",
  },
  {
    id: "#5645098",
    name: "Category 2",
    Category: "Category B",

    published: false,
    imgUrl: "/src/modules/shared/assets/images/samsung.png",
  },
  {
    id: "#5645794",
    name: "Category 1",
    Category: "Category C",

    published: false,
    imgUrl: "/src/modules/shared/assets/images/samsung.png",
  },
  {
    id: "#5645998",
    name: "Category 2",
    Category: "Category D",

    published: false,
    imgUrl: "/src/modules/shared/assets/images/samsung.png",
  },
];

export default function CategoryList() {
  const [categories, setCategories] = useState<Category[]>(data);
  const navigate = useNavigate();
  const Navigate = (id:string)=>{
    navigate(`/vendor/Categories/edit/${id}`)
  }
  

  const handleNavigate = () => {
    navigate("/vendor/Categories/create");
  };
  const handleSwitchChange = (id: string) => (checked: boolean) => {
    setCategories((prevCategorys: Category[]) =>
      prevCategorys.map((Category: Category) =>
        Category.id === id ? { ...Category, published: checked } : Category
      )
    );
  };
  const columns = [
    {
      title: "id",
      dataIndex: "id",
      key: "id",
      render: (id:string) => <p>{id}</p>,
      sorter: (a: Category, b: Category) => a.id.localeCompare(b.id),
    },
    {
      title: "name",
      className: "name",
      dataIndex: "name",
      render: (name: string) => <span className="Category-name">{name}</span>,
  
      key: "name",
      sorter: (a: Category, b: Category) => a.name.localeCompare(b.name),
    },
    {
      title: "Brand",
      dataIndex: "brand",
      key: "brand",
      sorter: (a: Category, b: Category) => a.imgUrl.localeCompare(b.imgUrl),
      render: (record: Category) => (
        <div className="">
          <p>hello</p>
        </div>  
      ),
    },
  
    {
      title: "Featured",
      dataIndex: "published",
      key: "published",
  
      sorter: (a: Category, b: Category) =>
        (a.published ? 1 : 0) - (b.published ? 1 : 0),
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
      render: (record:Category) => (
        <Space >
        <div className="icon-action" onClick={()=>Navigate(record.id)}><svg fill="#7D879C" width="16px"height="16px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 512 512"  stroke=""><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <g> <path d="M311.18,78.008L32.23,356.958L0.613,485.716c-1.771,7.209,0.355,14.818,5.604,20.067 c5.266,5.266,12.88,7.368,20.067,5.604l128.759-31.617l278.95-278.95L311.18,78.008z M40.877,471.123l10.871-44.271l33.4,33.4 L40.877,471.123z"></path> </g> </g> <g> <g> <path d="M502.598,86.818L425.182,9.402c-12.536-12.536-32.86-12.536-45.396,0l-30.825,30.825l122.812,122.812l30.825-30.825 C515.134,119.679,515.134,99.354,502.598,86.818z"></path> </g> </g> </g></svg></div>
        <div className="icon-action"><svg viewBox="64 64 896 896" focusable="false" data-icon="eye" width="18px" height="18px" fill="#7D879C" aria-hidden="true"><path d="M396 512a112 112 0 10224 0 112 112 0 10-224 0zm546.2-25.8C847.4 286.5 704.1 186 512 186c-192.2 0-335.4 100.5-430.2 300.3a60.3 60.3 0 000 51.5C176.6 737.5 319.9 838 512 838c192.2 0 335.4-100.5 430.2-300.3 7.7-16.2 7.7-35 0-51.5zM508 688c-97.2 0-176-78.8-176-176s78.8-176 176-176 176 78.8 176 176-78.8 176-176 176z"></path></svg></div>
        <div className="icon-action"><svg width="18px" height="18Px" fill="#7D879C" viewBox="64 64 896 896" focusable="false" data-icon="delete"aria-hidden="true"><path d="M864 256H736v-80c0-35.3-28.7-64-64-64H352c-35.3 0-64 28.7-64 64v80H160c-17.7 0-32 14.3-32 32v32c0 4.4 3.6 8 8 8h60.4l24.7 523c1.6 34.1 29.8 61 63.9 61h454c34.2 0 62.3-26.8 63.9-61l24.7-523H888c4.4 0 8-3.6 8-8v-32c0-17.7-14.3-32-32-32zm-200 0H360v-72h304v72z"></path></svg></div>
        </Space>
      ),
    },
  ];

  const tableProps = {
    dataSource: categories,
    columns: columns,
    headerStyle: { backgroundColor: "lightblue" },

    header: {
      style: { borderRadius: "px" },
    },
  };
 
  

  return (
    <div className="Product-List">
      <h1>Category List</h1>
      <div className="header-Product-list">
        <SeachFilter placeholder={"Search Category.."} />
        <Button onClick={handleNavigate}>+ Add Category</Button>
      </div>
      <div className="container-Product-List">
        <Table<Category> {...tableProps} />
      </div>
    </div>
  );
}
