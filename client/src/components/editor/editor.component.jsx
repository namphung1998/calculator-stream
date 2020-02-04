import React from 'react';

import './editor.styles.scss';

function Editor({ expression, result }) {

  return (
    <div className='editor'>
      <p>{expression}</p>
      <div className='editor-result'>
        {result && <p>{result}</p>}
      </div>
    </div>
  );
}

export default Editor;
