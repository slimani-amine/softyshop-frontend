import { Table, Space, message, Checkbox } from "antd";
import SeachFilter from "@src/modules/shared/components/SearchFilter/SearchFilter";
import Button from "@src/modules/shared/components/Button/Button";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react"; // Import useState hook for managing modal state
import { debounce } from "lodash";
import {
  useCreatorsQuery,
  useSearchCreatorQuery,
  useDeleteCreatorsMutation,
} from "../../service/creatorApi";
import { ReactComponent as EditIcon } from "@src/modules/shared/assets/icons/List/edit.svg";

export default function CreatorsList() {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [selectedRowIds, setSelectedRowIds] = useState<string[]>([]);

  const [namecreator, setNamecreator] = useState<string>("");
  const { data: fetchedcreators } = useCreatorsQuery({
    perPage: pageSize,
    page: currentPage,
  });
  const total = fetchedcreators?.data?.meta?.totalRecords;
  const [deletecreators] = useDeleteCreatorsMutation();

  const { data: fetchedSearchcreators } = useSearchCreatorQuery(namecreator);
  const [creators, setcreators] = useState<Array<any>>([]);
  const handlePaginationChange = (page: number, pageSize?: number) => {
    setCurrentPage(page);
    setPageSize(pageSize || 5); // Update pageSize if changed
  };
  useEffect(() => {
    if (namecreator && fetchedSearchcreators) {
      setcreators(fetchedSearchcreators.data.docs);
    } else {
      if (fetchedcreators) {
        setcreators(fetchedcreators.data.docs);
      }
    }
  }, [namecreator, fetchedcreators, fetchedSearchcreators]);

  const handleSearchChange = debounce((searchText: string) => {
    console.log('Search text for creator list:', searchText);
    setNamecreator(searchText);
  }, 200);

  /*const handleDelete = async (creatorId :Number) => {
    try {
      await deletecreator(creatorId).unwrap();
      message.success('creator deleted!');
      setDeleteModalVisible(false); // Close the modal after successful deletion
    } catch (error) {
      // Handle error
    }
  };*/
  const handleDelete = async () => {
    try {
      await deletecreators(selectedRowIds).unwrap();
      message.success("creator deleted!");
    } catch (error) {
      // Handle error
    }
  };

  const navigate = useNavigate();
  const Navigate = (id: string) => {
    navigate(`/authors/edit/${id}`);
  };

  const handleNavigate = () => {
    navigate("/authors/create");
  };
  const handleCheckboxChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    id: string,
  ) => {
    const checked = e.target.checked;
    console.log(selectedRowIds)
    setSelectedRowIds(prevIds => {
      if (checked) {
        return [...prevIds, id]; // Add ID to the selected IDs array
      } else {
        return prevIds.filter((rowId) => rowId !== id); // Remove ID from the selected IDs array
      }
    });
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
      title: "id",
      dataIndex: "id",
      key: "id",
      render: (id: string) => <p>{id}</p>,
    },
    {
      title: "name",
      className: "name",
      dataIndex: "name",
      render: (name: string) => <span className="creator-name">{name}</span>,
      key: "name",
      sorter: (a: any, b: any) => a.name.localeCompare(b.name),
    },

    {
      title: "Action",
      key: "action",
      className: "action-creator",
      render: (record: any) => (
        <Space>
          <div className="icon-action" onClick={() => Navigate(record?.id)}>
            <EditIcon />
          </div>
        </Space>
      ),
    },
  ];

  const tableProps = {
    dataSource: creators,
    columns: columns,
    headerStyle: { backgroundColor: "lightblue" },
    header: {
      style: { borderRadius: "px" },
    },
    pagination: {
      total: total,
      current: currentPage,

      pageSize: pageSize,
      onChange: handlePaginationChange, // Handle page change event
      onShowSizeChange: handlePaginationChange,

      // Handle page size change event
    },
  };

  return (
    <div className="Product-List">
      <h1>Authors List</h1>
      <div className="header-Product-list">
        <SeachFilter
          onSearchChange={handleSearchChange}
          placeholder={"Search author.."}
        />
        <Button className="add-cat" onClick={handleNavigate}>
          {" "}
          <span>+</span> Add creator
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
        <Table<any> {...tableProps} />
      </div>
    </div>
  );
}
