import { Space, Switch, Table } from "antd"
import Button from "@src/modules/shared/components/Button/Button";
import { useStoreQuery, useStoresQuery } from "../../service/storeApi";
import { useState } from "react";
import Search from "@src/modules/shared/components/Search/Search";
import { useNavigate } from "react-router-dom";
export default function bookStoreList() {
  const [pagination, setPagination] = useState({ current: 1, pageSize: 5 });
  const handleTableChange = (pagination: any) => {
    setPagination(pagination);
    console.log(pagination)
    // You can perform any additional actions here, such as fetching data for the new page.
  };

  const { data: fetchedStores  } = useStoresQuery({ page: pagination.current, perPage: pagination.pageSize });
  interface Store {
    id : Number ;
    storeName : string ;
    logo  : string ; 
    isPublished: Number,
    socialMediaLinks : string[] ;
    position : string[] ;

  }
  const navigate  =useNavigate()

  const handleNavigate=()=>{
    navigate('/stores/create')


  }

  
 

  
  const columns = [
    {
      title: "Name",
      dataIndex: 'name',
      key: "name",
      render: (name: string, record: any) => (
        <div className="name-column">
          <div className="picture-Product">
            <img height={"30px"} width={"30px"} src={record.logo} alt="" />
          </div>
          <div className="data-name">
            <h3>{record.storeName}</h3>
            <span>{record.id}</span>
          </div>
        </div>
      ),
      sorter: (a: Store, b: Store) => a.storeName.localeCompare(b.storeName)
    },
    {
      title: "Links",
      dataIndex: 'socialMediaLinks',
      key: "links",
      render: (socialMediaLinks: string) => {
        const  links= JSON.parse(socialMediaLinks.replace(/'/g, '"'));
        return(
        <div className='links-column' >
          {
            links.map((link:string,index:any) => (<p  key={index} >{link}</p>))
          }
        </div>)
      }
    },
    {
      title: "Position",
      dataIndex: "address",
      key: "position",
      render: (position: string) => {
        
        return (
          <div className="position-column">
            {position}
            
          </div>
        );
      }
      
    
    },
    {
      title: "Published",
      dataIndex: "published", 
      key: "published",
  
      sorter: (a: Store, b: Store) =>
        (a.isPublished ? 1 : 0) - (b.isPublished ? 1 : 0),
      render: (isPublished: boolean, record:any) => (
        
        <Switch
          checked={record.isPublished}
          
         
        />
      ),
    },
    {
      title: "Action",
      key: "action",
      className:'action-category',
      render: (record:any) => (
        <Space >
          <div className="icon-action" onClick={()=>Navigate(record?.id)}>
            <svg fill="#7D879C" width="16px"height="16px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 512 512"  stroke=""><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <g> <path d="M311.18,78.008L32.23,356.958L0.613,485.716c-1.771,7.209,0.355,14.818,5.604,20.067 c5.266,5.266,12.88,7.368,20.067,5.604l128.759-31.617l278.95-278.95L311.18,78.008z M40.877,471.123l10.871-44.271l33.4,33.4 L40.877,471.123z"></path> </g> </g> <g> <g> <path d="M502.598,86.818L425.182,9.402c-12.536-12.536-32.86-12.536-45.396,0l-30.825,30.825l122.812,122.812l30.825-30.825 C515.134,119.679,515.134,99.354,502.598,86.818z"></path> </g> </g> </g></svg>
          </div>
          <div className="icon-action"><svg viewBox="64 64 896 896" focusable="false" data-icon="eye" width="18px" height="18px" fill="#7D879C" aria-hidden="true"><path d="M396 512a112 112 0 10224 0 112 112 0 10-224 0zm546.2-25.8C847.4 286.5 704.1 186 512 186c-192.2 0-335.4 100.5-430.2 300.3a60.3 60.3 0 000 51.5C176.6 737.5 319.9 838 512 838c192.2 0 335.4-100.5 430.2-300.3 7.7-16.2 7.7-35 0-51.5zM508 688c-97.2 0-176-78.8-176-176s78.8-176 176-176 176 78.8 176 176-78.8 176-176 176z"></path></svg></div>
          <div className="icon-action" onClick={()=> {
        
          }}>
            <svg width="18px" height="18Px" fill="#7D879C" viewBox="64 64 896 896" focusable="false" data-icon="delete"aria-hidden="true">
              <path d="M864 256H736v-80c0-35.3-28.7-64-64-64H352c-35.3 0-64 28.7-64 64v80H160c-17.7 0-32 14.3-32 32v32c0 4.4 3.6 8 8 8h60.4l24.7 523c1.6 34.1 29.8 61 63.9 61h454c34.2 0 62.3-26.8 63.9-61l24.7-523H888c4.4 0 8-3.6 8-8v-32c0-17.7-14.3-32-32-32zm-200 0H360v-72h304v72z"></path>
            </svg>
          </div>
        </Space>
      ),
    },
  ];
  
  const tableProps = {
    dataSource: fetchedStores?.data.docs ,
    columns: columns,
    headerStyle: { backgroundColor: "lightblue" },
    ...pagination,
    
    onChange: handleTableChange,

    header: {
      style: { borderRadius: "px" },
    },
  };
  return (
    <div className="Product-List">
    <h1>Shopes List</h1>
    <div className="header-Product-list">
        <Search  placeholder={'Search Category..'} />
        <Button className="add-cat" onClick={handleNavigate}> <span>+</span> Add Store</Button>
    </div>
    <div className="container-Product-List">
    <Table {...tableProps} />

    </div>
  </div>

   
  )
}
 