import { useState } from 'react';
import SearchIcon from '../../assets/icons/navbar/search.png'
export default function Search() {
  const [searchText, setSearchText] = useState('');

  const handleSearchChange = (e:any) => {
    setSearchText(e.target.value);
    // You can add more logic here to handle the search text changes
  };

  const handleSearchSubmit = (e:any) => {
    e.preventDefault();
    // You can add more logic here to handle the search submission
    console.log(`Search text: ${searchText}`);
  };

  const handleKeyDown = (e:any) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSearchSubmit(e);
    }
  };

  return (
    <div>
      <form onSubmit={handleSearchSubmit}>
        <div className='container_input'>
          <img src={SearchIcon} alt="" />
          <input
            className='search_input'
            type="text"
            value={searchText}
            onChange={handleSearchChange}
            onKeyDown={handleKeyDown}
            placeholder="Search anything"
          />
        </div>
      </form>
    </div>
  );
}
