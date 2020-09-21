import React, { useState } from 'react';
import {
  Dropdown as BootstrapDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from 'reactstrap';

import style from './style.module.scss';

const Dropdown = ({ children, options, onSelect }) => {
  const [isOpen, setOpen] = useState(false);

  const handleClick = (option) => {
    if (onSelect) onSelect(option);
  };

  return (
    <BootstrapDropdown isOpen={isOpen} toggle={() => setOpen(!isOpen)} className={style.container}>
      <DropdownToggle>{children}</DropdownToggle>

      <DropdownMenu>
        {options.map((option) => (
          <DropdownItem key={option.id} onClick={() => handleClick(option)}>
            {option.name}
          </DropdownItem>
        ))}
      </DropdownMenu>
    </BootstrapDropdown>
  );
};

export default Dropdown;
