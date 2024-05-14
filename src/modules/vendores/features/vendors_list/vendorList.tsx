import {
  Table,
  Space,
  Checkbox,
} from "antd";
import SeachFilter from "@src/modules/shared/components/SearchFilter/SearchFilter";
import Button from "@src/modules/shared/components/Button/Button";
import { ReactComponent as EditIcon } from "@src/modules/shared/assets/icons/List/edit.svg";

import { useNavigate } from "react-router-dom";
import {
  useVendorsQuery,
  useSearchVendorsQuery,
  useDeleteVendorMutation,
} from "../../services/vendorApi";
import { useEffect, useState } from "react"; // Import useState hook for managing modal state
import {Vendor} from "../../services/type";
import { debounce } from "lodash";
export default function CategoryList() {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [selectedRowIds, setSelectedRowIds] = useState<string[]>([]);
  const [nameVendor, setNameVendor] = useState<string>("");
  const [vendors, setVendors] = useState<Array<any>>([]);

  const { data: fetchedSearchVendors } = useSearchVendorsQuery(nameVendor);
  const [deleteVendors] = useDeleteVendorMutation();

  const { data: fetchedVendors } = useVendorsQuery({
    perPage: pageSize,
    page: currentPage,
  });
  const handlePaginationChange = (page: number, pageSize?: number) => {
    setCurrentPage(page);
    setPageSize(pageSize || 5); // Update pageSize if changed
  };
  useEffect(() => {
    if (nameVendor && fetchedSearchVendors) {
      setVendors(fetchedSearchVendors?.data?.docs);
    } else {
      if (fetchedVendors) {
        setVendors(fetchedVendors?.data?.docs);
      }
    }
  }, [nameVendor, fetchedVendors, fetchedSearchVendors]);
  const handleSearchChange = debounce((searchText: string) => {
    setNameVendor(searchText);
  }, 300);

  const navigate = useNavigate();
  const Navigate = (id: string) => {
    navigate(`/vendors/edit/${id}`);
  };
  const handleDelete = async () => {
    await deleteVendors(selectedRowIds);
  };
  const handleNavigate = () => {
    navigate("/vendors/create");
  };
  const handleCheckboxChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    id: string
  ) => {
    const checked = e.target.checked;
    setSelectedRowIds((prevIds) => {
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
      title: "picture",
      dataIndex: "picture",
      render: (icon: string) => (
        <img className="img-cteagory" src={icon} alt="" />
      ),
      key: "picture",
    },

    {
      title: "fist name",
      className: "name",
      dataIndex: "firstName",
      render: (name: string) => <span className="Category-name">{name}</span>,
      key: "name",
    },
    {
      title: "last name",
      className: "name",
      dataIndex: "lastName",
      render: (name: string) => <span className="Category-name">{name}</span>,
      key: "name",
    },

    {
      title: "Email",
      dataIndex: "email",
      sorter: (a: Vendor, b: Vendor) => a.email.localeCompare(b.email),

      render: (email: string) => <p> {email}</p>,
      key: "email",
    },
    {
      title: "Phone",
      dataIndex: "phoneNumber",
      sorter: (a: Vendor, b: Vendor) =>
        a.phoneNumber.localeCompare(b.phoneNumber),
      render: (phone: string) => <p> {phone}</p>,
      key: "email",
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
    dataSource: vendors,

    columns: columns,
    headerStyle: { backgroundColor: "lightblue" },

    header: {
      style: { borderRadius: "px" },
    },
    pagination: {
      total: 10,
      current: currentPage,
      pageSize: pageSize,
      onChange: handlePaginationChange, // Handle page change event
    },
  };

  return (
    <div className="Product-List">
      <h1>Vendor List</h1>
      <div className="header-Product-list">
        <SeachFilter
          placeholder={"Search Vendor.."}
          onSearchChange={handleSearchChange}
        />
        <Button className="add-cat" onClick={handleNavigate}>
          {" "}
          <span>+</span> Add Vendor
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
        <Table<any> {...tableProps} />
      </div>
      {/* Delete Category Modal */}
    </div>
  );
}
