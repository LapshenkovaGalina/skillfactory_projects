import React from 'react';
import './Subboard.css';

function Subboard({title}: {title: string}) {
  return (
    <div className="Subboard">
        <div>{title}</div>
        <button className='SubboardBtn'>+Add card</button>
    </div>
  );
}

export default Subboard;
