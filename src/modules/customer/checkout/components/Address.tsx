function Address({ id, children }: { id: number; children: React.ReactNode }) {
  function handleSelect(ID: number) {
    console.log(ID);
  }
  return (
    <div onClick={() => handleSelect(id)} className="address">
      {children}
    </div>
  );
}

export default Address;
