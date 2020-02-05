import React from 'react';

import './history.styles.scss';

function History({ calculations }) {
  if (!calculations) {
    return <p>Loading...</p>;
  }
  return (
    <div className='history'>
      <h2>History</h2>
      {calculations.map((item, i) => (
        <p key={item + String(i)}>{item}</p>
      ))}
    </div>
  );
}

export default History;
