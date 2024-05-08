function Address({ id, children }: { id: number; children: React.ReactNode }) {
  return (
    <div onClick={() => console.log(id)} className="address">
      {children}
    </div>
  );
}

export default Address;
