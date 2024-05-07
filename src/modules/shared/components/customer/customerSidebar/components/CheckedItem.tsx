import { checkIt } from '@src/modules/customer/data/checkoutSlice';
import { useAppDispatch, useAppSelector } from '@src/modules/shared/store';
import { Checkbox, ConfigProvider } from 'antd';

function CheckedItem({ children }: { children: React.ReactNode }) {
  const dispatch = useAppDispatch();
  const isChecked = useAppSelector((state) => state.checkout.agreedToPayCash);
  // console.log(isChecked);

  return (
    <div className="checked-item">
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: '#0F3460',
          },
        }}
      >
        <Checkbox value={isChecked} onChange={() => dispatch(checkIt())} />
      </ConfigProvider>{' '}
      {children}
    </div>
  );
}

export default CheckedItem;
