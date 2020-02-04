import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

import './calculator.styles.scss';

import Keyboard from '../keyboard/keyboard.component';
import Editor from '../editor/editor.component';

import { evaluate, strToExpressionArray } from '../../utilities/compute';
import { apiCall } from '../../utilities/apiCall';
import History from '../history/history.component';

function Calculator() {
  const [editorValue, setEditorValue] = useState('');
  const [calculations, setCalculations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const _socket = io('http://localhost:4000');
    _socket.on('connect', () => {
      setLoading(false);
    });

    _socket.on('hello', console.log);

    _socket.on('newComputation', computation => setCalculations(c => {
      console.log(computation);
      return [...c, computation];
    }));

  }, []);

  useEffect(() => {
    apiCall('/api/computations')
      .then(res => setCalculations(res))
      .catch(console.log);
  }, []);

  const onClick = e => {
    setEditorValue(editorValue + e.target.value);
  }

  const onComputeClick = () => {
    const infix = strToExpressionArray(editorValue);
    const result = evaluate(infix);

    if (!isNaN(result)) {
      const computation = `${editorValue}=${result}`;

      apiCall('/api/computations', {
        method: 'POST',
        body: JSON.stringify({ computation })
      })
        .then(res => {
          if (res.success) {
            setEditorValue('');
          }
        })
    }
  }

  if (loading) {
    return <h1>Loading...</h1>
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
