import { Checkbox, ConfigProvider } from 'antd';

function CheckedItem({
  children,
  id,
}: {
  children: React.ReactNode;
  id?: number;
}) {
  return (
    <div className="checked-item">
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: '#0F3460',
          },
        }}
      >
        <Checkbox id={id} onChange={() => console.log(id)} />
      </ConfigProvider>{' '}
      {children}
    </div>
  );
}

export default CheckedItem;
