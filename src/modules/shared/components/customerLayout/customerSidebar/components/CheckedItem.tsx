import { Checkbox, ConfigProvider } from 'antd';
import { useState } from 'react';

function CheckedItem({
  children,
  id,
} // category_id,
// searchParams,
// setSearchParams,
: {
  children: React.ReactNode;
  category_id?: string | null;
  id?: number | string;
  searchParams?: any;
  setSearchParams?: any;
}) {
  const [isChecked, setIsChecked] = useState(false);

  // useEffect(() => {
  //   console.log(category_id);
  //   if (isChecked && id == 'inStock')
  //     setSearchParams({ inStock: isChecked, category_id });
  // }, [category_id, isChecked]);
  // console.log(id, isChecked);
  return (
    <div className="checked-item">
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: '#0F3460',
          },
        }}
      >
        <Checkbox
          id={id?.toString()}
          checked={isChecked}
          onChange={() => {
            setIsChecked(!isChecked);
          }}
        />
      </ConfigProvider>{' '}
      {children}
    </div>
  );
}

export default CheckedItem;
