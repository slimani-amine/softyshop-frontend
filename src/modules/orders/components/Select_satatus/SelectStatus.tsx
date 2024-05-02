import React, { useState, useRef, useEffect } from 'react';
import './SelectStatus.scss'; // Import the CSS file for styling

interface Option {
  value: string;
  backgroundColor: string;
}

interface MyComponentProps {
  defaultOption: string; // Define prop for default option
  onUpdateOrder: (newStatus: string) => void; // Define prop for update order function
}

const MyComponent: React.FC<MyComponentProps> = ({ defaultOption, onUpdateOrder }) => {
  const [selectedOption, setSelectedOption] = useState<string>(defaultOption);
  const [selectBackgroundColor, setSelectBackgroundColor] = useState<string>('');
  const [dropdownVisible, setDropdownVisible] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const defaultOptionData = options.find(option => option.value === defaultOption);
    if (defaultOptionData) {
      setSelectedOption(defaultOption);
      setSelectBackgroundColor(defaultOptionData.backgroundColor);
    }
  }, [defaultOption]);

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const handleOptionClick = (value: string, backgroundColor: string) => {
    setSelectedOption(value);
    setSelectBackgroundColor(backgroundColor);
    setDropdownVisible(false);
    onUpdateOrder(value);
  };

  const handleMouseLeave = () => {
    setDropdownVisible(false);
  };

  const handleSelectedOptionMouseLeave = () => {
    if (!dropdownVisible) {
      setDropdownVisible(false);
    }
  };

  // Define the options array
  const options: Option[] = [
    { value: 'processing', backgroundColor: '#FFDBAA' }, // Gold
    { value: 'on_delivery', backgroundColor: '#F4EEEE'}, // Lime Green
    { value: 'delivered', backgroundColor: '#96C291'}, // Royal Blue
    { value: 'cancelled', backgroundColor: '#FFB7B7'} // Tomato Red
  ];

  // Filter out the default option from rendering in the dropdown
  const filteredOptions: Option[] = options.filter(option => option.value !== defaultOption);

  return (
    <div className="my-component-container" onMouseLeave={handleSelectedOptionMouseLeave}>
      <div className="selected-option" style={{ backgroundColor: selectBackgroundColor }} onClick={toggleDropdown}>
        {selectedOption}
      </div>
      <div ref={dropdownRef} className={`custom-dropdown ${dropdownVisible ? 'show' : ''}`} onMouseLeave={handleMouseLeave}>
        {filteredOptions.map(option => (
          <div key={option.value} className="dropdown-option" onClick={() => handleOptionClick(option.value, option.backgroundColor)}>
            <div style={{ backgroundColor: option.backgroundColor, borderRadius: "2px", marginTop: "1px", display: 'flex', height: "30px", alignItems: "center", justifyContent: "center", width: "100%" }}>{option.value}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyComponent;
