import { Checkbox, ConfigProvider } from 'antd';

function CheckedItem({ children }: { children: React.ReactNode }) {
  return (
    <div className="checked-item">
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: '#0F3460',
          },
        }}
      >
        <Checkbox />
      </ConfigProvider>{' '}
      {children}
    </div>
  );
}

export default CheckedItem;
