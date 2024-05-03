import { Table,  message, Checkbox } from "antd";
import Button from "@src/modules/shared/components/Button/Button";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react"; // Import useState hook for managing modal state
import {
  useDeletePaymentsMutation,
  usePaymentsQuery,useSearchPaymentQuery

} from "../../service/paymentApi";

export default function PaymentsList() {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [selectedRowIds, setSelectedRowIds] = useState<string[]>([]);

  const [namePayment] = useState<string>("");
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


  const handleNavigate = () => {
    navigate("/payments/create");
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
      <h1>Payment Methods List</h1>
      <div className="header-Product-list">
      <div></div>
        <Button className="add-cat" onClick={handleNavigate}>
          {" "}
          <span>+</span> Add New Method
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
    </div>
  );
}
