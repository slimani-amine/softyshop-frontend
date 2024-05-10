import { useState } from "react";
import { Table, Space, Switch, Checkbox, Select, message } from "antd";
import SeachFilter from "@src/modules/shared/components/SearchFilter/SearchFilter";
import Button from "@src/modules/shared/components/Button/Button";
import { ReactComponent as EditIcon } from "@src/modules/shared/assets/icons/List/edit.svg";

import { useNavigate } from "react-router-dom";
import {
  useDeleteProductsMutation,
  usePrQuery,
  usePublishProductMutation,
} from "../../service/productApi";
import Spinner from "@src/modules/shared/components/Spinner/Spinner";
import { useSelector } from "react-redux";
import { RootState } from "@src/modules/shared/store";
import {
  useAllStoresQuery,
  useMyStoresQuery,
} from "@src/modules/bookStores/service/storeApi";
import { debounce } from "lodash";
import { ADMIN } from "@src/global_roles_config";
import CSV from "@src/modules/products/components/csv";

interface Product {
  id: string;
  name: string;
  Product: string;
  brand: string;
  price: number;
  published: boolean;
  images: string;
}

export default function ProductList() {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedRowIds, setSelectedRowIds] = useState<string[]>([]);
  const [selectedStore, setSelectedStore] = useState<string>();
  const [pageSize, setPageSize] = useState(10);
  const [nameProduct, setNameProduct] = useState<string>("");

  const navigate = useNavigate();
  const [deleteProducts] = useDeleteProductsMutation();
  const handleCheckboxChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    id: string,
  ) => {
    const checked = e.target.checked;
    setSelectedRowIds((prevIds) => {
      if (checked) {
        return [...prevIds, id];
      } else {
        return prevIds.filter((rowId) => rowId !== id);
      }
    });
  };
  const Current_User = useSelector(
    (state: RootState) => state.auth.user?.role.toLocaleUpperCase(),
  );
  const userId = useSelector(
    (state: RootState) => state.auth.user?.id.toLocaleUpperCase(),
  );
  console.log(userId);
  const { data: fetchdePr, isLoading } = usePrQuery({
    perPage: pageSize,
    page: currentPage,
    name: nameProduct,
    role: Current_User!,
    vendorId: Current_User === "VENDOR" ? userId : "",
    storeId: selectedStore,
  });
  const [publishProduct] = usePublishProductMutation();
  // get stores base to ROLE
  //const total = fetchedProducts?.data?.meta.totalRecords
  let stores = [];
  if (Current_User === "VENDOR") {
    const { data: fetechedMyStores } = useMyStoresQuery();
    stores = fetechedMyStores?.data?.docs;
  } else {
    const { data: fetchedAllStores } = useAllStoresQuery();
    stores = fetchedAllStores?.data?.docs;
  }
  const selectStores = stores?.map((store: any) => ({
    label: store.name,
    value: store.id,
  }));

  // Handle loading state
  if (isLoading) {
    return <Spinner />;
  }
  console.log(import.meta.env.VITE_APP_BASE_URL);

  const handleDelete = async () => {
    const response = await deleteProducts(selectedRowIds);
    console.log(selectedRowIds);
    if ("data" in response) {
      // Display success message if data exists
      message.success(
        ` Product${
          selectedRowIds.length == 1 ? "" : "s"
        } deleted successfully!`,
      );
      setSelectedRowIds([]);
    } else {
      // Handle unexpected response format
      message.error("Unexpected response from server. Please try again later.");
    }
  };
  const handleAllStores = () => {
    setSelectedStore("");
  };

  const handleSearchChange = debounce((searchText: string) => {
    console.log("Search text for category list:", searchText);
    setNameProduct(searchText);
  }, 200);

  const handleNavigate = () => {
    navigate("/products/create");
  };
  const handleNavigateEdit = (id: any) => {
    navigate(`/products/edit/${id}`);
  };
  const handlePaginationChange = (page: number, pageSize?: number) => {
    setCurrentPage(page);
    setPageSize(pageSize || 5);
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
      render: (name: string, record: Product) => {
        const imgUrl = JSON.parse(record.images)[0];

        return (
          <div className="name-column">
            <div className="picture-Product">
              <img
                height={"40px"}
                width={"40px"}
                style={{ borderRadius: "8px" }}
                src={imgUrl}
                alt=""
              />
            </div>
            <div className="data-name">
              <h3 className="prod-name">{name}</h3>
              <span>{record.id}</span>
            </div>
          </div>
        );
      },
      sorter: (a: Product, b: Product) => a.name.localeCompare(b.name),
    },
    {
      title: "Store",
      className: "product",
      dataIndex: ["store", "name"],
      render: (name: string) => <span className="store-td">{name}</span>,

      key: "Product",
    },

    {
      title: "Category",
      className: "",
      dataIndex: "category",
      render: (category: any) => (
        <span className="category-td">{category?.name || "erf"}</span>
      ),

      key: "Product",
    },

    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      sorter: (a: Product, b: Product) => a.price - b.price,
      render: (price: string) => <p className="price-product">{price} Dt</p>,
    },
    {
      title: "Stock",
      dataIndex: "stockNumber",
      key: "price",
      render: (stock: string) => <p className="stock-product">{stock}</p>,
    },

    {
      title: "Published",
      dataIndex: "isPublished",
      key: "published",

      sorter: (a: Product, b: Product) =>
        (a.published ? 1 : 0) - (b.published ? 1 : 0),
      render: (isPublished: boolean, record: Product) => (
        <Switch
          checked={isPublished}
          onChange={(checked) => console.log(checked)}
          onClick={() => {
            publishProduct({ id: record.id });
          }}
        />
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (record: any) => (
        <Space size="middle">
          <div
            className="icon-action"
            onClick={() => handleNavigateEdit(record?.id)}
          >
            <EditIcon />
          </div>
        </Space>
      ),
    },
  ];

  const tableProps = {
    dataSource: fetchdePr?.data?.docs,
    columns: columns,
    headerStyle: { backgroundColor: "lightblue" },
    // Set the pageSize in pagination config
    pagination: {
      total: fetchdePr?.data?.meta?.totalRecords,
      current: currentPage,
      pageSize: pageSize,
      onChange: handlePaginationChange, // Handle page change event
    },

    header: {
      style: { borderRadius: "px" },
    },
  };
  const handleSelectChange = (value: any) => {
    setSelectedStore(value);
    console.log(selectedStore);
  };

  return (
    <div className="Product-List">
      <h1>{Current_User === ADMIN ? "Products List" : "My Products List"} </h1>

      <div className="header-Product-list">
        <SeachFilter
          placeholder={"Search Product.."}
          onSearchChange={handleSearchChange}
        />
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "10px",
            backgroundColor: "#f3f5f9",
            paddingTop: "0",
            height: "42px",
            width: "320px",
            borderRadius: "10px",
          }}
        >
          <Select
            style={{
              width: "200px",
              height: "8px !important",
              borderRadius: "30px",
            }}
            size="small"
            placeholder="Store "
            options={selectStores}
            onChange={(value) => handleSelectChange(value)}
            className="input-custom"
          />
          <Button
            style={{ height: "40px" }}
            size="xl"
            variant={"dark"}
            onClick={handleAllStores}
          >
            All stores
          </Button>
        </div>
        <Button className="add-cat" onClick={handleNavigate}>
          {""}
          <span>+</span> Add Product
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
        <Table<Product> {...tableProps} />
        <CSV />
      </div>
    </div>
  );
}
