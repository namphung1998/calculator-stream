import React from 'react';

import './button.styles.scss';

function Button({ value, onClick }) {
  return (
    <button value={value} onClick={onClick} className='button'>
      {value}
    </button>
  );
}

export default Button;