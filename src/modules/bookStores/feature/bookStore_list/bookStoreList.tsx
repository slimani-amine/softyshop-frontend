import { Checkbox, Modal, Space, Switch, Table, message } from 'antd';
import Button from '@src/modules/shared/components/Button/Button';
import {
  useStoreQuery,
  useDeleteStoresMutation,
  usePublishStoreMutation,
  useStoresQuery,
  useMyStoresQuery,
  useDeleteStoreMutation,
  useUpdateStoreMutation,
  useSearchStoresQuery,
} from '../../service/storeApi';
import { SetStateAction, useEffect, useState } from 'react';
import SeachFilter from '@src/modules/shared/components/SearchFilter/SearchFilter';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '@src/modules/shared/store';
import { debounce } from 'lodash';

export default function bookStoreList() {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [selectedRowIds, setSelectedRowIds] = useState<string[]>([]);
  const [nameStore, setNameStore] = useState<string>('');
  const [stores, setStores] = useState<Array<any>>([]);
  const [pagination, setPagination] = useState({ current: 1, pageSize: 5 });

  const Current_User = useSelector(
    (state: RootState) => state.auth.user?.role.toLocaleUpperCase()
  );
  const Current_id = useSelector((state: RootState) => state.auth.user?.id);
  console.log(Current_id);
  const { data: fetchedSearchStores } = useSearchStoresQuery({
    subName: nameStore,
    role: Current_User || 'ADMIN',
    id: Current_id || '',
  });

  const handlePaginationChange = (page: number, pageSize?: number) => {
    setCurrentPage(page);
    setPageSize(pageSize || 5); // Update pageSize if changed
    console.log(stores);
  };

  let fetchedData: { data: { docs: SetStateAction<any[]> } };
  const [publishStore] = usePublishStoreMutation();
  const isAdmin = Current_User === 'ADMIN';
  console.log(isAdmin, 'verification role ');
  if (isAdmin) {
    const { data: fetchedStores } = useStoresQuery({
      page: currentPage,
      perPage: pageSize,
    });
    fetchedData = fetchedStores;
  } else {
    const { data: fetchedMyStores } = useMyStoresQuery();
    fetchedData = fetchedMyStores;
  }
  useEffect(() => {
    if (nameStore && fetchedSearchStores) {
      setStores(fetchedSearchStores.data?.docs);
    } else {
      if (fetchedData) {
        console.log(!fetchedData?.data, 'ooo');
        setStores(fetchedData?.data?.docs);
      }
    }
  }, [nameStore, fetchedSearchStores, currentPage, pageSize]);

  interface Store {
    id: Number;
    name: string;
    logo: string;
    isPublished: Number;
    socialMediaLinks: string[];
    position: string[];
  }
  const handleSearchChange = debounce((searchText: string) => {
    console.log('Search text for category mlist:', searchText);
    setNameStore(searchText);
  }, 500);
  const navigate = useNavigate();
  const Navigate = (id: string) => {
    navigate(`/stores/edit/${id}`);
  };

  const handleNavigate = () => {
    navigate('/stores/create');
  };
  const [deleteStore] = useDeleteStoreMutation();
  const [deleteStores] = useDeleteStoresMutation();
  const [deleteModalVisible, setDeleteModalVisible] = useState(false); // State to manage modal visibility
  const [deleteCategoryId, setDeleteCategoryId] = useState<number | null>(null); // State to store category ID for deletion

  /*const handleDelete = async (categoryId :Number) => {
    console.log(categoryId)
    try {
      await deleteStore(categoryId).unwrap();
      message.success('Category deleted!');
      setDeleteModalVisible(false); // Close the modal after successful deletion
    } catch (error) {
      // Handle error
    }
    
  };*/
  const handleDelete = async () => {
    try {
      await deleteStores(selectedRowIds).unwrap();
      message.success('Category deleted!');
      setDeleteModalVisible(false); // Close the modal after successful deletion
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
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (name: string, record: any) => (
        <div className="name-column">
          <div className="picture-Product">
            <img height={'30px'} width={'30px'} src={record.logo} alt="" />
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
      title: 'Links',
      dataIndex: 'socialMediaLinks',
      key: 'links',
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
      title: 'Position',
      dataIndex: 'address',
      key: 'position',
      render: (position: string) => {
        return <div className="position-column">{position}</div>;
      },
    },

    {
      title: 'Published',
      dataIndex: 'published',
      key: 'published',

      sorter: (a: Store, b: Store) =>
        (a.isPublished ? 1 : 0) - (b.isPublished ? 1 : 0),
      render: (isPublished: boolean, record: any) => (
        <Switch
          checked={record.isPublished}
          onClick={() => {
            if (isAdmin) {
              // Assuming isAdmin is a boolean indicating whether the user is an admin
              publishStore({
                id: record.id, // Pass the category ID
                isPublished: !record.isPublished, // Pass the updated data
              });
            }
          }}
          disabled={!isAdmin} // Disable the switch if the user is not an admin
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
                {' '}
                <g>
                  {' '}
                  <g>
                    {' '}
                    <path d="M311.18,78.008L32.23,356.958L0.613,485.716c-1.771,7.209,0.355,14.818,5.604,20.067 c5.266,5.266,12.88,7.368,20.067,5.604l128.759-31.617l278.95-278.95L311.18,78.008z M40.877,471.123l10.871-44.271l33.4,33.4 L40.877,471.123z"></path>{' '}
                  </g>{' '}
                </g>{' '}
                <g>
                  {' '}
                  <g>
                    {' '}
                    <path d="M502.598,86.818L425.182,9.402c-12.536-12.536-32.86-12.536-45.396,0l-30.825,30.825l122.812,122.812l30.825-30.825 C515.134,119.679,515.134,99.354,502.598,86.818z"></path>{' '}
                  </g>{' '}
                </g>{' '}
              </g>
            </svg>
          </div>
        </Space>
      ),
    },
  ];

  const tableProps = {
    dataSource: stores,
    columns: columns,
    headerStyle: { backgroundColor: 'lightblue' },
    pagination: {
      total: 7,
      current: currentPage,
      pageSize: pageSize,
      onChange: handlePaginationChange, // Handle page change event
      onShowSizeChange: handlePaginationChange,

      // Handle page size change event
    },

    header: {
      style: { borderRadius: 'px' },
    },
  };
  return (
    <div className="Product-List">
      <h1>Stores List</h1>
      <div className="header-Product-list">
        <SeachFilter
          placeholder={'Search Store ...'}
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
            variant={selectedRowIds.length === 0 ? 'dark' : 'primary'}
            onClick={handleDelete}
          >
            deleted
          </Button>
        </div>
        <Table {...tableProps} />
      </div>
      {/* Delete Category Modal */}
      <Modal
        title="Confirm Deletion"
        visible={deleteModalVisible}
        onOk={() => handleDelete()}
        onCancel={() => setDeleteModalVisible(false)}
        okText="Delete"
        cancelText="Cancel"
      >
        <p>Are you sure you want to delete this category?</p>
      </Modal>
    </div>
  );
}
