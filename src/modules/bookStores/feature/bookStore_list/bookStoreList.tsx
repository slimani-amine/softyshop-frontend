import { Table } from "antd"
import { useStoreQuery, useStoresQuery } from "../../service/storeApi";
import { useState } from "react";
export default function bookStoreList() {
  const [pagination, setPagination] = useState({ current: 2, pageSize: 5 });
  const handleTableChange = (pagination: any) => {
    setPagination(pagination);
    console.log(pagination)
    // You can perform any additional actions here, such as fetching data for the new page.
  };

  const { data: fetchedStores , error, isLoading } = useStoresQuery({ page: pagination.current, perPage: pagination.pageSize });
  interface Store {
    id : Number ;
    storeName : string ;
    logo  : string ; 
    isPublished: Number,
    socialMediaLinks : string[] ;
    position : string[] ;

  }

  
 
  const Stores: Store[] = [
    {
      id: 1,
      storeName: "Book Store 1",
      logo: "https://example.com/logo1.png",
      socialMediaLinks: ["https://facebook.com/bookstore1", "https://twitter.com/bookstore1"],
      position: "[40.73061, -73.935242 , 'المدرسة الابتدائية طريق المرسى بنقردان, Avenue Abdelhamid El Kadhi, Ben Gardane, Chareb Errajel, Délégation Ben Gardane, Gouvernorat Médenine, 4160, Tunisie']",
      isPublished: 0
    },
    // Add more stores as needed...
  ];
  
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
      dataIndex: "position",
      key: "position",
      render: (position: string) => {
        const positionArray = JSON.parse(position.replace(/'/g, '"'));
        return (
          <div className="position-column">
            {positionArray[2]}
            
          </div>
        );
      }
      
    
    }
  ];
  
  const tableProps = {
    dataSource: fetchedStores?.data,
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
    </div>
    <div className="container-Product-List">
    <Table {...tableProps} />

    </div>
  </div>

   
  )
}
 