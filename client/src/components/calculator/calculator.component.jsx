import React, { useState } from 'react';

import './calculator.styles.scss';

import Keyboard from '../keyboard/keyboard.component';
import Editor from '../editor/editor.component';

import { evaluate, strToExpressionArray } from '../../utilities/compute';
import History from '../history/history.component';

function Calculator() {
  const [editorValue, setEditorValue] = useState('');
  const [calculations, setCalculations] = useState([]);

  const onClick = e => {
    setEditorValue(editorValue + e.target.value);
  }

  const onComputeClick = () => {
    const infix = strToExpressionArray(editorValue);
    const result = evaluate(infix);

    if (!isNaN(result)) {
      setCalculations([...calculations, `${editorValue}=${result}`]);
      setEditorValue('');
    }
  }

  return (
    <div className='calculator'>
      <h1>Calculator</h1>
      <Editor expression={editorValue} />
      <Keyboard onClick={onClick} onComputeClick={onComputeClick} />
      <History calculations={calculations} />
    </div>
  );
}

export default Calculator;
