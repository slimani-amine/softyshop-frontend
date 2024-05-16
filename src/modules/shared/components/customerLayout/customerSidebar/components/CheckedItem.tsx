import { Checkbox, ConfigProvider } from 'antd';
import { useState } from 'react';

function CheckedItem({
  children,
  id,
}: {
  children: React.ReactNode;
  id?: number;
}) {
  const [isChecked, setIsChecked] = useState(false);
  setIsChecked(!isChecked);
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
          onChange={() => console.log(id, isChecked)}
        />
      </ConfigProvider>{' '}
      {children}
    </div>
  );
}

export default CheckedItem;
