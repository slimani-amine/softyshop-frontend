import {
  Table,
  Space,
  Button as AntButton,
  Checkbox,
} from "antd";
import SeachFilter from "@src/modules/shared/components/SearchFilter/SearchFilter";
import Button from "@src/modules/shared/components/Button/Button";
import { useNavigate } from "react-router-dom";
import {
  useVendorsQuery,
  useSearchVendorsQuery,
  useDeleteVendorMutation,
} from "../../services/vendorApi";
import { useEffect, useState } from "react"; // Import useState hook for managing modal state
import Vendor from "../../services/type";
import { debounce } from "lodash";
console.log(AntButton)
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
  console.log(fetchedVendors);
  console.log(vendors);
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
    console.log("Search text for category list:", searchText);
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
    console.log(selectedRowIds);
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
              <g
                id="SVGRepo_tracerCarrier"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></g>
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
            deleted
          </Button>
        </div>
        <Table<any> {...tableProps} />
      </div>
      {/* Delete Category Modal */}
    </div>
  );
}
