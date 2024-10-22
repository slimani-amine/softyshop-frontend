import { useState } from "react";
export default function Search() {
  const [searchText, setSearchText] = useState("");

  const handleSearchChange = (e: any) => {
    setSearchText(e.target.value);
  };

  const handleSearchSubmit = (e: any) => {
    e.preventDefault();
  };

  const handleKeyDown = (e: any) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSearchSubmit(e);
    }
  };

  return (
    <div>
      <form onSubmit={handleSearchSubmit}>
        <div className="container_input">
          <input
            className="search_input"
            type="text"
            value={searchText}
            onChange={handleSearchChange}
            onKeyDown={handleKeyDown}
            placeholder="Searching for..."
          />
        </div>
      </form>
    </div>
  );
}
