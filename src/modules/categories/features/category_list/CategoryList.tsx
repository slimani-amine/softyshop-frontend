import {
  Table,
  Space,

  message,

  Switch,
  Checkbox,
} from 'antd';
import { RootState } from '@src/modules/shared/store';
import SeachFilter from '@src/modules/shared/components/SearchFilter/SearchFilter';
import Button from '@src/modules/shared/components/Button/Button';
import { useNavigate } from 'react-router-dom';
import {
  useUpdateCatgoryMutation,
  useDeleteCategoriesMutation,
  useCategoriesQuery,
  useSearchCategoriesQuery,
} from '../../service/categoryApi';
import { ReactComponent as EditIcon } from "@src/modules/shared/assets/icons/List/edit.svg";


import { useEffect, useState } from 'react'; // Import useState hook for managing modal state
import Category from '../../service/type';
import { debounce } from 'lodash';
import { useSelector } from 'react-redux';
import { VENDOR} from '@src/global_roles_config';
export default function CategoryList() {

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [selectedRowIds, setSelectedRowIds] = useState<string[]>([]);

  const [nameCategory, setNameCategory] = useState<string>('');
  const { data: fetchedCategories } = useCategoriesQuery({
    perPage: pageSize,
    page: currentPage,
  });
  const [deleteCategories] = useDeleteCategoriesMutation();
  const [updateCategory] = useUpdateCatgoryMutation();
  const { data: fetchedSearchCategories } =
    useSearchCategoriesQuery(nameCategory);
  const [categories, setCategories] = useState<Array<any>>([]);
  const handlePaginationChange = (page: number, pageSize?: number) => {
    setCurrentPage(page);
    setPageSize(pageSize || 5); // Update pageSize if changed
  };
  useEffect(() => {
    if (nameCategory && fetchedSearchCategories) {
      setCategories(fetchedSearchCategories.data.docs);
    } else {
      if (fetchedCategories) {
        setCategories(fetchedCategories.data.docs);
      }
    }
  }, [nameCategory, fetchedCategories, fetchedSearchCategories]);
  const Current_User = useSelector(
    (state: RootState) => state.auth.user?.role.toLocaleUpperCase()
  );
  const handleSearchChange = debounce((searchText: string) => {
    console.log('Search text for category list:', searchText);
    setNameCategory(searchText);
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
      await deleteCategories(selectedRowIds).unwrap();
      message.success('Category deleted!');
    } catch (error) {
      // Handle error
    }
  };

  const navigate = useNavigate();
  const Navigate = (id: string) => {
    navigate(`/categories/edit/${id}`);
  };

  const handleNavigate = () => {
    navigate('/categories/create');
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
      title: 'Select',
      dataIndex: 'id',
      render: (_: any, record: any) => (
        <Checkbox
          checked={selectedRowIds.includes(record.id)}
          onChange={(e: any) => handleCheckboxChange(e, record.id)}
        />
      ),
    },
    {
      title: 'id',
      dataIndex: 'id',
      key: 'id',
      render: (id: string) => <p>{id}</p>,
    },
    {
      title: 'name',
      className: 'name',
      dataIndex: 'name',
      render: (name: string) => <span className="Category-name">{name}</span>,
      key: 'name',
      sorter: (a: Category, b: Category) => a.name.localeCompare(b.name),
    },
    {
      title: 'icon',
      className: 'icon-category',
      dataIndex: 'icon',
      render: (icon: string) => (
        <img className="img-cteagory" src={icon} alt="" />
      ),
      key: 'icon',
    },
    {
      title: 'Published',
      dataIndex: 'published',
      key: 'published',

      sorter: (a: Category, b: Category) =>
        (a.isPublished ? 1 : 0) - (b.isPublished ? 1 : 0),
       render: (_isPublished: boolean, record: any) => (
        
        <Switch
          disabled = {Current_User === VENDOR}
          checked={record.isPublished}
          onClick={() => {
            updateCategory({
              id: record.id, // Pass the category ID
              data: { isPublished: !record.isPublished }, // Pass the updated data
            });
          }}
        />
      ),
    },
    
    {
      title: 'Action',
      key: 'action',
      className: 'action-category',
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
    dataSource: categories,
    columns: columns,
    headerStyle: { backgroundColor: 'lightblue' },
    header: {
      style: { borderRadius: 'px' },
    },
    pagination: {
      total: fetchedCategories?.data.meta.totalPages + 4,
      current: currentPage,
      pageSize: pageSize,
      onChange: handlePaginationChange, // Handle page change event
      onShowSizeChange: handlePaginationChange,

      // Handle page size change event
    },
  };

  return (
    <div className="Product-List">
      <h1>Category List</h1>
      <div className="header-Product-list">
        <SeachFilter
          onSearchChange={handleSearchChange}
          placeholder={'Search Category..'}
        />
        <Button className="add-cat" onClick={handleNavigate}>
          {' '}
          <span>+</span> Add Category
        </Button>
      </div>
      <div className="container-Product-List">
        <div className="container-btn">
          <Button
            size="sm"
            disabled={selectedRowIds.length === 0}
            variant={selectedRowIds.length === 0 ? 'dark' : 'primary'}
            onClick={handleDelete}
          >
            Delete
          </Button>
        </div>
        <Table<Category> {...tableProps} />
      </div>
      {/* Delete Category Modal */}
    
    </div>
  );
}
