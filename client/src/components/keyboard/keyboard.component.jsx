import React from 'react';

import Button from '../button/button.component';

import './keyboard.styles.scss';

const ROWS = [
    ['7', '8', '9', '/'],
    ['4', '5', '6', '*'],
    ['1', '2', '3', '-'],
    ['0', '(', ')', '+']
  ]

function Keyboard({ onClick, onComputeClick }) {
  return (
    <div className='keyboard'>
      {ROWS.map((row, i) => (
        <div key={i} className='keyboard-row'>
          {row.map((item, i) => (
            <Button onClick={onClick} key={i} value={item}/>
          ))}
        </div>
      ))}
      <div onClick={onComputeClick} className='keyboard-row'>
        <Button value='=' />
      </div>
    </div>
  );
}

export default Keyboard;
