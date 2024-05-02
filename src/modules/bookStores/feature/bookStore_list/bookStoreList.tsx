import { Checkbox, Space, Switch, Table, message } from "antd";
import Button from "@src/modules/shared/components/Button/Button";
import { ReactComponent as EditIcon } from "@src/modules/shared/assets/icons/List/edit.svg";

import {
  useDeleteStoresMutation,
  usePublishStoreMutation,
 
  useStoressQuery
} from "../../service/storeApi";
import { useState } from "react";
import SeachFilter from "@src/modules/shared/components/SearchFilter/SearchFilter";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "@src/modules/shared/store";
import { debounce } from "lodash";
import Spinner from "@src/modules/shared/components/Spinner/Spinner";
import { ADMIN } from "@src/global_roles_config";

export default function bookStoreList() {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [selectedRowIds, setSelectedRowIds] = useState<string[]>([]);
  const [nameStore, setNameStore] = useState<string>("");

  const Current_User = useSelector(
    (state: RootState) => state.auth.user?.role.toLocaleUpperCase()
  );
  const isAdmin = Current_User === ADMIN;
  const Current_id = useSelector((state: RootState) => state.auth.user?.id);
      

  const handlePaginationChange = (page: number, pageSize?: number) => {
    setCurrentPage(page);
    setPageSize(pageSize || 5); // Update pageSize if changed
  };

  const [publishStore] = usePublishStoreMutation();
  console.log(Current_User)
  const {data:fetchdStoress , isLoading} = useStoressQuery({
      page: currentPage,
      perPage: pageSize,
      id: Current_id,
      role: Current_User!,
      subName:nameStore
      

  })
  isLoading ? <Spinner /> : null;


  
  interface Store {
    id: Number;
    name: string;
    logo: string;
    isPublished: Number;
    socialMediaLinks: string[];
    position: string[];
  }
  const handleSearchChange = debounce((searchText: string) => {
    console.log("Search text for category mlist:", searchText);
    setNameStore(searchText);
  }, 200);

  const navigate = useNavigate();
  const Navigate = (id: string) => {
    navigate(`/stores/edit/${id}`);
  };

  const handleNavigate = () => {
    navigate("/stores/create");
  };
  const [deleteStores] = useDeleteStoresMutation();


  const handleDelete = async () => {
    try {
      const response = await deleteStores(selectedRowIds).unwrap();
      if ("data" in response) {
        // Display success message if data exists
        message.success("Store deleted successfully!");
        console.log(response.data);
      } else if ("error" in response) {
        // Display error message if error exists
        message.error("Failed to Delete Store. Please try again.");
        console.error("Error saving product", response.error);
      } else {
        // Handle unexpected response format
        message.error(
          "Unexpected response from server. Please try again later."
        );
      }
    } catch (error) {
      // Handle error
    }
  };



  const handleCheckboxChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    id: string
  ) => {
    const checked = e.target.checked;
    console.log(selectedRowIds);
    setSelectedRowIds((prevIds) => {
      if (checked) {
        return [...prevIds, id]; 
      } else {
        return prevIds.filter((rowId) => rowId !== id); 
      }
    });
  };
  const handlePublishToggle = (record: Store) => {
    if (isAdmin) {
      publishStore({
        id: record.id,
        isPublished: !record.isPublished,
      });
    }
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
      render: (_name: string, record: any) => (
        <div className="name-column">
          <div className="picture-Product">
            <img height={"30px"} width={"30px"} src={record.logo} alt="" />
          </div>
          <div className="data-name">
            <h3>{record.name}</h3>
            <span>{record.id}</span>
          </div>
        </div>
      ),
      sorter: (a: Store, b: Store) => a.name.localeCompare(b.name),
    },
    {
      title: "Phone",
      dataIndex: "phoneNumber",
      key: "name",
      render: (_phone:string , record: any) => (
        <div className="name-column">
        {record.phoneNumber}
        </div>
      ),
    },
    {
      title: "Vendor",
      dataIndex: "phoneNumber",
      key: "name",
      render: (_phone:string , record: any) => (
        <div className="name-column">
        {record?.user?.email}
        </div>
      ),
    },

    {
      title: "Links",
      dataIndex: "socialMediaLinks",
      key: "links",
      render: (socialMediaLinks: string) => {
        const links = JSON.parse(socialMediaLinks.replace(/'/g, '"'));
        return (
          <div className="links-column">
            {links.map((link: string, index: any) => (
              <p key={index}>{link}</p>
            ))}
          </div>
        );
      },
    },
    {
      title: "Position",
      dataIndex: "address",
      key: "position",
      render: (position: string) => {
        return <div className="position-column">{position}</div>;
      },
    },

    {
      title: "Published",
      dataIndex: "published",
      key: "published",

      sorter: (a: Store, b: Store) =>
        (a.isPublished ? 1 : 0) - (b.isPublished ? 1 : 0),
      render: (_isPublished: boolean, record: any) => (
        <Switch
          checked={record.isPublished}
          onClick={() => handlePublishToggle(record)}
          disabled={!isAdmin} // Disable the switch if the user is not an admin
        />
      ),
    },
    {
      title: "Action",
      key: "action",
      className: "action-category",
      
      render: (record: any) => (
        <Space>
          <div className="icon-action" onClick={() => Navigate(record?.id)}>
            <EditIcon/>
          </div>
        </Space>
      ),
    },
  ];

  const tableProps = {
    dataSource: fetchdStoress?.data?.docs,
    columns: columns,
    headerStyle: { backgroundColor: "lightblue" },
    pagination: {
      total: fetchdStoress?.data?.meta?.totalRecords,
      current: currentPage,
      pageSize: pageSize,
      onChange: handlePaginationChange, // Handle page change event
      onShowSizeChange: handlePaginationChange,// Handle page size change event
    },

    header: {
      style: { borderRadius: "px" },
    },
  };
  return (
    <div className="Product-List">
      <h1>{Current_User ===ADMIN ?'Stores List' : 'My Stores List' } </h1>
      <div className="header-Product-list">
        <SeachFilter
          placeholder={"Search Store ..."}
          onSearchChange={handleSearchChange}
        />
        <Button className="add-cat" onClick={handleNavigate}>
          <span>+</span> Add Store
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


            Delete
          </Button>
        </div>
        <Table {...tableProps} />
      </div>
    </div>
  );
}
