import React, { useState, useEffect } from 'react';
import { useAllvendorsQuery } from '@src/modules/vendores/services/vendorApi';
import { Select } from 'antd';
interface Option {
  value: string;
  label: string;
}
const LazyLoadSelect: React.FC = () => {
    const [options, setOptions] = useState<Option[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [, { data: newOptions = [], loading: queryLoading }] = useLazyQuery(useAllvendorsQuery);
  
    useEffect(() => {
      setOptions(prevOptions => [...prevOptions, ...newOptions]);
      setLoading(queryLoading);
    }, [newOptions, queryLoading]);
  
    // const handleScroll = useCallback(() => {
    //   if (selectRef.current) {
    //     const { scrollTop, clientHeight, scrollHeight } = selectRef.current;
    //     if (scrollHeight - scrollTop === clientHeight && !loading) {
    //       fetchOptions();
    //     }
    //   }
    // }, [fetchOptions, loading]);
  
    return (
        
      <Select >
        {options.map((option, index) => (
          <option key={index} value={option.value}>
            {option.label}
          </option>
        ))}
        {loading && <option>Loading...</option>}
      </Select>
      
    );
  };
  
  export default LazyLoadSelect;

function useLazyQuery(_selectOptionsQuery: any): [any, { data?: never[] | undefined; loading: any; }] {
    throw new Error('Function not implemented.');
}
