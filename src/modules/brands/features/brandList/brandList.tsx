import { Table, Space, message, Checkbox } from "antd";
import SeachFilter from "@src/modules/shared/components/SearchFilter/SearchFilter";
import Button from "@src/modules/shared/components/Button/Button";
import { useNavigate } from "react-router-dom";
import {
  useBrandsQuery,
  useDeleteBrandsMutation,
  useSearchBrandsQuery,
} from "../../service/brandApi";
import { ReactComponent as EditIcon } from "@src/modules/shared/assets/icons/List/edit.svg";

import { useEffect, useState } from "react"; // Import useState hook for managing modal state
import Brand from "../../service/type";
import { debounce } from "lodash";

export default function BrandList() {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [selectedRowIds, setSelectedRowIds] = useState<string[]>([]);

  const [nameBrand, setNameBrand] = useState<string>("");
  const { data: fetchedBrands } = useBrandsQuery({
    perPage: pageSize,
    page: currentPage,
  });
  const [deleteBrands] = useDeleteBrandsMutation();
  // const [deleteBrand] = useDeleteBrandsMutation();
  // const [updateBrand] = useUpdateBrandMutation()
  // const [deleteBrandId, setDeleteBrandId] = useState<number | null>(null); // State to store Brand ID for deletion
  const { data: fetchedSearchBrands } = useSearchBrandsQuery(nameBrand);
  const [Brands, setBrands] = useState<Array<any>>([]);
  const handlePaginationChange = (page: number, pageSize?: number) => {
    setCurrentPage(page);
    setPageSize(pageSize || 5); // Update pageSize if changed
  };
  useEffect(() => {
    if (nameBrand && fetchedSearchBrands) {
      setBrands(fetchedSearchBrands.data.docs);
    } else {
      if (fetchedBrands) {
        setBrands(fetchedBrands.data.docs);
      }
    }
  }, [nameBrand, fetchedBrands, fetchedSearchBrands]);

  const handleSearchChange = debounce((searchText: string) => {
    setNameBrand(searchText);
  }, 200);

  const handleDelete = async () => {
    try {
      await deleteBrands(selectedRowIds).unwrap();
      message.success("Brand deleted!");
    } catch (error) {
      // Handle error
    }
  };

  const navigate = useNavigate();
  const Navigate = (id: string) => {
    navigate(`/Brands/edit/${id}`);
  };

  const handleNavigate = () => {
    navigate("/Brands/create");
  };
  const handleCheckboxChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    id: string,
  ) => {
    const checked = e.target.checked;
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
      render: (name: string) => <span className="Brand-name">{name}</span>,
      key: "name",
      sorter: (a: Brand, b: Brand) => a.name.localeCompare(b.name),
    },
    {
      title: "logo",
      className: "icon-Brand",
      dataIndex: "logo",
      render: (logo: string) => (
        <img className="img-cteagory" src={logo} alt="" />
      ),
      key: "icon",
    },

    {
      title: "Action",
      key: "action",
      className: "action-Brand",
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
    dataSource: Brands,
    columns: columns,
    headerStyle: { backgroundColor: "lightblue" },
    header: {
      style: { borderRadius: "px" },
    },
    pagination: {
      total: fetchedBrands?.data.meta.totalPages + 4,
      current: currentPage,
      pageSize: pageSize,
      onChange: handlePaginationChange,
      onShowSizeChange: handlePaginationChange,
    },
  };

  return (
    <div className="Product-List">
      <h1>Brand List</h1>
      <div className="header-Product-list">
        <SeachFilter
          onSearchChange={handleSearchChange}
          placeholder={"Search Brand.."}
        />
        <Button className="add-cat" onClick={handleNavigate}>
          {" "}
          <span>+</span> Add Brand
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
        <Table<Brand> {...tableProps} />
      </div>
    </div>
  );
}
