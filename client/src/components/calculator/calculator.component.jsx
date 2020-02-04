import React, { useState } from 'react';

import './calculator.styles.scss';

import Keyboard from '../keyboard/keyboard.component';
import Editor from '../editor/editor.component';

import { evaluate, strToExpressionArray } from '../../utilities/compute';

function Calculator() {
  const [editorValue, setEditorValue] = useState('')
  const [result, setResult] = useState(null);

  const onClick = e => {
    setEditorValue(editorValue + e.target.value);
  }

  const onComputeClick = () => {
    const infix = strToExpressionArray(editorValue);
    setResult(evaluate(infix));
  }

  return (
    <div className='calculator'>
      <h1>Calculator</h1>
      <Editor expression={editorValue} result={result}/>
      <Keyboard onClick={onClick} onComputeClick={onComputeClick} />
    </div>
  );
}

export default Calculator;
