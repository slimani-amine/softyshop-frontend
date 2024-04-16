import React from 'react';
import { Select } from 'antd';

interface Option {
  value: string;
  label: string;
}

interface SearchSpecificProps {
  options: Option[];
  onChange: (value: string) => void; // Define onChange as a prop
}

const onSearch = (value: string) => {
  console.log('search:', value);
};

const filterOption = (input: string, option?: { label: string; value: string }) =>
  (option?.label ?? '').toLowerCase().includes(input.toLowerCase());

const SearchSpecific: React.FC<SearchSpecificProps> = ({ options, onChange }) => (
  <Select
    showSearch
    placeholder="Select a person"
    optionFilterProp="children"
    onChange={onChange} // Use the onChange prop
    onSearch={onSearch}
    filterOption={filterOption}
    options={options}
    style={{width:"280px"}}
  />
);

export default SearchSpecific;
