import { Checkbox, ConfigProvider } from 'antd';
import { useState } from 'react';

function CheckedItem({
  children,
  id,
}: {
  children: React.ReactNode;
  id?: number | string;
}) {
  const [isChecked, setIsChecked] = useState(false);
  console.log(id, isChecked);
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
