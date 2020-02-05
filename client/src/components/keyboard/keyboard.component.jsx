import React from 'react';

import Button from '../button/button.component';

import './keyboard.styles.scss';

const ROWS = [
  ['7', '8', '9', '/'],
  ['4', '5', '6', '*'],
  ['1', '2', '3', '-'],
  ['0', '(', ')', '+']
];

function Keyboard({ onClick, onComputeClick, onDeleteClick, onClearClick }) {
  return (
    <div className='keyboard'>
      {ROWS.map((row, i) => (
        <div key={i} className='keyboard-row'>
          {row.map((item, i) => (
            <Button onClick={onClick} key={i} value={item} />
          ))}
        </div>
      ))}
      <div className='keyboard-row'>
        <Button onClick={onComputeClick} value='=' />
        <Button onClick={onDeleteClick} value='Del' />
        <Button onClick={onClearClick} value='C' />
        <Button value='' />
      </div>
    </div>
  );
}

export default Keyboard;
