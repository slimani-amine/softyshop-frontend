import { useState } from 'react';
import SearchIcon from '../../assets/icons/navbar/search.png';

export default function Search({ placeholder , onSearchChange }: { placeholder: string , onSearchChange : (text : string) =>void }) {
  const [searchText, setSearchText] = useState('');

  const handleSearchChange = (e: any) => {
    setSearchText(e.target.value);
    onSearchChange(e.target.value)

  };

  const handleSearchSubmit = (e: any) => {
    e.preventDefault();
  };

  const handleKeyDown = (e: any) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSearchSubmit(e);
    }
  };

  return (
    <div>
      <form onSubmit={handleSearchSubmit}>
        <div className='container_input-filter'>
          <img src={SearchIcon} alt="" />
          <input
            className='search_filter_input'
            type="text"
            value={searchText}
            onChange={handleSearchChange}
            onKeyDown={handleKeyDown}
            placeholder={placeholder} // Use the placeholder prop here
          />
        </div>
      </form>
    </div>
  );
}
