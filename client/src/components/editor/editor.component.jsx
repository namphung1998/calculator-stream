import React from 'react';

import './editor.styles.scss';

function Editor({ expression }) {

  return (
    <div className='editor'>
      <p>{expression}</p>
    </div>
  );
}

export default Editor;
