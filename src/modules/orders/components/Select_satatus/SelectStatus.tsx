import React, { useState, useRef, useEffect } from 'react';
import './SelectStatus.scss'; // Import the CSS file for styling


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

  const options = [
    { value: 'processing', backgroundColor: 'rgba(255, 215, 0, 0.8)' }, // Gold
    { value: 'on_delivery', backgroundColor: 'rgba(50, 205, 50, 0.8)'}, // Lime Green
    { value: 'livered', backgroundColor: 'rgba(65, 105, 225, 0.8)'}, // Royal Blue
    { value: 'cancelled', backgroundColor: 'rgba(255, 99, 71, 0.8)'} // Tomato Red
  ];

  const handleMouseLeave = () => {
    setDropdownVisible(false);
  };

  const handleSelectedOptionMouseLeave = () => {
    if (!dropdownVisible) {
      setDropdownVisible(false);
    }
  };

  return (
    <div className="my-component-container" onMouseLeave={handleSelectedOptionMouseLeave}>
      <div className="selected-option" style={{ backgroundColor: selectBackgroundColor }} onClick={toggleDropdown} >
        {selectedOption}
      </div>
      <div ref={dropdownRef} className={`custom-dropdown ${dropdownVisible ? 'show' : ''}`} onMouseLeave={handleMouseLeave}>
        {options.map(option => (
          <div key={option.value} className="dropdown-option" onClick={() => handleOptionClick(option.value, option.backgroundColor)}>
            <div style={{ backgroundColor: option.backgroundColor, borderRadius: "2px", marginTop: "1px", display: 'flex', height: "30px", alignItems: "center", justifyContent: "center", width: "100%" }}>{option.value}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyComponent;