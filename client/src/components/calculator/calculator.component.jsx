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
  const [socketLoading, setSocketLoading] = useState(true);
  const [historyLoading, setHistoryLoading] = useState(true);

  useEffect(() => {
    const socket = io();
    socket.on('connect', () => {
      setSocketLoading(false);
    });

    socket.on('newComputation', computation => setCalculations(prevComputations => {
      const newComputations = [...prevComputations, computation];

      if (newComputations.length < 10) {
        return newComputations;
      }

      return newComputations.slice(-10);
    }));

  }, []);

  useEffect(() => {
    apiCall('/api/computations')
      .then(res => {
        setCalculations(res);
        setHistoryLoading(false);
      })
      .catch(console.log);
  }, []);

  const onSymbolClick = e => {
    if (editorValue.length === 15) {
      return alert('Your expression cannot exceed 15 characters!');
    }
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

  const onDeleteClick = () => {
    if (editorValue.length > 0) {
      setEditorValue(editorValue.slice(0, -1));
    }
  }

  const onClearClick = () => setEditorValue('')

  if (socketLoading || historyLoading) {
    return <h1>Loading...</h1>
  }

  return (
    <div className='calculator'>
      <div className='calculator-editor'>
        <Editor expression={editorValue} />
        <Keyboard 
          onClick={onSymbolClick} 
          onComputeClick={onComputeClick}
          onDeleteClick={onDeleteClick}
          onClearClick={onClearClick}
        />
      </div>
      <History calculations={calculations} />
    </div>
  );
}

export default Calculator;
