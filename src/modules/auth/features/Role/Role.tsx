import Button from '@src/modules/shared/components/Button/Button';

function Role() {
  return (
    <div className="role-module">
      <div className="role-card-container">
        <h1 className="role-title">Role</h1>
        <h2 className="role-text">
          Welcome to SoftyShop! <br /> Are you willing to buy books or sell
          some?
        </h2>
        <div className="buttons">
          <Button label={'Customer'} />
          <Button label={'Vendor'} />
        </div>
      </div>
    </div>
  );
}

export default Role;
