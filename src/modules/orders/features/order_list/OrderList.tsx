import { Table, message, Modal, Switch, Checkbox } from "antd";
import convertDate from "@src/modules/shared/utils/convertTime";
import MyComponent from "../../components/Select_satatus/SelectStatus";
import SeachFilter from "@src/modules/shared/components/SearchFilter/SearchFilter";
import Button from "@src/modules/shared/components/Button/Button";
import { useNavigate } from "react-router-dom";

import {
  useOrdersQuery,
  useUpdateOrderMutation,
  useSearchOrdersQuery,
  usePaiedOrderMutation,
  useDeleteOrdersMutation,
} from "../../services/orderApi";

import { useEffect, useState } from "react"; // Import useState hook for managing modal state
import { debounce } from "lodash";
import { useSelector } from "react-redux";
import { RootState } from "@src/modules/shared/store";
import { ADMIN } from "@src/global_roles_config";

export default function CategoryList() {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [selectedRowIds, setSelectedRowIds] = useState<string[]>([]);
  const Current_User = useSelector(
    (state: RootState) => state.auth.user?.role.toLocaleUpperCase()
  );
  const [numberOrder, setNumberOrder] = useState<string>("");
  const { data: fetchedOrders } = useOrdersQuery({
    perPage: pageSize,
    page: currentPage,
    role: Current_User,
  });

  const [updateOrder] = useUpdateOrderMutation();

  const handleUpdateOrder = async (orderId: string, newStatus: string) => {
    try {
      const payload = {
        status: newStatus,
      };
      await updateOrder({ id: orderId, data: payload });
      message.success("Order updated successfully");
    } catch (error) {
      message.error("Failed to update order");
    }
  };

  const [deleteOrders] = useDeleteOrdersMutation();
  //const [updateCategory] = useUpdateCatgoryMutation();
  const [deleteModalVisible, setDeleteModalVisible] = useState(false); // State to manage modal visibility
  const { data: fetchedSearchOrders } = useSearchOrdersQuery({
    subName: numberOrder,
    role: Current_User,
  });
  const [paiedOrder] = usePaiedOrderMutation();
  const [orders, setOrders] = useState<Array<any>>([]);
  const handlePaginationChange = (page: number, pageSize?: number) => {
    setCurrentPage(page);
    setPageSize(pageSize || 5); // Update pageSize if changed
  };
  useEffect(() => {
    if (numberOrder && fetchedSearchOrders) {
      setOrders(fetchedSearchOrders.data.docs);
    } else {
      if (fetchedOrders) {
        setOrders(fetchedOrders.data.docs);
      }
    }
  }, [numberOrder, fetchedOrders, fetchedSearchOrders]);

  const handleSearchChange = debounce((searchText: string) => {
    setNumberOrder(searchText);
  }, 200);

  /*const handleDelete = async (categoryId :Number) => {
      try {
        await deleteCategory(categoryId).unwrap();
        message.success('Category deleted!');
        setDeleteModalVisible(false); // Close the modal after successful deletion
      } catch (error) {
        // Handle error
      }
    };*/
  const handleDelete = async () => {
    try {
      await deleteOrders(selectedRowIds).unwrap();
      message.success("Orders deleted succefuly");
      setDeleteModalVisible(false); // Close the modal after successful deletion
    } catch (error) {
      // Handle error
    }
  };

  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate("/orders/create");
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
      render: (id: string) => <p className="id-Title">#{id}</p>,
    },
    {
      title: "Total",
      dataIndex: ["totalAmount"], // Accessing nested property
      key: "id",
      render: (totalAmount: string) => (
        <p className="price-td">{totalAmount} dt</p>
      ),
    },
    {
      title: "Quantity",
      dataIndex: "Quantity",
      key: "Quantity",
      render: (_phone: string, record: any) => (
        <div className="name-column">{record.totalQuantity}</div>
      ),
    },
    {
      title: "Date",
      className: "name",
      dataIndex: "createdAt",
      key: "date",

      render: (createdAt: string) => <p>{convertDate(createdAt)}</p>,
    },
    {
      title: "Status",
      className: "name",
      dataIndex: "status",
      render: (_: any, record: any) => (
        <MyComponent
          defaultOption={record.status}
          onUpdateOrder={(newStatus) => handleUpdateOrder(record.id, newStatus)}
        />
      ),
      key: "name",
    },

    {
      title: "isPaied",
      dataIndex: "isPaied",
      key: "isPaied",

      sorter: (a: any, b: any) => (a.isPaied ? 1 : 0) - (b.isPaied ? 1 : 0),
      render: (_isPublished: boolean, record: any) => (
        <Switch
          checked={record.isPaied}
          onClick={() => {
            console.log(record.id);
            const id = record.id;

            console.log(id, typeof id);
            paiedOrder(
              { id: id } // Pass the category ID
            );
          }}
        />
      ),
    },
  ];

  const tableProps = {
    dataSource: orders,
    columns: columns,
    pagination: {
      total: fetchedOrders?.data?.meta.totalRecords,
      current: currentPage,
      pageSize: pageSize,
      onChange: handlePaginationChange,
      pageSizeOptions: ["5", "10", "20"], // Define available page sizes
      showSizeChanger: true, // Enable page size selector
    },
  };

  return (
    <div className="Product-List">
      <h1>{Current_User === ADMIN ? "Orders List" : "My Orders List"} </h1>
      <div className="header-Product-list">
        <SeachFilter
          onSearchChange={handleSearchChange}
          placeholder={"Search Order by Phone.."}
        />
        <Button className="add-cat" onClick={handleNavigate}>
          {" "}
          <span>+</span> Add New Order
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
      {/* Delete Category Modal */}
      <Modal
        title="Confirm Deletion"
        visible={deleteModalVisible}
        onCancel={() => setDeleteModalVisible(false)}
        okText="Delete"
        cancelText="Cancel"
      >
        <p>Are you sure you want to delete this category?</p>
      </Modal>
    </div>
  );
}
