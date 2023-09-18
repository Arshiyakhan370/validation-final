// // src/ValidNumbersValidator.js

import React, { useState } from 'react';

function ValidNumbersValidator() {
  const [inputText, setInputText] = useState('');
  const [resultText, setResultText] = useState('');
  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    setInputText(e.target.value);
    setResultText('');
    setError(null);
  };

  const keepFirstOne = () => {
    const lines = inputText.split('\n').filter((line) => line.trim() !== '');
    const seenNumbers = new Set();
    const results = [];
    const errors = [];

    for (const line of lines) {
      const parts = line.split(' ');

      if (parts.length === 2) {
        const [address, value] = parts;
        
        if (!/^0x[0-9a-fA-F]{40}$/.test(address)) {
          errors.push(`Invalid Ethereum address: ${address}`);
        }

        if (!/^\d+$/.test(value)) {
          errors.push(`Invalid value: ${value}`);
        }

        if (!seenNumbers.has(address)) {
          seenNumbers.add(address);
          results.push(`${address} ${value}`);
        }
      } else {
        errors.push(`Incorrect format: ${line}`);
      }
    }

    if (errors.length > 0) {
      setError(errors.join('\n'));
    } else {
      const result = results.join('\n'); // Each result on a new line
      setResultText(result);
    }
  };

  return (
    <div className="container" style={{ width: '60vw' }}>
      <h4 className="mt-3 " style={{ textAlign: 'left' }}>KeepFirstOne</h4>
      <div className="mb-3" style={{ textAlign: 'left', color: 'grey', fontSize: '0.8rem', fontWeight: '500' }}>
        <p> Addresses with Amounts </p>
        <textarea
          className="form-control"
          style={{ background: '#f5f5fa' }}
          rows="9"
          value={inputText}
          onChange={handleInputChange}
        />
        <p style={{ textAlign: 'left', color: 'grey', fontSize: '0.8rem', fontWeight: '500' }}>
        Separate by ',' or''or'='
        </p>
      </div>

      {resultText && (
        <div className="alert alert-success mt-3" role="alert">
          Result:
          <br />
          <pre>{resultText}</pre>
        </div>
      )}
      {error && (
        <div className="alert alert-danger mt-3" role="alert">
          <span className='me-3'><i className="fa fa-exclamation-circle" aria-hidden="true"></i></span>
          {error}
        </div>
      )}
      <button className="btn btn-primary mt-3 w-100" onClick={keepFirstOne}>
        Next
      </button>
    </div>
  );
}

export default ValidNumbersValidator;
