

import React, { Component } from 'react';

class Disperse extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputText: '',
      error: null,
      validInput: false,
    };
  }

  handleInputChange = (e) => {
    this.setState({
      inputText: e.target.value,
      error: null,
      validInput: false,
    });
  };

  onSubmit = () => {
    const { inputText } = this.state;
    const lines = inputText.trim().split('\n');
    const errors = [];

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();
      const parts = line.split(' ');

      if (parts.length !== 2) {
        errors.push(`Line ${i + 1}: Invalid format. It should be: "address amount"`);
      } else {
        const [address, amount] = parts;

        if (!/^0x[0-9a-fA-F]{40}$/.test(address)) {
          errors.push(`Line ${i + 1}: Invalid Ethereum address.`);
        }

        if (!/^\d+$/.test(amount)) {
          errors.push(`Line ${i + 1}: Invalid amount. It should be a positive integer.`);
        }
      }
    }

    if (errors.length > 0) {
      this.setState({ error: errors.join('\n'), validInput: false });
    } else {
      this.setState({ validInput: true, error: null });
    }
  };

  render() {
    const { inputText, error, validInput } = this.state;

    return (
      <div className="container" style={{ width: '60vw' }}>
        <h4 className="mt-3" style={{ textAlign: 'left' }}>onSubmit</h4>
        <div className="mb-3" style={{ textAlign: 'left', color: 'grey', fontSize: '0.8rem', fontWeight: '500' }}>
          <p> Addresses with Amounts </p>
          <textarea
            className="form-control"
            style={{ background: '#f5f5fa' }}
            rows="9"
            value={inputText}
            onChange={this.handleInputChange}
          />
          <p style={{ textAlign: 'left', color: 'grey', fontSize: '0.8rem', fontWeight: '500' }}>
          Separate by ',' or''or'='
          </p>
        </div>

        {error && (
          <div className="alert alert-danger mt-3" role="alert">
            <span className='me-3'><i className="fa fa-exclamation-circle" aria-hidden="true"></i></span>
            {error}
          </div>
        )}

        {validInput && (
          <div className="alert alert-success mt-3" role="alert">
            <span className='me-3'><i className="fa fa-check-circle" aria-hidden="true"></i></span>
            Input is valid. You can perform further actions here.
          </div>
        )}

        <button className="btn btn-primary mt-3 w-100" onClick={this.onSubmit}>
          Next
        </button>
      </div>
    );
  }
}

export default Disperse;
