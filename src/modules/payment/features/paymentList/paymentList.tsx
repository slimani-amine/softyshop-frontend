import { Table, Space, message, Checkbox } from "antd";
import SeachFilter from "@src/modules/shared/components/SearchFilter/SearchFilter";
import Button from "@src/modules/shared/components/Button/Button";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react"; // Import useState hook for managing modal state
import { debounce } from "lodash";
import {
  useDeletePaymentsMutation,
  usePaymentsQuery,useSearchPaymentQuery

} from "../../service/paymentApi";

export default function PaymentsList() {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [selectedRowIds, setSelectedRowIds] = useState<string[]>([]);

  const [namePayment, setnamePayment] = useState<string>("");
  const { data: fetchedpayments } = usePaymentsQuery({
    perPage: pageSize,
    page: currentPage,
  });
  const total = fetchedpayments?.data?.meta?.totalRecords;
  const [deletepayments] = useDeletePaymentsMutation();

  const { data: fetchedSearchpayments } = useSearchPaymentQuery(namePayment);
  const [payments, setpayments] = useState<Array<any>>([]);
  const handlePaginationChange = (page: number, pageSize?: number) => {
    setCurrentPage(page);
    setPageSize(pageSize || 5); // Update pageSize if changed
  };
  useEffect(() => {
    if (namePayment && fetchedSearchpayments) {
      setpayments(fetchedSearchpayments.data.docs);
    } else {
      if (fetchedpayments) {
        setpayments(fetchedpayments.data.docs);
      }
    }
  }, [namePayment, fetchedpayments, fetchedSearchpayments]);

  const handleSearchChange = debounce((searchText: string) => {
    console.log("Search text for creator list:", searchText);
    setnamePayment(searchText);
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
      await deletepayments(selectedRowIds).unwrap();
      message.success("creator deleted!");
    } catch (error) {
      // Handle error
    }
  };

  const navigate = useNavigate();
  const Navigate = (id: string) => {
    navigate(`/creators/edit/${id}`);
  };

  const handleNavigate = () => {
    navigate("/payment/create");
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
    dataSource: payments,
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
      <h1>creator List</h1>
      <div className="header-Product-list">
        <SeachFilter
          onSearchChange={handleSearchChange}
          placeholder={"Search creator.."}
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
