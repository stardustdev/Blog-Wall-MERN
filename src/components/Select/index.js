import React, { useState } from 'react';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

import './style.scss';

const Select = ({ options, onSelect }) => {
  const [isOpen, setOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(options[0]?.name);

  const handleSelect = (option) => {
    setSelectedOption(option.name);
    if (onSelect) onSelect(option);
  };

  return (
    <Dropdown isOpen={isOpen} toggle={() => setOpen(!isOpen)} className="select">
      <DropdownToggle caret>{selectedOption}</DropdownToggle>

      <DropdownMenu>
        {options.map((option) => (
          <DropdownItem key={option.id} onClick={() => handleSelect(option)}>
            {option.name}
          </DropdownItem>
        ))}
      </DropdownMenu>
    </Dropdown>
  );
};

export default Select;
