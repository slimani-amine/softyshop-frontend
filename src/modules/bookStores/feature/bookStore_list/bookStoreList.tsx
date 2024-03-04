import { Table } from "antd"
 
export default function bookStoreList() {
  interface Store {
    id : string ;
    name : string ;
    logo  : string ; 
    socialMediaLinks : string [];
    position : [Number , Number , String] ;
    VendorID : string

              



  }
  const Stores: Store[] = [
    {
      id: "1",
      name: "Book Store 1",
      logo: "https://example.com/logo1.png",
      socialMediaLinks: ["https://facebook.com/bookstore1", "https://twitter.com/bookstore1"],
      position: [40.73061, -73.935242 , 'المدرسة الابتدائية طريق المرسى بنقردان, Avenue Abdelhamid El Kadhi, Ben Gardane, Chareb Errajel, Délégation Ben Gardane, Gouvernorat Médenine, 4160, Tunisie'],
      VendorID: "vendor1",
    },
    // Add more stores as needed...
  ];
  
  const columns = [
    {
      title: "Name",
      dataIndex: 'name',
      key: "name",
      render: (name: string, record: Store) => (
        <div className="name-column">
          <div className="picture-Product">
            <img height={"30px"} width={"30px"} src={record.logo} alt="" />
          </div>
          <div className="data-name">
            <h3>{name}</h3>
            <span>{record.id}</span>
          </div>
        </div>
      ),
      sorter: (a: Store, b: Store) => a.name.localeCompare(b.name)
    },
    {
      title: "Links",
      dataIndex: 'socialMediaLinks',
      key: "links",
      render: (links: string[]) => (
        <div className='links-column' >
          {
            links.map((link,index) => (<p key={index} >{link}</p>))
          }
        </div>
      )
    },
    {
      title: "Position",
      dataIndex: "position",
      key: "position",
      render: (position: [Number , Number , String]) => (
        <span>{position[2]}</span>
      )
    }
  ];
  
  const tableProps = {
    dataSource: Stores,
    columns: columns,
    headerStyle: { backgroundColor: "lightblue" },

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
 